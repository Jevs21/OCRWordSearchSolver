class Alphabet {
    constructor() {
        this.letters = [
            'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a',
            'b', 'b',
            'c', 'c',
            'd', 'd', 'd', 'd',
            'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',
            'f', 'f',
            'g', 'g',
            'h', 'h', 'h', 'h', 'h', 'h',
            'i', 'i', 'i', 'i', 'i', 'i', 'i',
            'j',
            'k',
            'l', 'l', 'l', 'l',
            'm', 'm', 'm',
            'n', 'n', 'n', 'n', 'n', 'n', 'n',
            'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 
            'p', 'p', 
            'q',
            'r', 'r', 'r', 'r', 'r', 'r', 
            's', 's', 's', 's', 's', 's', 
            't', 't', 't', 't', 't', 't', 't', 't', 't', 
            'u', 'u', 'u',
            'v',
            'w', 'w', 'w',
            'x', 
            'y', 'y',
            'z'
        ]
    }

    getRandLetter() {
        return this.letters[Math.floor(Math.random() * this.letters.length)]
    }
}

module.exports = Alphabet;