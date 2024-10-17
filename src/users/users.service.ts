import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Book } from 'src/book/entities/book.entity';

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
      @InjectRepository(Book)
      private booksRepository: Repository<Book>
    ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser); 
    }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
    }
    
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    }

  async reserveBook(userId: number, bookId: number){
    const user = await this.findUserById(userId)
    const book = await this.booksRepository.findOne({ where: { id: bookId}})
    if(!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`)
    }
    user.reservedBook.push(book)
    await this.usersRepository.save(user)
  }

  async returnBook(userId: number, bookId: number) {
    const user = await this.findUserById(userId)

    if (!user.reservedBook || user.reservedBook.length === 0) {
      throw new NotFoundException('No reserved books found for this user');
    }

    const bookIndex = user.reservedBook.findIndex(book => book.id === Number(bookId))
    if(bookIndex === -1) {
      throw new NotFoundException('No reserved books')
    }
    user.reservedBook.splice(bookIndex, 1)
    await this.usersRepository.save(user)
  }

  private async findUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: {id},
    relations: ['reservedBook']
    })
    if(!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return user
  }
}
