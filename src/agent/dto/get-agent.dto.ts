import { PartialType } from '@nestjs/swagger';
import { CreateAgentDto } from './create-agent.dto';
import { IsUUID } from 'class-validator';

export class GetAgentDto extends PartialType(CreateAgentDto) {
  @IsUUID()
  id: string;
  createdAt: Date;
  udpdatedAt: Date;
}
