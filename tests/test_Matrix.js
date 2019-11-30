// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const fs      = require('fs');

const wordArray = fs.readFileSync('../word_list/word_list_reduced.txt', 'utf8').split('\n');

const Matrix = require('../model/Matrix');
const Alphabet = require('../model/Alphabet');
const Dictionary = require('../model/Dictionary');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Matrix', () => {
  describe("new Matrix", () => {
    it("should return a new Matrix object", (done) => {
        const matrix = new Matrix(20, 20);

        matrix.width.should.equal(20, "should set the width internally");
        matrix.height.should.equal(20, "should set the height internally");
        matrix.separator.should.equal('0', "should set the separator internally");
        done();
    });
  });

  describe("generateStringReps", () => {
    it("should generate the correct string representations of the matrix", (done) => {
        let matrix = new Matrix(4, 4);
        matrix.matrix = [
            ['A', 'B', 'C', 'D'],
            ['A', 'B', 'C', 'D'],
            ['A', 'B', 'C', 'D'],
            ['A', 'B', 'C', 'D']
        ];

        matrix.generateStringReps();

        matrix.string_reps.row.should.equal('ABCD0ABCD0ABCD0ABCD0', "should generate row representation correctly");
        matrix.string_reps.row_rev.should.equal('0DCBA0DCBA0DCBA0DCBA', "should generate reverse row representation correctly");
        matrix.string_reps.col.should.equal('AAAA0BBBB0CCCC0DDDD0', "should generate col representation correctly");
        matrix.string_reps.col_rev.should.equal('0DDDD0CCCC0BBBB0AAAA', "should generate reverse col representation correctly");

        done();
    });
  });

  describe("find results of 4x4 matrix", () => {
    it("should generate results", (done) => {
        let matrix = new Matrix(4, 4);
        let alph = new Alphabet();
        let dict = new Dictionary(wordArray);

        matrix.generate(alph);
        let res = matrix.findWords(dict);
        done();
    });
  });
});