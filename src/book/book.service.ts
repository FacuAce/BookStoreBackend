import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BookService {
  constructor(private readonly prismaService: PrismaService) {}

  async validateBook(bookName: string) {
    const bookExists = await this.prismaService.book.count({
      where: {
        name: bookName,
      },
    });

    if (bookExists > 0) {
      return true;
    }
    return false;
  }

  async createBook(input: CreateBookInput) {
    const bookExists = await this.validateBook(input.name);

    if (bookExists == true) {
      return null;
    }

    const bookCreate = await this.prismaService.book.create({
      data: {
        ...input,
      },
    });
    console.log(bookCreate);
    return bookCreate;
  }

  async bookUpdate(bookId: number, input: UpdateBookInput) {
    const booksExists = await this.validateBook(input.name);

    if (booksExists == true) {
      return null;
    }

    const bookUpdate = await this.prismaService.book.update({
      where: { id: bookId },
      data: {
        ...input,
      },
    });
    console.log(bookUpdate);
    return bookUpdate;
  }

  async bookDelete(bookId: number) {
    const bookDelete = await this.prismaService.book.update({
      where: {
        id: bookId,
      },
      data: {
        dts: new Date(),
      },
    });
    return bookDelete;
  }

  async getBooks() {
    return await this.prismaService.book.findMany({
      where: {
        dts: null,
      },
      include: {
        author: true,
      },
    });
  }
}
