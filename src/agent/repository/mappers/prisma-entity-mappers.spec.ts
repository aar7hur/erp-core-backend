import { PrismaAgentMapper } from './prisma-entity-mappers';
import { Agent } from 'src/agent/entities/agent.entity';

const agent: Agent = new Agent({
  name: 'Test Agent',
  createdAt: new Date(),
  updatedAt: new Date(),
  operationalSystem: 'Windows',
  ip: '192.168.1.100',
  port: 8080,
});

describe('Prisma Agent Mapper class', () => {
  // Test case 1: Creating an Agent instance with required properties
  it('should convert an agent entity to a prisma agent database entity', () => {
    const prismaAgent = PrismaAgentMapper.toPrisma(agent);
    expect(prismaAgent).toEqual({
      id: agent.id,
      name: agent.props.name,
      createdAt: agent.props.createdAt,
      updatedAt: agent.props.updatedAt,
      operationalSystem: agent.props.operationalSystem,
      port: agent.props.port,
      ip: agent.props.ip,
    });
  });

  // Test case 2: Creation of valid UUID4 id
  it('should convert a prisma agent entity to an agent entity', () => {
    const prismaAgent = PrismaAgentMapper.toPrisma(agent);

    expect(PrismaAgentMapper.toDomain(prismaAgent)).toEqual(agent);
  });
});
