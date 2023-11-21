import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UploaderModule } from './uploader/uploader.module';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env' }), UploaderModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  static BSRE_URL: string;
  static API_KEY: string;
  static API_PASS: string;

  constructor(private readonly configService: ConfigService) {
    AppModule.BSRE_URL = this.configService.get<string>('BSRE_URL_SIGN');
    AppModule.API_KEY = this.configService.get<string>('API_KEY');
    AppModule.API_PASS = this.configService.get<string>('API_PASS');
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
