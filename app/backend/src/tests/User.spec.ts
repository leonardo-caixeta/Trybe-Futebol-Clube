import * as sinon from 'sinon';
import * as chai from 'chai';
import { App } from '../app';
//@ts-ignore
import * as chaiHttp from 'chai-http';

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
  wrongPasswordMock,
  wrongUserMock
} from './mocks/User.mock';


describe('Login test', function() {
  beforeEach(function () { sinon.restore(); });
  describe('Login with username and password - /login', function() {
    it('should login', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(userMock as any);
      sinon.stub(JWT, 'sign').returns(tokenMock);
      sinon.stub(validations, 'validateLogin').returns(null);

      const { password, email } = userMock;

      const { status, body } = await chai.request(app).post('/login')
        .send({ password, email });

      expect(status).to.be.equal(201);
      expect(body).to.be.deep.equal(tokenMock);
    });

    it('should not login - without password', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);

      const { email } = userMock;

      const { status, body } = await chai.request(app).post('/login')
        .send({ email });

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal(errorIncorrectMessageMock);
    });

    it('should not login - without username', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);

      const { password } = userMock;

      const { status, body } = await chai.request(app).post('/login')
        .send({ password });

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal(errorIncorrectMessageMock);
    });

    it('should not login - wrong username', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);

      const { username, password } = wrongUserMock;

      const { status, body } = await chai.request(app).post('/login')
        .send({ username, password });

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal(errorInvalidMessageMock);
    });

    it('should not login - wrong password', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);

      const { username, password } = wrongPasswordMock;

      const { status, body } = await chai.request(app).post('/login')
        .send({ username, password });

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