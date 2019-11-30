class Dictionary {
    constructor(words){
        this.words = words;
    }

    findWord(w) {
        let l = 0;
        let r = this.words.length;

        let partial = false;

        while (l <= r){
            let mid = Math.floor(l + (r - l) / 2);
            
            if (this.words[mid] == w) {
                return 1;
            }
            else if (this.words[mid].indexOf( w ) > -1) {
                partial = true
                if(this.words[mid] < w) {
                    l = mid + 1
                }
                else {
                    r = mid -1
                }
            }
            else if(this.words[mid] < w) {
                l = mid + 1
            }
            else {
                r = mid -1
            }
        }
        return (partial) ? 0 : -1
    }
}

module.exports = Dictionary;