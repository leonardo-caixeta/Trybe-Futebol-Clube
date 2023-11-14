import * as sinon from 'sinon';
import { expect } from 'chai';
import TeamService from '../services/Team.service'
import { teamMock, teamsMock } from './mocks/Team.mock';
import TeamModel from '../models/Team.model';

const mockTeamModel = new TeamModel();

describe('Team Service', function () {
  beforeEach(function () { sinon.restore(); });
  it('findAll', async function() {
    sinon.stub(mockTeamModel, 'findAll').resolves(teamsMock as any);
    const teamService = new TeamService(mockTeamModel);
    const serviceResponse = await teamService.findAll();

    expect(serviceResponse.status).to.be.equal('SUCCESSFUL')
    expect(serviceResponse.data).to.be.equal(teamsMock)
  });

  it('findById', async function() {
    sinon.stub(mockTeamModel, 'findById').resolves(teamMock as any)
    const params = teamMock.id
    const teamService = new TeamService(mockTeamModel);
    const serviceResponse = await teamService.findById(params);

    expect(serviceResponse.status).to.be.equal('SUCCESSFUL')
    expect(serviceResponse.data).to.contain(teamMock)
  });
});