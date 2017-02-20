var OFFICES = [
     'HMO', 'CUU', 'CDMX'
];

function randomUsername() {
    function rando(arr) {
        return arr[Math.floor(Math.random()*arr.length)];
    }
    return rando(OFFICES);
}

module.exports = randomUsername;