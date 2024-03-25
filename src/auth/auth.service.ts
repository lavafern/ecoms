import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/model/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dtos/register.dto';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { LoginDto } from './dtos/login.dto';
import { UserNotFoundException } from 'src/exceptions/userNotFoundException';
import { UserService } from 'src/user/user.service';
import { WrongPasswordException } from 'src/exceptions/wrongPasswordException';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwtPayload';
import { LoginResponse } from './interfaces/loginResponse';
import configuraion from 'config/configuraion';

@Injectable()
export class AuthService {
    private saltRounds: number = 10
    /**
     *
     */
    constructor(
        private prisma: PrismaService,
        private userService: UserService,
        private readonly jwtService: JwtService

    ) {}

    private hash(plainPassword: string) : Promise<string> {
        return new Promise((resolve,reject) => {
            bcrypt.hash(plainPassword, this.saltRounds, function(err: Error, hash: string) {
                if (err) reject(new InternalServerErrorException("Failed to hash string"));
                resolve(hash);
            });
        })
    }

    private compare(plainPassword: string, hash: string) : Promise<boolean> {
        return new Promise((resolve,reject) => {
            bcrypt.compare(plainPassword, hash, function(err : Error, result : boolean) {
                if (err) reject(new UnauthorizedException())
                resolve(result)
            });
        })
    }

    async register({email,password,name, provinsi,kota,kecamatan,kelurahan,fullAddress}: RegisterDto) :Promise<User> {

        try {
            
            const hashedPassword = await this.hash(password);

            const newUser = await this.prisma.user.create({
                data : {
                    email,
                    password : hashedPassword,
                    profile: {
                        create: {
                            name,
                            phoneNumber: '',
                            picture: "https://ik.imagekit.io/itspace/1703206263941_Prl5a3M8w.png?updatedAt=1703206266592",
                            userAddress: {
                                create : {
                                    provinsi,
                                    kota,
                                    kecamatan,
                                    kelurahan,
                                    fullAddress
                                }
                            }
                        }
                    },
                    userRole: {
                        create : {
                            roleUid: configuraion.userUid
                        }
                    }
                }
            });

            return newUser;
        } catch (err) {
            if (err instanceof(PrismaClientKnownRequestError) && err.code=='P2002') throw new ConflictException("Email already used");
            throw err;
        }
    }

    async login({email,password} : LoginDto) : Promise<LoginResponse> {
        try {
            
            const findUser = await this.userService.findOneByEmail(email)
            if (!findUser) throw new UserNotFoundException()

            const comparePassword = await this.compare(password,findUser.password)            
            console.log('finduser:',findUser);
            
            if (!comparePassword) throw new WrongPasswordException()
            const payload : JwtPayload = {
                uid: findUser.uid,
                email: findUser.email,
                roleUid: findUser.userRole.roleUid
                }

            const token = await this.jwtService.signAsync(payload)

            return {
                token: token,
                user: payload
            }


        } catch (err) {
            if (err instanceof(UserNotFoundException)) {
                throw new UnauthorizedException("Wrong email or password")
            }
            if (err instanceof(WrongPasswordException)) {
                throw new UnauthorizedException("Wrong email or password")
            }
            throw err
        }
    }

}
