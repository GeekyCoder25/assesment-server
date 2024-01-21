import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './form.entity';
import { Repository, UpdateResult } from 'typeorm';
import { FormDto } from './dto/form.dto';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private formRepository: Repository<Form>,
  ) {}

  create(form: FormDto): Promise<Form> {
    return this.formRepository.save(form);
  }
  findForm(email: string): Promise<Form | null> {
    return this.formRepository.findOneBy({ email });
  }
  updateForm(email: string, form: FormDto): Promise<UpdateResult> {
    return this.formRepository.update({ email }, form);
  }
}
