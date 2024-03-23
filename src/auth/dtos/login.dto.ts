import { IsEmail, IsNotEmpty, IsDefined,  MinLength, MaxLength} from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @IsDefined()
    @IsNotEmpty()
    email : string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(14)
    @IsDefined()
    @IsNotEmpty()
    password :  string;


}
