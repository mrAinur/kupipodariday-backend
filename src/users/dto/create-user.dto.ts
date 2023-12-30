import { IsEmail, IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 30, { message: 'Строка должна включать от 2 до 30 символов' })
  @IsString()
  username: string;
  @IsNotEmpty()
  @Length(2, 200, { message: 'Строка должна включать от 2 до 200 символов' })
  @IsString()
  about?: string;
  @IsUrl()
  avatar?: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
