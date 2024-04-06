import { Controller, Get, HttpCode } from '@nestjs/common';
@Controller('users')
export class UserController {
    /**
     *
     */
    constructor() {}

    @Get("try")
    @HttpCode(200)
    try () {
        return {
            msg:"test ci edited again"
        }
    }
}
