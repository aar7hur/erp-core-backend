import { Injectable } from '@nestjs/common';
import { TokenService } from 'src/shared/token/token.service';

@Injectable()
export class PasswordService {
  constructor(private readonly tokenService: TokenService) {}

  async sendPasswordResetEmail(email: string): Promise<void> {}
}