const expect = require('chai').expect;
const request = require ('supertest');
const load = require('./utils/loadMockApp');
const connection = require('../database/db');

describe('Starting tests for /items endpoint', () => {

    before((done) => {
        connection.openMockDB()
          .then(done())
          .catch((err) => done(err));
      })
    
    after((done) => {
        connection.close()
          .then(done())
          .catch((err) => done(err));
    })

    /**
     * @description GET requests
     */
    describe('Test GET for /items endpoint', () => {
    
        it('Getting an empty array for empty items', (done) => {
            request(load())
                .get('/items')
                .then((res) => {
                    const body = res.body.length;
                    expect(body).to.equal(0);
                    done();
                })
                .catch((err) => done(err));
        });
    
        it('Get a created item', (done) => {
            request(load())
                .post('/items')
                .send({ name: 'HDMI cable', price: 25, count: 10 })
                .then((res) => {
                    request(load())
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
            request(load())
                .post('/items')
                .send({ name: 'Keyboard', price: 49.99, count: 50 })
                .then((res) => {
                    const id = res.body.createdItem._id;
                    request(load())
                        .get('/items/'+id)
                        .then((res) => {
                            const name = res.body.name;
                            expect(name).to.equal('Keyboard');
                            done();
                        })
                })
                .catch((err) => done(err));
        });

        it('Handeling invalid item ID', (done) => {
            request(load())
                .get('/items/'+'2ada6beds6dr')
                .then((res) => {
                    const msg = res.body.message;
                    expect(msg).to.equal('This id is not found in the database');
                    done();
                })
                .catch((err) => done(err));
        });
    });

    /**
     * @description POST requests
     */
     describe('Test POST for /items endpoint', () => {

        it('Creating an item successfully', (done) => {
            request(load())
                .post('/items')
                .send({ name: 'Mouse', price: 20.99, count: 27 })
                .then((res) => {
                    const body = res.body.createdItem;
                    expect(body).to.contain.property('_id');
                    expect(body).to.contain.property('name');
                    expect(body).to.contain.property('price');
                    expect(body).to.contain.property('count');
                    expect(body.name).to.equal('Mouse');
                    expect(body.price).to.equal(20.99);
                    expect(body.count).to.equal(27);
                    done();
                })
                .catch((err) => done(err));
        });
    });

    /**
     * @description PATCH requests
     */
     describe('Test PATCH for /items endpoint', () => {

        it('Changing name of an item', (done) => {
            request(load())
                .post('/items')
                .send({ name: 'LAN cable', price: 7.20, count: 22 })
                .then((res) => {
                    const id = res.body.createdItem._id;
                    request(load())
                        .get('/items')
                        .then((res) => {
                            request(load())
                                .patch('/items/'+id)
                                .send([ { "propName": "name", "value": "WLAN cable" } ])
                                .then((res) => {
                                    request(load())
                                        .get('/items/'+id)
                                        .then((res) => {
                                            const newName = res.body.name;
                                            expect(newName).to.equal("WLAN cable")
                                            done();
                                        })
                                })
                        })
                })
                .catch((err) => done(err));
        });
    });

    /**
     * @description DELETE requests
     */
     describe('Test DELETE for /items endpoint', () => {

        it('Delete an item by ID', (done) => {
            request(load())
                .post('/items')
                .send({ name: 'Printer', price: 304.55, count: 37 })
                .then((res) => {
                    const id = res.body.createdItem._id;
                    request(load())
                        .delete('/items/'+id)
                        .then((res) => {
                            const msg = res.body.message;
                            expect(msg).to.equal('Item '+id+' is successfully deleted');
                            request(load())
                                .get('/items/'+id)
                                .then((res) => {
                                    const msg_2 = res.body.message;
                                    expect(msg_2).to.equal('This id is not found in the database');
                                    done();
                                })
                        })
                })
                .catch((err) => done(err));
        });
    });
    
});