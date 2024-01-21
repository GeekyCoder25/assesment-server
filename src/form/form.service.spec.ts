import { Test, TestingModule } from '@nestjs/testing';
import { FormService } from './form.service';
import { UserService } from 'src/user/user.service';

describe('FormService', () => {
  let service: FormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormService, UserService],
    }).compile();

    service = module.get<FormService>(FormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
