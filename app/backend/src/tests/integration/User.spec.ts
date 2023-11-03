import * as sinon from 'sinon';
import * as chai from 'chai';
import { App } from '../../../../backend/src/app';
import chaiHttp from 'chai-http';

import JWT from '../../utils/JWT'
import Validations from '../../middlewares/Validation'
chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

import SequelizeUser from '../../database/models/SequelizeUser'
import {
  errorIncorrectMessageMock,
  errorInvalidMessageMock,
  tokenMock,
  userMock,
  wrongPasswordMock,
  wrongUserMock
} from '../mocks/User.mock';


describe('Login test', function() {
  describe('Login with username and password - /login', function() {
    it('should login', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(userMock as any);
      sinon.stub(JWT, 'sign').returns(tokenMock);
      sinon.stub(Validations, 'login').returns();

      const { password, email } = userMock;

      const { status, body } = await chai.request(app).post('/login')
        .set('authorization', 'validToken')
        .send({ password, email });

      expect(status).to.be.equal(201);
      expect(body).to.be.deep.equal(tokenMock);
    });

    it('should not login - without password', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);

      const { email } = userMock;

      const { status, body } = await chai.request(app).post('/login')
        .set('authorization', 'validToken')
        .send({ email });

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal(errorIncorrectMessageMock);
    });

    it('should not login - without username', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);

      const { password } = userMock;

      const { status, body } = await chai.request(app).post('/login')
        .set('authorization', 'validToken')
        .send({ password });

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal(errorIncorrectMessageMock);
    });

    it('should not login - wrong username', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);

      const { username, password } = wrongUserMock;

      const { status, body } = await chai.request(app).post('/login')
        .set('authorization', 'validToken')
        .send({ username, password });

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal(errorInvalidMessageMock);
    });

    it('should not login - wrong password', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);

      const { username, password } = wrongPasswordMock;

      const { status, body } = await chai.request(app).post('/login')
        .set('authorization', 'validToken')
        .send({ username, password });

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal(errorInvalidMessageMock);
    });
  });

  describe('should login with token - /login/role', function() {
    it.skip('should login')
  });
});