import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class AppController {
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'files', maxCount: 1 },
      { name: 'sign', maxCount: 1 },
    ]),
  )
  uploadFiles(
    @UploadedFiles()
    files: {
      files?: Express.Multer.File[];
      sign?: Express.Multer.File[];
    },
    @Body('nik') nik: string,
  ) {
    console.log(files.files); // Array of files for 'file1' key
    console.log(files.sign); // Array of files for 'file2' key
    console.log(nik);
  }
}
