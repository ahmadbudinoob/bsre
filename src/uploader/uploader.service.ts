import { Injectable } from '@nestjs/common';
import { SignQRCoordinateDto } from './dto/sign.dto';

@Injectable()
export class UploaderService {
  signDocument(file: any, data: SignQRCoordinateDto) {
    console.log(data);
  }
}
