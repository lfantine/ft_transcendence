import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  getHello(@Res() response: Response): string {
    response.send("nul");
    return "nul";
  }
}
