/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const index = require('../../index');
const contactJSON = require('../mockJSONData/contact.json');

const should = chai.should();

chai.use(chaiHttp);

// Our parent block
describe('contact', () => {
  describe('/POST contact', () => {
    it('it should return an error becasue a token has to be passed', (done) => {
      chai.request(index)
        .post('/contact')
        .send(contactJSON)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('No token provided.');
          done();
        });
    });
  });
});
