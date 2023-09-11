import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IBcrypt } from 'src/shared/bcrypt/bcrypt.interface';
import { UnauthorizedException } from '@nestjs/common';
import { GetUserDto } from 'src/users/dto/get-user-dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private bcryptService: IBcrypt,
    private configService: ConfigService,
  ) {}

  /**
   * Signs in a user with the provided email and password.
   * @param email The email of the user trying to sign in.
   * @param password The password of the user trying to sign in.
   * @returns An object containing an access token if the sign-in is successful.
   * @throws UnauthorizedException if the provided credentials are invalid or the user does not exist.
   */
  async signIn(email: string, password: string): Promise<any> {
    // Retrieve the user from the database using the provided email
    const user = await this.userService.findByEmail(email);

    const isUserValid = await this.validateUser(user, password);

    if (!isUserValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return await this.login(user);
  }

  private async validateUser(
    user: void | GetUserDto,
    password: string,
  ): Promise<boolean> {
    // Throw UnauthorizedException if the user does not exist (for security reasons)
    if (!user) {
      return false;
    }

    // Check if the provided password matches the user's stored password
    const isPasswordValid = await this.bcryptService.validatePassword(
      password,
      user.password,
    );

    // Throw UnauthorizedException if the password is invalid
    if (!isPasswordValid) {
      return false;
    }

    return true;
  }

  async getUserByToken(token: string): Promise<GetUserDto | null> {
    const userId = await this.extractUserIdFromToken(token);

    if (!userId) {
      throw Error('User not found');
    }

    const user = await this.userService.findById(userId);
    if (!user) {
      throw Error('User not found');
    }

    return user;
  }

  async generateToken(userId: string): Promise<string> {
    const token = await this.jwtService.signAsync(userId);
    return token;
  }

  async updatePassword(userid: string, password: string): Promise<void> {
    await this.userService.updatePassword(userid, password);
  }

  async getUserByEmail(email: string): Promise<GetUserDto> {
    return await this.userService.findByEmail(email);
  }

  private async extractUserIdFromToken(token: string): Promise<string | null> {
    try {
      const decodedToken: any = await this.jwtService.verifyAsync(token);
      return decodedToken.userId;
    } catch (error) {
      return null;
    }
  }

  private async login(user: GetUserDto) {
    // Create a payload for the JWT token containing user information
    const payload = { sub: user.id, name: user.email };

    // Generate and return an access token using the JWT service
    return {
      access_token: await this.jwtService.signAsync(payload),
      expires_in: this.configService.get<string>(
        'secrets.token_expiration_time_seconds',
      ),
    };
  }
}
