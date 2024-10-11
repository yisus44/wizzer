import {  BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiTags } from '@nestjs/swagger';
import { BcryptType } from './types/bcrypt.type';
import { SignInDto } from './dto/signin.dto';
import { CommonService } from 'src/common/common.service';
import { sign } from 'jsonwebtoken';
@ApiTags('users')
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly commonService: CommonService,
    @Inject('BcryptType') private readonly bcrypt,
  ) {}

  async create(createUserDto: CreateUserDto) {
      const hashedPassword = await this.bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = hashedPassword;
      const match =  await this.userRepository.findOneBy({email : createUserDto.email});
      if (match) throw new BadRequestException();
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOneBy({email : signInDto.email});
    if (!user) throw new NotFoundException();
    const match = await this.verifyPassword(signInDto.password, user.password);
    if (!match) throw new BadRequestException("Invalid credentials");
    return await this.getAuthInfo(user);
  }
  async verify(signInDto: SignInDto) {
    try {
      await this.signIn(signInDto);
      return { result: true };
    } catch (error) {
      return { result: false };
    }
  }
  async getAuthInfo(user: User) {
    const expirationTime = process.env.JWT_EXPIRATION_TIME || '48h'; // Example:
    const token = await this.signPayload(user, expirationTime);
    const expiresInMilliseconds =
      this.commonService.parseDurationToMilliseconds(expirationTime);
    const expirationTimestamp = Date.now() + expiresInMilliseconds;
    delete user.password;
    return { token, user, expirationTimestamp };
  }

  async signPayload(user: User, expirationTime: string) {
    const payload = {
      id: user.id,
    };

    return sign(payload, process.env.JWT_SECRET || 'developmentesecret<', {
      expiresIn: expirationTime,
    });
  }

  async getAuthenticatedUser(signInDto: SignInDto) {
    try {
      const user = await this.userRepository.findOneBy({email : signInDto.email});
      await this.verifyPassword(signInDto.password, user.password);
      delete user.password;
      return user;
    } catch (error) {
      throw new BadRequestException("Invalid credentials");
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    return await this.bcrypt.compare(plainTextPassword, hashedPassword);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
