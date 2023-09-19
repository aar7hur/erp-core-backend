import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { IAgentService } from './service/agent.service.interface';
import { CreateAgentDto } from './dto/create-agent.dto';

@Controller('/v1/agent')
export class AgentController {
  constructor(private readonly agentService: IAgentService) {}

  @Post()
  create(@Body() createAgentDto: CreateAgentDto) {
    return this.agentService.create(createAgentDto);
  }

  @Get()
  findAll() {
    return this.agentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentService.remove(id);
  }
}
