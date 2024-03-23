import { IsEmail, IsNotEmpty, IsDefined,  MinLength, MaxLength, IsNumberString} from "class-validator";

export class RegisterDto {
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

    @IsDefined()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    name : string;

    @IsDefined()
    @IsNotEmpty()
    @MinLength(4)
    region : string;

    @IsDefined()
    @IsNotEmpty()
    @IsNumberString()
    @MinLength(9)
    phoneNumber : string;

    profilePicture : string;

}
