import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaClient } from '.prisma/client';

@Injectable()
export class UserService {
  prisma = new PrismaClient();

  registerUser = async (registerDto: CreateUserInput) => {
    const user = await this.prisma.user.create({
      data: {
        ...registerDto,
      },
    });
    console.log(user);
    return user;
  };
}
