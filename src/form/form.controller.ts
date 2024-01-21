import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FormDto } from './dto/form.dto';
import { FormService } from './form.service';
import { UserService } from 'src/user/user.service';
import { UpdateResult } from 'typeorm';

@Controller('form')
export class FormController {
  constructor(
    private formService: FormService,
    private userService: UserService,
  ) {}

  @Get(':email')
  async getUser(@Param('email') email): Promise<FormDto> {
    const checkUser = await this.userService.findUser(email);
    if (!checkUser) {
      throw new HttpException('Not authorised', HttpStatus.UNAUTHORIZED);
    }
    const result = await this.formService.findForm(email);
    return result;
  }

  @Post()
  async createForm(@Body() form: FormDto): Promise<FormDto> {
    const checkUser = await this.userService.findUser(form.email);
    if (!checkUser) {
      throw new HttpException('Not authorised', HttpStatus.UNAUTHORIZED);
    }
    const userExist = await this.formService.findForm(form.email);
    if (userExist) {
      throw new ForbiddenException('Form by this user already exist');
    }
    return await this.formService.create(form);
  }

  @Put(':email')
  async update(
    @Param('email') email: string,
    @Body() form,
  ): Promise<UpdateResult> {
    const checkUser = await this.userService.findUser(email);
    if (!checkUser) {
      throw new HttpException('Not authorised', HttpStatus.UNAUTHORIZED);
    }
    return this.formService.updateForm(email, form);
  }
}
