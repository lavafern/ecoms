import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { StoreService } from './store.service';
import { AuthGuard } from '../auth/auth.guard';

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
