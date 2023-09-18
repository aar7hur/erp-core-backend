import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IBcrypt } from 'src/shared/bcrypt/bcrypt.interface';
import { UnauthorizedException } from '@nestjs/common';
import { GetUserDto } from 'src/users/dto/get-user-dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
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
  async signIn(
    password: string,
    userDbPassword: string,
    email: string,
    id: string,
  ): Promise<object> {
    const isUserValid = await this.validateUser(userDbPassword, password);

    if (!isUserValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return await this.login(id, email);
  }

  private async validateUser(
    userDbPassword: string,
    password: string,
  ): Promise<boolean> {
    // Throw UnauthorizedException if the user does not exist (for security reasons)

    // Check if the provided password matches the user's stored password
    const isPasswordValid = await this.bcryptService.validatePassword(
      password,
      userDbPassword,
    );

    // Throw UnauthorizedException if the password is invalid
    if (!isPasswordValid) {
      return false;
    }

    return true;
  }

  async generateToken(userId: string): Promise<string> {
    return await this.jwtService.signAsync(userId);
  }

  async extractUserIdFromToken(token: string): Promise<string | null> {
    try {
      const decodedToken: any = await this.jwtService.verifyAsync(token);
      return decodedToken.userId;
    } catch (error) {
      return null;
    }
  }

  private async login(userId: string, userEmail: string) {
    // Create a payload for the JWT token containing user information
    const payload = { sub: userId, name: userEmail };

    // Generate and return an access token using the JWT service
    return {
      access_token: await this.jwtService.signAsync(payload),
      expires_in: this.configService.get<string>(
        'secrets.token_expiration_time_seconds',
      ),
    };
  }
}
