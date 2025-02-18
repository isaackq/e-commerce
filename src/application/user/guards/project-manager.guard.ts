import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { User } from '@domain/entities/User';
import { ProjectRepositoryInterface } from '@domain/ports/project.repository.interface';

@Injectable()
export class ProjectManagerGuard implements CanActivate {
  constructor(
    @Inject('projectRepository')
    private readonly projectRepository: ProjectRepositoryInterface,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const projectId = request.params.id || request.body.projectId;

    if (!projectId) {
      throw new BadRequestException('Project ID is required');
    }

    const project = await this.projectRepository.findOne(projectId);
    if (!project) {
      throw new BadRequestException('Invalid project ID');
    }

    if (project.createdBy !== user) {
      throw new UnauthorizedException('You are not allowed to access this project');
    }

    return true;
  }
}
