const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().split(' ');
// let input = fs.readFileSync('/dev/stdin').toString();
let input = fs.readFileSync('18108.txt').toString().trim();
// let input = require('fs').readFileSync('10869.txt').toString().split('\n');
console.log(Number(input) - 543);
