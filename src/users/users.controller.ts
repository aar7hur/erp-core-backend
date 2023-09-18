import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put()
  updateEmail(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateEmail(updateUserDto.id, updateUserDto.email);
  }
}
