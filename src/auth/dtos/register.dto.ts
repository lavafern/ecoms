import { IsEmail, IsNotEmpty, IsDefined,  MinLength, MaxLength, IsNumberString, IsString} from "class-validator";

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
    @IsNumberString()
    @MinLength(9)
    phoneNumber : string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    provinsi : string

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    kota : string

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    kecamatan : string

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    kelurahan : string
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    fullAddress : string

    profilePicture : string;

}
