// Package imports
const express = require("express");
const app     = express();
const fs      = require('fs');
const path    = require("path");

// Import models
const Alphabet = require('./model/Alphabet');
const Dictionary = require('./model/Dictionary');
const Matrix = require('./model/Matrix');

// Import the word list
const wordArray = fs.readFileSync('./word_list/word_list.txt', 'utf8').split('\n');

const alph = new Alphabet();
const dict = new Dictionary(wordArray);



/**
 * SERVE FILES FOR FRONT END
 */
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/static/index.html'));
});
app.get('/style.css',function(req,res){
    res.sendFile(path.join(__dirname+'/static/style.css'));
});
app.get('/index.js',function(req,res){
    res.sendFile(path.join(__dirname+'/static/index.js'));
});

/**
 * GENERATE A MATRIX
 */
app.get('/generateMatrix', (req, res) => {
    let puzzle = new Matrix(20, 20);
    puzzle.generate(alph);

    console.log("MATRIX:");
    console.log(puzzle.toString());

    // console.log("ROW STR:")
    // console.log(puzzle.string_reps.row);
    // console.log(puzzle.string_reps.row_rev);
    // console.log("COL STR:")
    // console.log(puzzle.string_reps.col);
    // console.log(puzzle.string_reps.col_rev);

    search_res = puzzle.findWords(dict);

    res.status(200).send({'matrix': puzzle.matrix, 'results': search_res});
});
app.listen(8000);



