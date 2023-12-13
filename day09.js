const fs = require('fs');
const data = fs.readFileSync('day09_input.txt', 'utf8');
const lines = data.split(/\n/);

const histories = lines.map(line => line.split(' '));

// Function to get differences between elements
const getDiffs = function(arr) {
  let diffs = [];
  for (let i=1; i< arr.length; i++) {
    diffs.push(arr[i] - arr[i-1]);
  }
  return diffs
}

// Part 1
let result1 = 0
for (line of histories) {
  let history = line
  let lastEls = [+history.slice(-1)]
  while (!getDiffs(history).every(el => el==0)) {
    history = getDiffs(history)
    lastEls.unshift(history.slice(-1))
  }
  result1 += lastEls.reduce((a,c) => +c + +a,0);
}
console.log(`Part 1: ${result1}`);

// Part 2
let result2 = 0
for (line of histories) {
  let history = line
  // let history = [10,  13,  16,  21,  30,  45]
  let firstEls = [+history[0]]
  while (!getDiffs(history).every(el => el==0)) {
    history = getDiffs(history)
    firstEls.unshift(history[0])
  }
  result2 += firstEls.reduce((a,c) => +c - +a, 0);

}
console.log(`Part 2: ${result2}`);