import { IsEmail, IsNotEmpty, IsDefined} from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @IsDefined()
    @IsNotEmpty()
    email : string;

    @IsNotEmpty()
    @IsDefined()
    @IsNotEmpty()
    password :  string;


}
