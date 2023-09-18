import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class TokenService {
  async generateToken(): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    // Store the token in the database, along with user ID and expiration time
    // Replace 'user' with your actual User model
    return token;
  }
}
