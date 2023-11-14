import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam'
import { teamMock, teamsMock } from './mocks/Team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams test', function () {
  beforeEach(function () { sinon.restore(); });
  it('should return all teams', async function() {
    const teamModelMock = SequelizeTeam.bulkBuild(teamsMock)
    sinon.stub(SequelizeTeam, 'findAll').resolves(teamModelMock);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamsMock);
  });

  it('should return one team', async function() {
    const teamModelMock = SequelizeTeam.build(teamMock)
    sinon.stub(SequelizeTeam, 'findOne').resolves(teamModelMock);

    const { status, body } = await chai.request(app).get('/teams/2');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamMock);
  });

  it('should not return one team', async function() {
    sinon.stub(SequelizeTeam, 'findOne').resolves(null as any);

    const { status, body } = await chai.request(app).get('/teams/2');

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Wrong or inexistent id: 2' });
  });
});