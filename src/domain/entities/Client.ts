import { Project } from './Project';

export class Client {
  public id?: string;
  public firstName: string;
  public lastName: string;
  public classification: string;
  public country: string;
  public identityNumber: string;
  public projects: Project[];
  public evaluation: string;
}
