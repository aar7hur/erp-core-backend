// interface-adapters/bcrypt/bcrypt.service.ts
import { IBcrypt } from './bcrypt.interface';

import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptService implements IBcrypt {
  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async hash(password: string, salt = 10): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
