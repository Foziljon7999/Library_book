import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) 
    private bookRepository: Repository<Book>
  ) {}
  
 async addBook(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = this.bookRepository.create(createBookDto)  
    return await this.bookRepository.save(newBook);
  }

 async findAll() {
    const booksAll = await this.bookRepository.find()
    return booksAll;
  }

 async updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
  const book = await this.bookRepository.findOneBy({id})
  if(!book) {
    throw new NotFoundException('Book not found')
  }
  const updatedBook = Object.assign(book, updateBookDto)

  return await this.bookRepository.save(updatedBook);
  }

 async remove(id: number): Promise<void> {
    const deleteBook = await this.bookRepository.findOneBy({id})
    if(!deleteBook) {
      throw new NotFoundException('Book not found')
    }
     await this.bookRepository.delete(id)
  }

  async  findAvailableBooks(): Promise<Book[]> {
    return this.bookRepository.find({ where: { isAvailable: true}});
  }

  async updateBookAvailability(id: number, isAvailable: boolean): Promise<Book> {
    const book = await this.findBookById(id);
    book.isAvailable = isAvailable;
    return this.bookRepository.save(book)
  }

  private async findBookById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }
}
