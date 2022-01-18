import { Controller, Get } from '@nestjs/common';
import { AppService, VersionDto } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }

  @Get('/version')
  public getVersion(): VersionDto {
    return this.appService.getVersion();
  }
}
