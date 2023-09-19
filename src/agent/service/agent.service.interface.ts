import { GetAgentDto } from '../dto/get-agent.dto';
import { CreateAgentDto } from '../dto/create-agent.dto';

export abstract class IAgentService {
  abstract create(createAgentDto: CreateAgentDto): Promise<GetAgentDto>;
  abstract findAll(): Promise<GetAgentDto[] | []>;
  abstract findById(id: string): Promise<GetAgentDto>;
  abstract remove(id: string): Promise<void>;
}
