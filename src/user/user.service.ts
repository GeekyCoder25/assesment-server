import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(user: UserDto): Promise<User> {
    return this.userRepository.save(user);
  }
  findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  findUser(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  updatePhoto(email: string, user: { photo: string }): Promise<UpdateResult> {
    return this.userRepository.update({ email }, user);
  }
}
