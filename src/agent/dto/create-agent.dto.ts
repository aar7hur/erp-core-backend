import { ApiProperty } from '@nestjs/swagger';
import { IsIP } from 'class-validator';

export class CreateAgentDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  operationalSystem: string;

  @IsIP()
  ip: string;

  @ApiProperty()
  port: number;
}
