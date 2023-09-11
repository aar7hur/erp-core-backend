import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { ResetPasswordDto } from './dto/reset-password';
import { Public } from 'src/shared/public/public.decorator';

@Controller('/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  create(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }

  @Public()
  @Post('v1/reset-password')
  async resetPassword(@Body() body: ResetPasswordDto): Promise<string> {
    const { token, newPassword } = body;
    const user = await this.authService.getUserByToken(token);

    if (!user.id) {
      return 'Invalid or expired token.';
    }

    await this.authService.updatePassword(user.id, newPassword);
  }
}
