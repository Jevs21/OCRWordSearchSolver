class Matrix {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.matrix = [];
        this.separator = '0';

        this.string_reps = {
            row: '',
            row_rev: '',
            col: '',
            col_rev: ''
        }
        
        this.coord = {
            row: [],
            row_rev: [],
            col: [],
            col_rev: []
        }
        
    }

    generateFromImg(lines) {
        this.matrix = [];

        for(let line of lines) {
            let r = line.split('');
            this.matrix.push(r);
        }
        this.generateStringReps();
    }

    generate(alphabet) {
        this.matrix = [];
        for(let row = 0; row < this.height; row++) {
            let r = [];
            for(let col = 0; col < this.width; col++) {
                r.push(alphabet.getRandLetter())
            }
            this.matrix.push(r)
        }
        this.generateStringReps();
    }

    generateStringReps() {
        this.string_reps.row = '';
        this.string_reps.col = '';
        this.string_reps.row_rev = '';
        this.string_reps.col_rev = '';

        this.coord.row = [];
        this.coord.col = [];
        this.coord.row_rev = [];
        this.coord.col_rev = [];

        // Row str
        for(let row = 0; row < this.height; row++) {
            for(let col = 0; col < this.width; col++) {
                this.string_reps.row += this.matrix[row][col];
                this.coord.row.push({row: row, col: col});
                if(col == this.width - 1) {
                    this.coord.row.push({row: -1, col: -1});
                    this.string_reps.row += this.separator;
                }
            }
        }

        // Col str
        for(let col = 0; col < this.width; col++) {
            for(let row = 0; row < this.height; row++) {
                this.string_reps.col += this.matrix[row][col];
                this.coord.col.push({row: row, col: col});
                if(row == this.height - 1) {
                    this.coord.col.push({row: -1, col: -1});
                    this.string_reps.col += this.separator;
                }
            }
        }

        // Row str reverse
        this.string_reps.row_rev = this.string_reps.row.split("").reverse().join("");
        this.coord.row_rev = this.coord.row.slice().reverse();

        // Col str reverse
        this.string_reps.col_rev = this.string_reps.col.split("").reverse().join("");
        this.coord.col_rev = this.coord.col.slice().reverse();
    }

    findWords(dict) {
        let words = []
        for(let key in this.string_reps){
            for(let i = 0; i < this.string_reps[key].length; i++) {
                if (this.string_reps[key][i] != this.separator) {
                    let not_valid = false;
                    let end_ind = i + 3;
                    while(end_ind < this.string_reps[key].length && (!not_valid)) {
                        let cur_word = this.string_reps[key].slice(i, end_ind);

                        let ret = dict.findWord(cur_word);

                        if(ret == 1) {
                            // Word found
                            
                            if (key == 'row') {
                                words.push({word: cur_word, loc: {start: this.coord.row[i], end: this.coord.row[end_ind]} });
                            } else if (key == 'row_rev') {
                                words.push({word: cur_word, loc: {start: this.coord.row_rev[i], end: this.coord.row_rev[end_ind]} });
                            } else if (key == 'col') {
                                words.push({word: cur_word, loc: {start: this.coord.col[i], end: this.coord.col[end_ind]} });
                            } else if (key == 'col_rev') {
                                words.push({word: cur_word, loc: {start: this.coord.col_rev[i], end: this.coord.col_rev[end_ind]} });
                            }
                            end_ind += 1
                        }
                        else if(ret == 0) {
                            end_ind += 1;
                        }
                        else {
                            not_valid = true;
                        }
                    }
                }
            }
        }
        
        return words;
    }

    toString() {
        let str = '';
        for(let row = 0; row < this.height; row++) {
            let r = '';
            for(let col = 0; col < this.width; col++) {
                r += this.matrix[row][col]
                if(col < this.width - 1) {
                    r += ' ';
                } else {
                    r += '\n';
                }
            }
            str += r;
        }  
        return str;
    }

}

module.exports = Matrix;