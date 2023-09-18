import { Module } from '@nestjs/common';
import { IBcrypt } from './bcrypt/bcrypt.interface';
import { BcryptService } from './bcrypt/bcrypt.service';
import { TokenService } from './token/token.service';
import { EmailService } from './email/email.service';

@Module({
  imports: [],
  providers: [
    {
      provide: IBcrypt,
      useClass: BcryptService,
    },
  ],
  exports: [
    {
      provide: IBcrypt,
      useClass: BcryptService,
    },
    TokenService,
    EmailService,
  ],
})
export class SharedModule {}
