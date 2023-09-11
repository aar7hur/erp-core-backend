import { Module } from '@nestjs/common';
import { IBcrypt } from './bcrypt/bcrypt.interface';
import { BcryptService } from './bcrypt/bcrypt.service';

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
  ],
})
export class SharedModule {}
