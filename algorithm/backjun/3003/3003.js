const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().split(' ');
// let input = fs.readFileSync('/dev/stdin').toString();
// let input = fs.readFileSync('2309.txt').toString().trim();
const input = require('fs')
  .readFileSync('3003.txt')
  .toString()
  .trim()
  .split(' ')
  .map((item) => Number(item));

const chess = [1, 1, 2, 2, 2, 8];
console.log(input.map((item, index) => chess[index] - item).join(' '));
