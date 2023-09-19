import { Module } from '@nestjs/common';
import { AgentService } from './service/agent.service';
import { AgentController } from './agent.controller';
import { PrismaModule } from 'src/repository/prisma.module';
import { Agent } from './entities/agent.entity';
import { IAgentRepository } from './repository/agent-repository.interface';
import { PrismaAgentRepository } from './repository/prisma-agent.repository';
import { IAgentService } from './service/agent.service.interface';

@Module({
  imports: [PrismaModule],
  controllers: [AgentController],
  providers: [
    Agent,
    {
      provide: IAgentRepository,
      useClass: PrismaAgentRepository,
    },
    {
      provide: IAgentService,
      useClass: AgentService,
    },
  ],
})
export class AgentModule {}
