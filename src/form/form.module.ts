import { FormController } from './form.controller';
import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './form.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Form]), TypeOrmModule.forFeature([User])],
  providers: [FormService, UserService],
  controllers: [FormController],
})
export class FormModule {}
