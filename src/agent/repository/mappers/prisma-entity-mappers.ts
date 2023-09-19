import { Agent } from 'src/agent/entities/agent.entity';
import { Agent as PrismaAgent } from '@prisma/client';

export class PrismaAgentMapper {
  private constructor() {
    throw new Error(
      'PrismaNotificationMapper is a static class and should not be instantiated',
    );
  }

  public static toPrisma(agent: Agent): PrismaAgent {
    return {
      id: agent.id,
      name: agent.props.name,
      createdAt: agent.props.createdAt,
      updatedAt: agent.props.updatedAt,
      operationalSystem: agent.props.operationalSystem,
      port: agent.props.port,
      ip: agent.props.ip,
    };
  }

  public static toDomain(agentPrismaData: PrismaAgent): Agent {
    return new Agent(
      {
        name: agentPrismaData.name,
        createdAt: agentPrismaData.createdAt,
        updatedAt: agentPrismaData.updatedAt,
        operationalSystem: agentPrismaData.operationalSystem,
        port: agentPrismaData.port,
        ip: agentPrismaData.ip,
      },
      agentPrismaData.id,
    );
  }
}
