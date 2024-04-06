import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import {jwtConstants} from './constants'
import { PrismaService } from '../model/prisma.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3d'}
    })
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController]
})
export class AuthModule {}
