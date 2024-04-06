import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthModule } from './auth.module';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fails login', async () => {
    const email = 'ngasal@gmail.com';
    const password = 'password@gmail.com';
    try {
      
      await service.login({email,password})
    } catch (err) {
      expect(err).toBeInstanceOf(UnauthorizedException)
    }
  })
});
