import { Agent, AgentProps } from './agent.entity'; // Import the Agent class and AgentProps interface
import { validate } from 'uuid';

const agentProps: AgentProps = {
  name: 'Test Agent',
  createdAt: new Date(),
  updatedAt: new Date(),
  operationalSystem: 'Windows',
  ip: '192.168.1.100',
  port: 8080,
};

describe('Agent Class', () => {
  // Test case 1: Creating an Agent instance with required properties
  it('should create an Agent instance with required properties', () => {
    const agent = new Agent(agentProps);

    expect(agent).toBeDefined();
    expect(agent.props).toEqual(agentProps);
  });

  // Test case 2: Creation of valid UUID4 id
  it('should create an Agent instance with a valid UUID instance', () => {
    const agent = new Agent(agentProps);

    expect(agent).toBeDefined();
    expect(agent.props).toEqual(agentProps);
    expect(validate(agent.id)).toBe(true);
  });
});
