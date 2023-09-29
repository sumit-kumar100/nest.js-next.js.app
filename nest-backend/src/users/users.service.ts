import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findall(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async create(user: User): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async update(id: string, user: User): Promise<User> {
    await this.usersRepository.update(id, user);
    return await this.usersRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
