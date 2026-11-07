import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Khalaf', age: 25 },
    { id: 2, name: 'Murad', age: 28 },
    { id: 3, name: 'Aynur', age: 37 },
    { id: 4, name: 'Elnur', age: 28 },
  ];

  findAll(age?: number) {
    if (age) {
      return this.users.filter((i) => i.age < age);
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException("User not found")
    return user;
  }

  create(body: CreateUserDto) {
    const newId = this.users.length;
    const newUser = { id: newId, ...body };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, body: UpdateUserDto) {
    this.users = this.users.map((u) => {
      if (id === u.id) {
        return { ...u, ...body };
      }
      return u;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedElement = this.findOne(id);
    if (!removedElement) {
      throw new NotFoundException("User not found")
    }
    const index = this.users.findIndex((u) => u.id === id);
    this.users.splice(index, 1);
    return removedElement;
  }
}
