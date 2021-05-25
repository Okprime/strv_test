/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const index = require('../../index');
const user = require('../../app/model/user');
const userJSON = require('../mockJSONData/user.json');

const should = chai.should();

chai.use(chaiHttp);

describe('users', () => {
  beforeEach((done) => { // Before each test we empty the database
    user.remove({}, (err) => {
      done();
    });
  });
  describe('/POST register', () => {
    it('it should allow a user to sign up', (done) => {
      chai.request(index)
        .post('/register')
        .send(userJSON)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Successfully signed up.');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('password');
          done();
        });
    });
  });

  afterEach((done) => {
    describe('/POST register', () => {
      it('it return an error because the email already exist.', (done) => {
        chai.request(index)
          .post('/register')
          .send(userJSON)
          .end((err, res) => {
            res.should.have.status(409);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('This email already exists, kindly login.');
            done();
          });
      });
    });
    done();
  });
});

describe('/POST login', () => {
  it('should sign in users', (done) => {
    chai.request(index)
      .post('/login')
      .send(userJSON)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Login was successful.');
        res.body.data.should.have.property('email');
        done();
      });
  });
});
