import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignQRCoordinateDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'NIK is required' })
  nik: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Passphrase is required' })
  passphrase: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Width is required' })
  width: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Height is required' })
  height: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Koordinat is required' })
  kordinat: string;

  tampilan: string;

  image: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Link QR is required' })
  linkQR: string;

  constructor(partial: Partial<SignQRCoordinateDto>) {
    this.tampilan = 'visible';
    this.image = 'false';
    Object.assign(this, partial);
  }
}
