import { User } from 'src/users/entities/user.entity';
import { User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
  private constructor() {
    throw new Error(
      'PrismaNotificationMapper is a static class and should not be instantiated',
    );
  }

  public static toPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      email: user.props.email,
      name: user.props.name,
      password: user.props.password,
      isEmailVerified: user.props.isEmailVerified,
      createdAt: user.props.createdAt,
      updatedAt: user.props.updatedAt,
      salt: user.props.salt,
      resetPasswordDate: user.props.resetPasswordDate,
      resetPasswordStamp: user.props.resetPasswordStamp,
      accountAccessFailCount: user.props.accountAccessFailCount,
      emailConfirmToken: user.props.emailConfirmToken,
    };
  }

  public static toDomain(userPrismaData: PrismaUser): User {
    return new User(
      {
        name: userPrismaData.name,
        isEmailVerified: userPrismaData.isEmailVerified,
        email: userPrismaData.email,
        password: userPrismaData.password,
        createdAt: userPrismaData.createdAt,
        updatedAt: userPrismaData.updatedAt,
        emailConfirmToken: userPrismaData.emailConfirmToken,
        accountAccessFailCount: userPrismaData.accountAccessFailCount,
        resetPasswordStamp: userPrismaData.resetPasswordStamp,
        resetPasswordDate: userPrismaData.resetPasswordDate,
        salt: userPrismaData.salt,
      },
      userPrismaData.id,
    );
  }
}
