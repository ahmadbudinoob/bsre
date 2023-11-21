import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  HttpStatus,
  HttpException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { SignQRCoordinateDto } from './dto/sign.dto';
import { UploaderService } from './uploader.service';
import { setResponse } from 'src/common/base-response';
import { ValidateFilePipe } from '../common/validation.pipe';

@Controller('uploader')
export class UploaderController {
  constructor(private readonly uploaderService: UploaderService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(new ValidateFilePipe()) file,
    @Body() data: SignQRCoordinateDto,
    @Res() res: Response,
  ) {
    try {
      return this.uploaderService.signDocument(file, data, res);
    } catch (error) {
      if (error instanceof HttpException) {
        return setResponse({}, error.getStatus(), error.message);
      } else {
        return setResponse({}, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
    }
  }
}
