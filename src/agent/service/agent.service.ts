import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from '../dto/create-agent.dto';
import { IAgentService } from './agent.service.interface';
import { IAgentRepository } from '../repository/agent-repository.interface';
import { GetAgentDto } from '../dto/get-agent.dto';
import { Agent } from '../entities/agent.entity';

@Injectable()
export class AgentService implements IAgentService {
  constructor(private readonly agentRepository: IAgentRepository) {}

  async create(createAgentDto: CreateAgentDto): Promise<GetAgentDto> {
    const agent = new Agent({
      name: createAgentDto.name,
      ip: createAgentDto.ip,
      port: createAgentDto.port,
      operationalSystem: createAgentDto.operationalSystem,
    });

    await this.agentRepository.createAgent(agent);

    return new GetAgentDto({
      name: agent.props.name,
      id: agent.id,
      createdAt: agent.props.createdAt,
      ip: agent.props.ip,
      port: agent.props.ip,
      updatedAt: agent.props.updatedAt,
      operationalSystem: agent.props.operationalSystem,
    });
  }

  async findById(id: string) {
    const agent = await this.agentRepository.getAgentById(id);

    if (!agent) {
      throw new Error('Agent Not found');
    }

    return new GetAgentDto({
      name: agent.props.name,
      id: agent.id,
      createdAt: agent.props.createdAt,
      ip: agent.props.ip,
      port: agent.props.ip,
      updatedAt: agent.props.updatedAt,
      operationalSystem: agent.props.operationalSystem,
    });
  }

  async findAll(): Promise<GetAgentDto[] | []> {
    const agents = await this.agentRepository.getAll();

    if (!agents) {
      return [];
    }

    return agents.map(
      (agent) =>
        new GetAgentDto({
          name: agent.props.name,
          id: agent.id,
          createdAt: agent.props.createdAt,
          ip: agent.props.ip,
          port: agent.props.port,
          updatedAt: agent.props.updatedAt,
          operationalSystem: agent.props.operationalSystem,
        }),
    );
  }

  async remove(id: string): Promise<void> {
    await this.agentRepository.remove(id);
  }
}
