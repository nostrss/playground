const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().split(' ');
let input = fs.readFileSync('10869.txt').toString().split(' ');
// let input = require('fs').readFileSync('10869.txt').toString().split('\n');

console.log(Number(input[0]) + Number(input[1]));
console.log(Number(input[0]) - Number(input[1]));
console.log(Number(input[0]) * Number(input[1]));
console.log(Math.trunc(Number(input[0]) / Number(input[1])));
console.log(Number(input[0]) % Number(input[1]));
