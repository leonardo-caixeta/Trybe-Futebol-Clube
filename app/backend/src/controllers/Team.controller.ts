import { Request, Response } from 'express';
import BookService from '../services/Team.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class BookController {
  constructor(
    private bookService = new BookService(),
  ) { }

  async findAll(req: Request, res: Response) {
    const { status, data } = await this.bookService.findAll();

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async findById(req: Request, res: Response) {
    const { status, data } = await this.bookService.findById(+req.params.id);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
