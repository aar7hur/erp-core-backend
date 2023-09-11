import { Injectable } from '@nestjs/common';
import { GetUserDto } from './dto/get-user-dto';
import { IUserService } from './user.service.interface';
import { IBcrypt } from 'src/shared/bcrypt/bcrypt.interface';
import { ConfigService } from '@nestjs/config';
import { IUserRepository } from './repository/user-repository.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService implements IUserService {
  passwordSalt = this.configService.get<number>('secrets.bcrypt_salt');
  constructor(
    private bcryptService: IBcrypt,
    private configService: ConfigService,
    private readonly userRepository: IUserRepository,
  ) {}

  async create(name: string, email: string, password: string) {
    const hashedPassword = await this.bcryptService.hash(
      password,
      this.passwordSalt,
    );

    const user = new User({
      name: name,
      email: email,
      createdAt: new Date(),
      updatedAt: new Date(),
      password: hashedPassword,
      salt: this.passwordSalt,
    });

    await this.userRepository.createUser(user);

    return new GetUserDto(
      user.props.name,
      user.props.email,
      user.props.password,
      user.props.isEmailVerified,
      user.props.createdAt,
      user.props.updatedAt,
      user.id,
      user.props.salt,
    );
  }

  async findById(id: string): Promise<GetUserDto> {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw Error('User not found');
    }

    return new GetUserDto(
      user.props.name,
      user.props.email,
      user.props.password,
      user.props.isEmailVerified,
      user.props.createdAt,
      user.props.updatedAt,
      user.id,
      user.props.salt,
    );
  }

  async findByEmail(email: string): Promise<GetUserDto> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw Error('User not found');
    }

    return new GetUserDto(
      user.props.name,
      user.props.email,
      user.props.password,
      user.props.isEmailVerified,
      user.props.createdAt,
      user.props.updatedAt,
      user.id,
      user.props.salt,
    );
  }

  async updateEmail(id: string, email: string) {
    const user = await this.checkUserExistance(id);
    user.props.email = email;
    user.props.updatedAt = new Date();

    await this.userRepository.updateUser(user);

    return new GetUserDto(
      user.props.name,
      user.props.email,
      user.props.password,
      user.props.isEmailVerified,
      user.props.createdAt,
      user.props.updatedAt,
      user.id,
      user.props.salt,
    );
  }
  async updatePassword(id: string, password: string) {
    const user = await this.checkUserExistance(id);

    // Generate a hashed password with a salt round of 10
    const passwordSalt = this.configService.get<number>('secrets.bcrypt_salt');
    const hashedPassword = await this.bcryptService.hash(
      password,
      passwordSalt,
    );
    user.props.updatedAt = new Date();
    user.props.resetPasswordDate = new Date();
    user.props.password = hashedPassword;

    await this.userRepository.updateUser(user);

    return new GetUserDto(
      user.props.name,
      user.props.email,
      user.props.password,
      user.props.isEmailVerified,
      user.props.createdAt,
      user.props.updatedAt,
      user.id,
      user.props.salt,
    );
  }

  private async checkUserExistance(id: string): Promise<User> {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw Error('User not found');
    }
    return user;
  }
}
