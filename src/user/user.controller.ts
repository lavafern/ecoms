import { Controller, Get, HttpCode } from '@nestjs/common';
// import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
// @UseGuards(AuthGuard)
export class UserController {
    /**
     *
     */
    constructor() {}

    @Get("try")
    @HttpCode(200)
    try () {
        return {
            msg:"test ci2"
        }
    }
}
