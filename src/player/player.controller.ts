import { Controller, Post } from '@nestjs/common';

@Controller('player')
export class PlayerController {
  @Post()
  async playerPost() {
    return JSON.stringify({
      nome: 'Diego',
    });
  }
}
