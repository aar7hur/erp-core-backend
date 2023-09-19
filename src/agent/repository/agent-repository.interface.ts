import { Agent } from '../entities/agent.entity';

export abstract class IAgentRepository {
  abstract getAgentById(id: string): Promise<Agent | void>;
  abstract createAgent(agent: Agent): Promise<void>;
  abstract getAll(): Promise<Agent[] | void>;
  abstract remove(id: string): Promise<void>;
}
