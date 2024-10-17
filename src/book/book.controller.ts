import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('add')
  addBook(@Body() createBookDto: CreateBookDto) {
    return this.bookService.addBook(createBookDto);
  }

  @Get('all')
  findAll() {
    return this.bookService.findAll();
  }

  @Get('available')
  findAvailable()  {
    return this.bookService.findAvailableBooks();
  }

  @Patch(':id')
  updateBook(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.updateBook(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bookService.remove(+id);
  }

  @Patch(':id/availability')
  updateAvailability(
    @Param('id', ParseIntPipe) id: number,
    @Body('isAvailable') isAvailable: boolean,
  ) { 
  return this.bookService.updateBookAvailability(id, isAvailable)
  }
  }
