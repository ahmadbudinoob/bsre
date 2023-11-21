import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { SignQRCoordinateDto } from './dto/sign.dto';
import axios, { AxiosResponse } from 'axios';
import * as FormData from 'form-data';
import { AppModule } from 'src/app.module';
@Injectable()
export class UploaderService {
  async signDocument(
    file: Express.Multer.File,
    data: SignQRCoordinateDto,
    res: Response,
  ) {
    const formData = this.appendFormQRCoordinat(file, data);
    const response = await this.sendRequestToBSRE(formData);
    return this.writeToFile(file, response, res);
  }

  private appendFormQRCoordinat(
    file: Express.Multer.File,
    data: SignQRCoordinateDto,
  ) {
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);
    formData.append('nik', data.nik);
    formData.append('passphrase', data.passphrase);
    formData.append('tampilan', 'visible');
    formData.append('image', 'false');
    formData.append('linkQR', data.linkQR);
    formData.append('width', data.width.toString());
    formData.append('height', data.height.toString());
    formData.append('tag_koordinat', data.kordinat);
    return formData;
  }

  private sendRequestToBSRE(formData: FormData) {
    const credentials = Buffer.from(
      `${AppModule.API_KEY}:${AppModule.API_PASS}`,
    ).toString('base64');
    const basicAuthHeader = `Basic ${credentials}`;
    return axios.post(`${AppModule.BSRE_URL}`, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: basicAuthHeader,
      },
      responseType: 'stream',
    });
  }

  private writeToFile(
    file: Express.Multer.File,
    response: AxiosResponse,
    res: Response,
  ) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'inline; filename=' + file.originalname,
    );

    response.data.pipe(res);
  }
}
