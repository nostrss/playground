const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().split(' ');
// let input = fs.readFileSync('1001.txt').toString().split(' ');
let input = require('fs').readFileSync('1001.txt').toString().split('\n');
console.log(input);

console.log(Number(input[0]) - Number(input[1]));
