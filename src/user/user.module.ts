import { Module } from '@nestjs/common';
import { UserService } from './user.service';
// import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './user.controller';
import { PrismaService } from 'src/model/prisma.service';

@Module({
  imports:[
  ],
  providers: [UserService,PrismaService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
