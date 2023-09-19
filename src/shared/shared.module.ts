import { Module } from '@nestjs/common';
import { IBcrypt } from './bcrypt/bcrypt.interface';
import { BcryptService } from './bcrypt/bcrypt.service';
import { TokenService } from './token/token.service';

@Module({
  imports: [],
  providers: [
    {
      provide: IBcrypt,
      useClass: BcryptService,
    },
    TokenService,
  ],
  exports: [
    {
      provide: IBcrypt,
      useClass: BcryptService,
    },
    TokenService,
  ],
})
export class SharedModule {}
