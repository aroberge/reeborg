function randint(max) {
    // returns integer between 0 and max-1
    return Math.max(0, Math.floor(Math.random() * max));
}
exports.randint = randint;

// Fisher–Yates in-place shuffle as modified by Durstenfeld
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
exports.shuffle = function (arr) {
    var i, j, temp, n=arr.length;
    for (i=n-1; i >= 1; i--) {
        j = randint(i+1);
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}