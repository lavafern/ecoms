import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../model/prisma.service';

@Injectable()
export class StoreService {
    /**
     *
     */
    constructor(
        private prisma: PrismaService
    ) {}

    async create({name,
        description,
        provinsi,
        kota,
        kecamatan,
        kelurahan,
        fullAddress} : CreateDto, 
        userUid: string) {
        try {
            
            const newStore = await this.prisma.store.create({
                data: {
                    name,
                    userUid,
                    description,
                    storeAddress: {
                        create: {
                            provinsi,
                            kecamatan,
                            kelurahan,
                            kota,
                            fullAddress
                        }
                    }
                }
            })

            return newStore
        } catch (err) {
            console.log('err : ',err);
            if (err instanceof(PrismaClientKnownRequestError) && err.meta.target[0] === 'user_uid') {
                throw new ConflictException("You already have store!")
            }
            throw err
            
        }
    }

    async update() {
        
    }


}
