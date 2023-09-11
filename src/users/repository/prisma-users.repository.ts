import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user-repository.interface';
import { User } from '../entities/user.entity';
import { PrismaService } from 'src/repository/prisma.service';
import { PrismaClient } from '@prisma/client';
import { PrismaUserMapper } from './mappers/prisma-user-mappers';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async updateUser(user: User): Promise<void> {
    const prismaData = PrismaUserMapper.toPrisma(user);

    try {
      // Use a Prisma transaction to perform both user existence check and user creation atomically
      await this.prismaService.$transaction(async (prisma: PrismaClient) => {
        // Query the database to find a user with the same email
        const existingUser = await prisma.user.findUnique({
          where: {
            id: prismaData.id,
          },
        });

        // If a user does not exists, it cannot be updated.
        if (!existingUser) {
          throw new Error('User does not exists.');
        }

        // If the user with the id already exists update it in the database
        await prisma.user.update({
          where: {
            id: prismaData.id,
          },
          data: prismaData,
        });
      });
    } catch (error) {
      // Handle any potential errors here, or re-throw a more generic exception
      throw new Error('Failed to create user.');
    }
  }

  async getUserById(id: string): Promise<User | void> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async getUserByToken(token: string): Promise<User | void> {
    const user = await this.prismaService.user.findFirst({
      where: {
        resetPasswordStamp: token,
      },
    });
    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | void> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }
  /**
   * Creates a new user in the database using Prisma, ensuring uniqueness based on the user's email.
   * @param user The user object representing the user to be created.
   * @throws Error if a user with the same email already exists in the database.
   */
  async createUser(user: User): Promise<void> {
    // Convert the user object to a format compatible with Prisma's data model (PrismaUser)
    const prismaData = PrismaUserMapper.toPrisma(user);

    try {
      // Use a Prisma transaction to perform both user existence check and user creation atomically
      await this.prismaService.$transaction(async (prisma: PrismaClient) => {
        // Query the database to find a user with the same email
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.props.email,
          },
        });

        // If a user with the same email already exists, throw an error
        // @TODO: Raise custom exception here
        if (existingUser) {
          throw new Error('User already exists.');
        }

        // If the user with the email does not exist, create a new user in the database
        await prisma.user.create({
          data: prismaData,
        });
      });
    } catch (error) {
      // Handle any potential errors here, or re-throw a more generic exception
      throw new Error('Failed to create user.');
    }
  }
}
