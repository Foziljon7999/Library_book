import { Controller, Post, Delete, Param, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post(':userId/reserve/:bookId')
  async reserveBook(@Param('userId') userId: number, @Param('bookId') bookId: number) {
    return this.usersService.reserveBook(userId, bookId);
  }

  @Delete(':userId/return/:bookId')
  async returnBook(@Param('userId') userId: number, @Param('bookId') bookId: number) {
    return this.usersService.returnBook(userId, bookId);
  }
}
