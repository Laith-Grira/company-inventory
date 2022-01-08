// Setting environment variables for testing
process.env.NODE_ENV = 'test';
process.env.PORT = 5001;

const expect = require('chai').expect;
const request = require ('supertest');
const server = require('../server');
const connection = require('../database/db');


describe('Starting tests for /items endpoint', () => {

    before((done) => {
        connection.open()
          .then(done())
          .catch((err) => done(err));
      })
    
    after((done) => {
        connection.close()
          .then(done())
          .catch((err) => done(err));
    })

    /******************************************************
     ***************** GET requests ***********************
     ******************************************************
     */
    describe('Test GET for /items endpoint', () => {
    
        it('Getting an empty array for empty items', (done) => {
            request(server)
                .get('/items')
                .then((res) => {
                    const body = res.body.length;
                    expect(body).to.equal(0);
                    done();
                })
                .catch((err) => done(err));
        });
    
        it('Get a created item', (done) => {
            request(server)
                .post('/items')
                .send({ name: 'juice', price: 12.59, count: 10 })
                .then((res) => {
                    request(server)
                        .get('/items')
                        .then((res) => {
                            const body = res.body.length;
                            const member = res.body.items[0];
                            expect(body).to.equal(1);
                            expect(member).to.contain.property('name');
                            done();
                        })
                })
                .catch((err) => done(err));
        });

        it('Get an item by ID', (done) => {
            request(server)
                .post('/items')
                .send({ name: 'cheese', price: 2.99, count: 50 })
                .then((res) => {
                    const id = res.body.createdItem._id;
                    request(server)
                        .get('/items/'+id)
                        .then((res) => {
                            const name = res.body.name;
                            expect(name).to.equal('cheese');
                            done();
                        })
                })
                .catch((err) => done(err));
        });

        it('Handeling invalid item ID', (done) => {
            request(server)
                .get('/items/'+'2ada6beds6dr')
                .then((res) => {
                    const msg = res.body.message;
                    expect(msg).to.equal('This id is not found in the database');
                    done();
                })
                .catch((err) => done(err));
        });
    });

    
});