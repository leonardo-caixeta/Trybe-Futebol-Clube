import * as sinon from 'sinon';
import * as chai from 'chai';
import { App } from '../app';

//@ts-ignore
import chaiHttp = require('chai-http');

import JWT from '../utils/JWT'
import validations from '../services/validations/User.validation'
chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

import SequelizeUser from '../database/models/SequelizeUser'
import {
  errorIncorrectMessageMock,
  errorInvalidMessageMock,
  errorInvalidTokenMock,
  errorNoTokenMock,
  tokenMock,
  userMock,
} from './mocks/User.mock';

describe('Login test', function() {
  beforeEach(function () { sinon.restore(); });
  describe('Login with username and password - /login', function() {
    it('should login', async function() {
      const { id, ...resto } = userMock;
      const userModelMock = SequelizeUser.build({ ...resto, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' });
      sinon.stub(SequelizeUser, 'findOne').resolves(userModelMock);
      sinon.stub(JWT, 'sign').returns(tokenMock);

      const { email, password } = userMock;

      const { status, body } = await chai.request(app).post('/login')
        .send({ email, password: 'secret_admin' });

      expect(status).to.be.equal(200);
      expect(body).to.be.contain.keys('token');
    });

    it('should not login - without password', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);

      const { email } = userMock;

      const { status, body } = await chai.request(app).post('/login')
        .send({ email });

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal(errorIncorrectMessageMock);
    });

    it('should not login - without email', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);

      const { password } = userMock;

      const { status, body } = await chai.request(app).post('/login')
        .send({ password });

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal(errorIncorrectMessageMock);
    });

    it('should not login - wrong email', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);

      const { email, password } = userMock;

      const { status, body } = await chai.request(app).post('/login')
        .send({ email, password });

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal(errorInvalidMessageMock);
    });

    it('should not login - wrong password', async function() {
      const userModelMock = SequelizeUser.build(userMock as any);
      sinon.stub(SequelizeUser, 'findOne').resolves(userModelMock);

      const { email, password } = userMock;

      const { status, body } = await chai.request(app).post('/login')
        .send({ email, password });

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal(errorInvalidMessageMock);
    });
  });

  describe('should return the role - /login/role', function() {
    it('should return', async function () {

      const { status, body } = await chai.request(app).get('/login/role')
        .set('authorization', tokenMock);

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({ role: 'admin' });
    });

    it('should return error - without token', async function () {
      const { status, body } = await chai.request(app).get('/login/role')

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal(errorNoTokenMock);
    });

    it('should return error - without token', async function () {
      const { status, body } = await chai.request(app).get('/login/role')
      .set('authorization', '');

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal(errorInvalidTokenMock);
    });
  });
});