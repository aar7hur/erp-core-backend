import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    // Implement your email sending logic here, e.g., using Nodemailer or a third-party email service
    // Include the token in the email content
  }
}
