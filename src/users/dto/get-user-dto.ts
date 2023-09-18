import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @ApiProperty()
  updatedAt: Date;

  @IsNotEmpty()
  @ApiProperty()
  createdAt: Date;

  @IsNotEmpty()
  @ApiProperty()
  isEmailVerified: boolean;

  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @ApiProperty()
  salt: number;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  constructor(
    name: string,
    email: string,
    password: string,
    isEmailVerified: boolean,
    createdAt: Date,
    updatedAt: Date,
    id: string,
    salt: number,
  ) {
    super();
    this.email = email;
    this.createdAt = createdAt;
    this.isEmailVerified = isEmailVerified;
    this.email = email;
    this.id = id;
    this.name = name;
    this.password = password;
    this.updatedAt = updatedAt;
    this.salt = salt;
  }
}
