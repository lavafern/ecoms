import { Injectable } from '@nestjs/common';
import { PrismaService } from '../model/prisma.service';

@Injectable()
export class UserService {
    /**
     *
     */
    constructor(
        private prisma: PrismaService
    ) {}

    async findOne(uid: string) {
        try {
            
            return await this.prisma.user.findUnique({
                where : {
                    uid
                }
            })

        } catch (err) {
            throw err
        }            

    }
    async findOneByEmail(email: string) {
        try {
            
            return await this.prisma.user.findUnique({
                where : {
                    email
                },
                include: {
                    userRole: true
                }
            })

        } catch (err) {
            throw err
        }            

    }
    async findMany() {
        try {
            return await this.prisma.user.findMany()
        } catch (err) {
            throw err
        }
    }

}
