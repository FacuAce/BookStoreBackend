/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { HashService } from '@/hash/hash.service';
import { UserService } from '@/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
  ) {}

  async validateUser(dni: string, password: string) {
    const user = await this.userService.findOne({
      dni: dni,
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.hashService.compareHash(
      password,
      user.password,
    );

    if (isPasswordValid) {
      return user;
    }

    return null;
  }
}
