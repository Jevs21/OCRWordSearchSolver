const performance = require('performance');
const fs      = require('fs');
const path    = require("path");

// Import models
const Alphabet = require('./model/Alphabet');
const Dictionary = require('./model/Dictionary');
const Matrix = require('./model/Matrix');

// Import the word list
const wordArray = fs.readFileSync('./word_list/word_list_reduced.txt', 'utf8').split('\n');

//console.log(performance);

const alph = new Alphabet();
const dict = new Dictionary(wordArray);

let m = new Matrix(5, 5);
m.generate(alph);

console.time('5x5 Puzzle');
let res = m.findWords(dict);
console.timeEnd('5x5 Puzzle');
console.log(`Found ${res.length} results.`);

m = new Matrix(20, 20);
m.generate(alph);

console.time('20x20 Puzzle');
res = m.findWords(dict);
console.timeEnd('20x20 Puzzle');
console.log(`Found ${res.length} results.`);

m = new Matrix(100, 100);
m.generate(alph);

console.time('100x100 Puzzle');
res = m.findWords(dict);
console.timeEnd('100x100 Puzzle');
console.log(`Found ${res.length} results.`);

m = new Matrix(1000, 1000);
m.generate(alph);

console.time('1000x1000 Puzzle');
res = m.findWords(dict);
console.timeEnd('1000x1000 Puzzle');
console.log(`Found ${res.length} results.`);

