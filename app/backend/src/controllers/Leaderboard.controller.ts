import { Request, Response } from 'express';
import MatchService from '../services/Match.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  async listHomeTeamSummary(req: Request, res: Response) {
    const { status, data } = await this.matchService.listHomeTeamSummary();

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
