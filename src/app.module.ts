import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UploaderModule } from './uploader/uploader.module';

@Module({
  imports: [UploaderModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
