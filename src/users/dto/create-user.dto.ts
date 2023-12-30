import { IsEmail, IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 30, { message: 'Строка должна включать от 2 до 30 символов' })
  @IsString()
  public username: string;
  @IsNotEmpty()
  @Length(2, 200, { message: 'Строка должна включать от 2 до 200 символов' })
  @IsString()
  public about?: string;
  @IsUrl()
  public avatar?: string;
  @IsEmail()
  public email: string;
  @IsNotEmpty()
  public password: string;
}
