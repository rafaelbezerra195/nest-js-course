import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGOOSE_URI),
    PlayerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
