const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().split(' ');
// let input = fs.readFileSync('/dev/stdin').toString();
// let input = fs.readFileSync('2309.txt').toString().trim();
const input = require('fs')
  .readFileSync('2309.txt')
  .toString()
  .trim()
  .split('\n')
  .map((item) => Number(item));

const over100 = input.reduce((acc, cur) => acc + cur) - 100;
const rst = [];

for (let i = 0; i < 9; i++) {
  for (let j = 1 + i; j < 9; j++) {
    if (input[i] + input[j] === over100) {
      return input
        .filter((item) => item !== input[i] && item !== input[j])
        .sort(function (a, b) {
          return a - b;
        })
        .map((item) => console.log(String(item)));
    }
  }
}
