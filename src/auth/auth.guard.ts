import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtSecret } from './constants';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/shared/public/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private readonly reflector: Reflector) {}

  /**
   * Method to check if the incoming request has a valid JWT token in the 'Authorization' header.
   * If the token is valid, the user's data (payload) is attached to the request object.
   * @param context The execution context representing the current HTTP request.
   * @returns A boolean indicating whether the route should be allowed to proceed.
   * @throws UnauthorizedException If the token is missing or invalid.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }
    const request = context.switchToHttp().getRequest() as Request;
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtSecret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      // The payload (user data) extracted from the JWT is attached to the request object as the property 'user'.
      // This allows the user information to be accessed by the route handler or other middleware further down the request chain.
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  /**
   * Extracts the JWT token from the 'Authorization' header in the HTTP request.
   * The header should follow the format 'Bearer <token>'.
   * @param request The HTTP request object.
   * @returns The JWT token or undefined if not found or header is invalid.
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
