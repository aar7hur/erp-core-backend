import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/shared/email/email.service';
import { TokenService } from 'src/shared/token/token.service';
import { GetUserDto } from 'src/users/dto/get-user-dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PasswordService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly emailService: EmailService,
  ) {}

  async sendPasswordResetEmail(email: string): Promise<void> {
    const token = await this.tokenService.generateToken();
    await this.emailService.sendPasswordResetEmail(email, token);
  }
}
