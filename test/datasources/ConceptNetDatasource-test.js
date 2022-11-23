/*! @license MIT ©2013-2016 Ruben Verborgh, Ghent University - imec */
let ConceptNetDatasource = require('../..').datasources.ConceptNetDatasource;

let Datasource = require('@ldf/core').datasources.Datasource;
// fs = require('fs'),
// path = require('path');
// URL = require('url'),
// dataFactory = require('n3').DataFactory;

// let jsonResult = fs.readFileSync(path.join(__dirname, '../../../../test/assets/sparql-quads-response.json'));
// let countResult = '"c"\n12345678\n';

describe('ConceptNetDatasource', () => {
  describe('The ConceptNetDatasource module', () => {
    it('should be a function', () => {
      ConceptNetDatasource.should.be.a('function');
    });

    it('should be a ConceptNetDatasource constructor', () => {
      new ConceptNetDatasource({}).should.be.an.instanceof(ConceptNetDatasource);
    });

    it('should create Datasource objects', () => {
      new ConceptNetDatasource({}).should.be.an.instanceof(Datasource);
    });
  });

  describe('A ConceptNetDatasource instance', () => {
    let request = sinon.stub();
    let datasource = new ConceptNetDatasource({ endpoint: 'http://api.conceptnet.io/query', request: request });
    datasource.initialize();

    it('should indicate support for its features', () => {
      datasource.supportedFeatures.should.deep.equal({
        triplePattern: true,
        quadPattern: true,
        limit: true,
        offset: true,
        totalCount: true,
      });
    });

    it('should support the empty query', () => {
      datasource.supportsQuery({}).should.be.true;
    });

    it('should support a query with supported features', () => {
      datasource.supportsQuery({ features: { limit: true, offset: true, b: false } }).should.be.true;
    });

    it('should not support a query with unsupported features', () => {
      datasource.supportsQuery({ features: { limit: true, b: true } }).should.be.false;
    });

    it('should throw an error when trying to execute an unsupported query', (done) => {
      datasource.select({ features: { a: true, b: true } }, (error) => {
        error.should.be.an.instanceOf(Error);
        error.should.have.property('message', 'The datasource does not support the given query');
        done();
      });
    });
  });
});
