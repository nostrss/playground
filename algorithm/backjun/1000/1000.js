const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split(' ');
// let input = fs.readFileSync('1000.txt').toString().split(' ');

console.log(Number(input[0]) + Number(input[1]));
