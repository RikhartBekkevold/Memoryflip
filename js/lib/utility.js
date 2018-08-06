/**
 * Shuffles an array following the Fisher-Yates algorithm.
 * Taken from: https://bost.ocks.org/mike/shuffle/
 * @param array array to shuffle
 * @return array the shuffled array
 */
shuffleCards = function(array) {
    var m = array.length, t, i;

    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
};
