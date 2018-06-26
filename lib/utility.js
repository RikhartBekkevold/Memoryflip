// Fisher-Yates shuffle:
//https://bost.ocks.org/mike/shuffle/
shuffleCards = function(array) {
    var m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
};

//https://gist.github.com/think49/800308/d427fc5fbdeedfaa1df393cb82b2b61cd3d506d2
// Array.prototype.shuffle = function () {
//   var k, t, len;
//
//   len = this.length;
//
//   if (len < 2) {
//     return this;
//   }
//
//   while (len) {
//     k = Math.floor(Math.random() * len--);
//     t = this[k];
//
//     while (k < len) {
//       this[k] = this[++k];
//     }
//
//     this[k] = t;
//   }
//
//   return this;
// };
