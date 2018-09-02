import app from '../src/App';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe('BaseRoute', () => {

    it('should return status code 200 and JSON format', () => {
        return chai.request(app).get('/')
            .then(res => {
                chai.expect(res.status).to.eql(200);
                chai.expect(res.type).to.eql('application/json');
            });
    });

    it('should have a message property', () => {
        return chai.request(app).get('/')
            .then(res => {
                chai.expect(res.body.message).to.eql('Welcome to our API!');
            })
    });
});


describe('POST Register', () => {

    it('should return status code 200', () => {
        return chai.request(app).post('/api/register')
        .send({ firstname: "Test", lastname: "Test", email: "test@test.fr", login: '143', password: '123' })
            .then(res => {
                chai.expect(res.status).to.eql(200);
            })
    })
});

describe('POST Login', () => {
    it('should return status code 200', () => {
        return chai.request(app).post('/api/login')
        .send({ login: '123', password: '123' })
            .then(res => {
                chai.expect(res.status).to.eql(200);
                chai.expect(res.body.success).to.eql(true);
                chai.expect(res.body.data).exist
            })
    })
});
