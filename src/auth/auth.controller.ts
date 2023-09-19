import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { ResetPasswordDto } from './dto/reset-password';
import { Public } from 'src/shared/public/public.decorator';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password-service/password-service.service';

@Controller('/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly passWordService: PasswordService,
  ) {}

  @Post('login')
  @Public()
  async create(@Body() loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    return this.authService.signIn(
      loginDto.password,
      user.password,
      loginDto.email,
      user.id,
    );
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto): Promise<void> {
    const { token, newPassword } = body;
    const userId = await this.authService.extractUserIdFromToken(token);

    if (!userId) {
      throw Error('Invalid or expired token.');
    }
    // improve this due to security reasons

    await this.userService.updatePassword(userId, newPassword);
  }
}
