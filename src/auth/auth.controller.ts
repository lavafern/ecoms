import { Body, Controller, Get, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { AuthGuard } from './auth.guard';
import { LoginDto } from './dtos/login.dto';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
    /**
     *
     */
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register')
    @HttpCode(201)
    async register(@Body() registerDto: RegisterDto) {
        try {
            
            return await this.authService.register(registerDto)

        } catch (err) {
            throw err;
        }
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginDto: LoginDto, @Res({passthrough: true}) res: Response) {
        try {
            const {token,user} = await this.authService.login(loginDto)

            res.cookie('token',token, {httpOnly:true, maxAge: 3600000 * 24 * 3  ,sameSite: 'none', secure: true})

            return user
        } catch (err) {
            throw err
        }
    }

    @Get("test")
    @UseGuards(AuthGuard)
    async test() {
        return {Data: 'ww'}
    }
}
