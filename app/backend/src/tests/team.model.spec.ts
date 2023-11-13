import { expect } from 'chai';
import * as sinon from 'sinon';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { teamsMock } from './mocks/Team.mock';
import TeamModel from '../models/Team.model';

describe('Team Model', function () {
  beforeEach(function () { sinon.restore(); });
  it('FindAll', async function () {
    const teamModel = new TeamModel();
    const findAllResponseMock = SequelizeTeam.bulkBuild(teamsMock);
    sinon.stub(SequelizeTeam, 'findAll').resolves(findAllResponseMock)

    const teamsResponse = await teamModel.findAll();

    expect(teamsResponse).to.be.deep.equal(teamsMock);
  })
})