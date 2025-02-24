import { ProjectTransformer } from '@application/project/transformer/project.transformer';
import { CreateProjectUsecase } from '@application/project/usecase/create-project.usecase';
import { ProjectController } from '@infrastructure/controllers/project.controller';
import { ProjectRepository } from '@infrastructure/repositories/project.repository';
import { Project, ProjectSchema } from '@infrastructure/schemas/project.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }])],
  controllers: [ProjectController],
  providers: [
    CreateProjectUsecase,
    ProjectTransformer,
    {
      provide: 'ProjectRepository',
      useClass: ProjectRepository,
    },
  ],
  exports: [{ provide: 'ProjectRepository', useClass: ProjectRepository }],
})
export class ProjectModule {}
