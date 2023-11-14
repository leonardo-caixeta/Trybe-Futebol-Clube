import { Request, Response } from 'express';
import MatchService from '../services/Match.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (typeof inProgress === 'string') {
      const { status, data } = await this.matchService.findByQuery(inProgress);
      return res.status(mapStatusHTTP(status)).json(data);
    }

    const { status, data } = await this.matchService.findAll();

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async finishUpdate(req: Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.matchService.finishUpdate(+id);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async matchFinish(req: Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.matchService.matchesUpdate(+id, req.body);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
