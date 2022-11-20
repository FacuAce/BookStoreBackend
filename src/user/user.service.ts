import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { HashService } from '@/hash/hash.service';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashService: HashService,
  ) {}

  findById(id: number) {
    return this.prismaService.user.findFirst({
      where: {
        AND: [
          {
            dts: null,
          },
          {
            id: id,
          },
        ],
      },
    });
  }

  findOne = (whereInput: Prisma.UserWhereInput) => {
    return this.prismaService.user.findFirst({
      where: whereInput,
    });
  };

  findMany = (findManyArgs: Prisma.UserFindManyArgs = {}) => {
    return this.prismaService.user.findMany(findManyArgs);
  };

  validateRegister = async (dni: string, email: string) => {
    const queryResult = await this.findOne({
      AND: [
        {
          dni: dni,
        },
        {
          email: email,
        },
      ],
    });

    const alreadyExistingUser = queryResult?.id;

    if (alreadyExistingUser) {
      return false;
    }
    return true;
  };

  registerUser = async (registerDto: CreateUserInput) => {
    const isValidate = await this.validateRegister(
      registerDto.dni,
      registerDto.email,
    );
    if (!isValidate) {
      return null;
    }
    registerDto.password = await this.hashService.hash(registerDto.password);
    const user = await this.prismaService.user.create({
      data: {
        ...registerDto,
      },
    });
    console.log(user);
    return user;
  };

  updateUser = async (id: number, input: UpdateUserInput) => {
    const isValidate = await this.findOne({
      AND: [
        {
          dni: input.dni,
        },
        {
          email: input.email,
        },
      ],
    });
    if (!isValidate && isValidate.id != id) {
      return null;
    }
    if (input.password) {
      input.password = await this.hashService.hash(input.password);
    }

    await this.prismaService.user.update({
      data: {
        ...input,
        uts: new Date(),
      },
      where: {
        id: id,
      },
      select: {
        id: true,
      },
    });

    return this.findById(id);
  };
}
