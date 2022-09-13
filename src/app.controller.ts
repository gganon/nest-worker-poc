import { Body, Controller, Get, Header, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { strongHashAsync } from './worker/strong-hash-async';

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
    return strongHashAsync(input);
  }
}
