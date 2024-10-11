import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Module({
  controllers: [UsersController],
  providers: [ {
    provide: 'BcryptType',
    useValue: bcrypt,
  },UsersService],
  imports: [TypeOrmModule.forFeature([User]),  
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION_TIME
      },
    }),
  }),]
})
export class UsersModule {}
