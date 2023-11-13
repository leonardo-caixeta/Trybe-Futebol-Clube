import * as sinon from 'sinon';
import { expect } from 'chai';
import TeamService from '../services/Team.service'
import { teamMock, teamsMock } from './mocks/Team.mock';
import TeamModel from '../models/Team.model';

const teamService = new TeamService();
const mockTeamModel = new TeamModel();

describe('Team Service', function () {
  beforeEach(function () { sinon.restore(); });
  it('findAll', async function() {
    const serviceResponse = await teamService.findAll();
    expect(serviceResponse.status).to.be.equal(200)
    expect(serviceResponse.data).to.contain(teamsMock)
  });

  it('findById', async function() {
    const params = teamMock.id
    const serviceResponse = await teamService.findById(params);

    expect(serviceResponse.status).to.be.equal(200)
    expect(serviceResponse.data).to.contain(teamMock)
  });
});