import { User } from '../entities/user.entity';

export abstract class IUserRepository {
  abstract getUserById(id: string): Promise<User | void>;
  abstract getUserByToken(string: string): Promise<User | void>;
  abstract findByEmail(email: string): Promise<User | void>;
  abstract createUser(user: User): Promise<void>;
  abstract updateUser(user: User): Promise<void>;
}
