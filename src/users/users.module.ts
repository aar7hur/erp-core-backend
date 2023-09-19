import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { PrismaModule } from 'src/repository/prisma.module';
import { PrismaUserRepository } from './repository/prisma-users.repository';
import { IUserRepository } from './repository/user-repository.interface';
import { SharedModule } from 'src/shared/shared.module';
import { IUserService } from './user.service.interface';

@Module({
  imports: [PrismaModule, SharedModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    User,
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: IUserService,
      useClass: UsersService,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
