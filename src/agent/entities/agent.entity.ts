import { v4 } from 'uuid';

export interface AgentProps {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  operationalSystem: string;
  ip: string;
  port: number;
}

export class Agent {
  public props: AgentProps;
  private _id: string;

  constructor(obj: Partial<AgentProps> = {}, id?: string) {
    this._id = !id ? v4() : id;

    this.props = {
      name: obj.name, // Provide default values for all properties
      createdAt: obj.createdAt || new Date(),
      updatedAt: obj.updatedAt || new Date(),
      operationalSystem: obj.operationalSystem,
      ip: obj.ip,
      port: obj.port,
    };
  }

  public get id(): string {
    return this._id;
  }
}
