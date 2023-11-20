import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignQRCoordinateDto {
  @ApiProperty()
  @IsNotEmpty()
  nik: string;

  @ApiProperty()
  @IsNotEmpty()
  file: any;

  @ApiProperty()
  @IsNotEmpty()
  passphrase: string;

  @ApiProperty()
  @IsNotEmpty()
  width: number;

  @ApiProperty()
  @IsNotEmpty()
  height: number;

  @ApiProperty()
  @IsNotEmpty()
  kordinat: string;

  @ApiProperty()
  @IsNotEmpty()
  visible: boolean;

  @ApiProperty()
  @IsNotEmpty()
  image: boolean;

  constructor(partial: Partial<SignQRCoordinateDto>) {
    Object.assign(this, partial);
    this.visible = true;
    this.image = false;
  }
}
