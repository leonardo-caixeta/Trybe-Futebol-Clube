import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam'
import { teamsMock } from './mocks/Team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams test', function () {
  beforeEach(function () { sinon.restore(); });
  it('should return all teams', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teamsMock as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamsMock);
  });

  it('should not return all teams', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(null as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(404);
    expect(body).to.deep.equal(null);
  });

  it('should not return one team', async function() {
    sinon.stub(SequelizeTeam, 'findOne').resolves(null as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(404);
    expect(body).to.deep.equal(null);
  });
});