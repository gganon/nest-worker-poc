import { Body, Controller, Get, Header, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { pbkdf2Sync, randomBytes } from 'crypto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/strong-hash')
  @HttpCode(200)
  @Header('Content-Type', 'text/plain')
  getStrongHash(@Body('input') input: string) {
    const buffer = pbkdf2Sync(input, randomBytes(64), 5000000, 64, 'sha512');
    return buffer.toString('base64');
  }
}
