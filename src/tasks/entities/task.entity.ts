import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: false })
    isCompleted: boolean;

    @Column({length: 50})
    name: string;

    @Column({length: 50})
    details: string;

    @ManyToOne(() => User, (user) => user.tasks)
    user: User;
}
