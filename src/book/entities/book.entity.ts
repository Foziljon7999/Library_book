import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";

@Entity('book') 
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ type: 'int'})
  year: number;

  @Column()
  genre: string;

  @Column({ type: 'boolean', default: true})
  isAvailable: boolean;

  @ManyToMany(() => User, (user) => user.reservedBook)
  reservedBy: User[]
}



