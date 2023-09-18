import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PasswordServiceService } from './auth/password-service/password-service.service';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    SharedModule,
  ],
  providers: [PasswordServiceService],
})
export class AppModule {}
