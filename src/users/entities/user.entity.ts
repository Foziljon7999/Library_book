import { Book } from "src/book/entities/book.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @ManyToMany(() => Book, (book) => book.reservedBy, { cascade: true})
    @JoinTable()
    reservedBook: Book[];
}
