import { IsEmail, IsNotEmpty } from 'class-validator';

export class PlayerDto {
  @IsNotEmpty()
  readonly phoneNumber: string;
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly nome: string;
}
