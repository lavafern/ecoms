import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
    /**
     *
     */
    constructor(
        private storeService: StoreService
    ) {}

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() storeData: CreateDto,@Request() req) {
        try {
            
            return await this.storeService.create(storeData,req.user.uid)
        } catch (err) {
            throw err
        }
    }
}
