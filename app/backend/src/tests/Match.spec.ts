import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { matchFinishedReturnMock, matchesInProgressReturn, matchesMock, matchesReturnMock } from './mocks/Match.mock';
import MatchModel from '../models/Match.model';
import MatchService from '../services/Match.service';

chai.use(chaiHttp);

const { expect } = chai;

const matchModel = new MatchModel();
const matchService = new MatchService();

describe('Match tests', function() {
  beforeEach(function () { sinon.restore(); });
  it('should return all matches - /matches', async function() {
    sinon.stub(matchModel, 'findAll').resolves(matchesReturnMock);

    const { status, body } = await chai.request(app).get('/matches');;

    expect(status).to.equal(200);
    expect(body).to.be.deep.equal(matchesReturnMock);
  });

  it('should return matches inProgress - /matches?inProgress=true', async function() {
    sinon.stub(matchModel, 'findByQuery').resolves(matchesInProgressReturn);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.be.deep.equal(matchesInProgressReturn);
  });

  it('should return a finish message - /matches/id/finish', async function() {
    sinon.stub(matchService, 'finishUpdate').resolves(matchFinishedReturnMock as any);

    const { status, body } = await chai.request(app).patch('/matches/1/finish').send({
      'authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlkIjoxLCJpYXQiOjE3MDAxNjEyNzYsImV4cCI6MTcwMTAyNTI3Nn0.tePxMTzVpXYHvtY44Qaw2MAw-qpHANpUjgepBlxPcHY'
    });

    expect(status).to.equal(200);
    expect(body).to.be.deep.equal(matchFinishedReturnMock.message);
  });
});