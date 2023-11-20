import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SignQRCoordinateDto } from './dto/sign.dto';
import axios from 'axios';
import * as FormData from 'form-data'; // Import FormData

@Controller('uploader')
export class UploaderController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Body() data: SignQRCoordinateDto) {
    const formData = new FormData();

    // Append the file to the FormData object
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    data.visible = true;
    data.image = false;
    formData.append('data', JSON.stringify(data));
    const credentials = Buffer.from('esign:qwerty').toString('base64');
    const basicAuthHeader = `Basic ${credentials}`;

    try {
      const response = await axios.post(
        'http://10.251.24.215/api/sign/pdf',
        formData,
        {
          headers: {
            ...formData.getHeaders(), // Include form-data headers
            Authorization: basicAuthHeader,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  @Get('checkStatus/:nik')
  async checkStatus(@Param('nik') nik) {
    try {
      const basicAuthHeader =
        'Basic ' + Buffer.from('esign:qwerty').toString('base64');
      const response = await axios.get(
        `http://10.251.24.215/api/user/status/${nik}`,
        { headers: { Authorization: basicAuthHeader } },
      );
      return response.data;
    } catch (error) {
      console.error('Error Get status of nik:', error);
      throw new HttpException(
        'Failed to get status',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
