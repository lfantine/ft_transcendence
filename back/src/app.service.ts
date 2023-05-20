import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'lfantine is great ! lfantine is good !';
  }
}
