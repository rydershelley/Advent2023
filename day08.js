const { group } = require('console');
const fs = require('fs');
const data = fs.readFileSync('day08_input.txt', 'utf8');
const lines = data.split(/\n/);

const directions = lines[0].split('')
// const directions = ['L', 'R']

const network = lines.splice(2)
// console.log(directions);
// console.log(network);

let entry;
const turn = function(dir) {
  dir === 'L' ? newLocation = entry.slice(7,10) : newLocation = entry.slice(12,15)
}

const curLocationIndex = function(location){
  return network.findIndex(el=> el.startsWith(location))
}
// Part 1

const walkPath = function(start, finish) {
  entry = network[curLocationIndex(start)];
  let count = 0;
  while (start !== finish) {
    for (direction of directions) {
      // console.log(direction, entry);
      turn(direction);
      count++;
      entry = network[curLocationIndex(newLocation)];
      start = newLocation
    }
  }
  return count
}
console.log(`Part 1: ${walkPath('AAA', 'ZZZ')}`);


// Part 2

// find starting nodes that end with 'A'
const starts = network.filter(el => el[2] == 'A').map(el => el.slice(0,3));

const walkPathZ = function(start) {
  entry = network[curLocationIndex(start)];
  let count = 0;
  while (start[2] !== 'Z') {
    for (direction of directions) {
      // console.log(direction, entry);
      turn(direction);
      count++;
      entry = network[curLocationIndex(newLocation)];
      start = newLocation
    }
  }
  return count
}

// Find the shortest path from each starting point
const paths = starts.map(el => walkPathZ(el));

// LCM of all paths
const gcd = (a,b) => a ? gcd(b%a, a) : b;
const lcm = (a,b) => a * b / gcd(a,b)
const result = paths.reduce(lcm);
console.log(`Part 2: ${result}`);
