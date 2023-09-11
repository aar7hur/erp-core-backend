import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user-dto';

export abstract class IUserService {
  abstract create(
    name: string,
    email: string,
    password: string,
  ): Promise<GetUserDto>;
  abstract findById(id: string): Promise<GetUserDto>;
  abstract findByEmail(email: string): Promise<GetUserDto>;
  abstract updatePassword(id: string, password: string);
  abstract updateEmail(id: string, email: string);
}
