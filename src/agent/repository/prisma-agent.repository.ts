import { Injectable } from '@nestjs/common';
import { IAgentRepository } from './agent-repository.interface';
import { Agent } from '../entities/agent.entity';
import { PrismaService } from 'src/repository/prisma.service';
import { PrismaClient } from '@prisma/client';
import { PrismaAgentMapper } from './mappers/prisma-entity-mappers';

@Injectable()
export class PrismaAgentRepository implements IAgentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAgentById(id: string): Promise<void | Agent> {
    const agent = await this.prismaService.agent.findUnique({
      where: {
        id: id,
      },
    });
    if (!agent) {
      return null;
    }

    return PrismaAgentMapper.toDomain(agent);
  }

  /**
   * Creates a new agent in the database using Prisma, ensuring uniqueness based on the agent's ip.
   * @param agent The agent object representing the agent to be created.
   * @throws Error if a agent with the same ip already exists in the database.
   */
  async createAgent(agent: Agent): Promise<void> {
    // Convert the agent object to a format compatible with Prisma's data model (Prismaagent)
    const prismaData = PrismaAgentMapper.toPrisma(agent);

    try {
      // Use a Prisma transaction to perform both agent existence check and agent creation atomically
      await this.prismaService.$transaction(async (prisma: PrismaClient) => {
        // Query the database to find a agent with the same ip
        const existingAgent = await prisma.agent.findUnique({
          where: {
            ip: agent.props.ip,
          },
        });

        // If an agent with the same ip already exists, throw an error
        // @TODO: Raise custom exception here
        if (existingAgent) {
          throw new Error('Agent already exists.');
        }

        // If the agent with the ip does not exist, create a new agent in the database
        await prisma.agent.create({
          data: prismaData,
        });
      });
    } catch (error) {
      // Handle any potential errors here, or re-throw a more generic exception
      throw new Error('Failed to create agent.');
    }
  }

  async getAll(): Promise<Agent[] | []> {
    const agents = await this.prismaService.agent.findMany();

    // If no agents are found, return an empty array
    if (!agents || agents.length === 0) {
      return [];
    }

    return agents.map((agent) => PrismaAgentMapper.toDomain(agent));
  }

  async remove(id: string): Promise<void> {
    await this.prismaService.agent.delete({
      where: {
        id: id,
      },
    });
  }
}
