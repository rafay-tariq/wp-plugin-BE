import { Test, TestingModule } from '@nestjs/testing';
import { UserPackageController } from './user-package.controller';
import { UserPackageService } from './user-package.service';

describe('UserPackageController', () => {
  let controller: UserPackageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPackageController],
      providers: [UserPackageService],
    }).compile();

    controller = module.get<UserPackageController>(UserPackageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
