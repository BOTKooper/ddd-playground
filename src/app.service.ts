import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json');

export type VersionDto = { version: string };

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  public getVersion(): VersionDto {
    return { version: packageJson.version };
  }
}
