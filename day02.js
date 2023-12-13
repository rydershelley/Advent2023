const fs = require('fs');
const data = fs.readFileSync('day02_input.txt', 'utf8');
const lines = data.split(/\n/);


// Part 1
const limit = {
  red: 12,
  green: 13,
  blue: 14,
}

const validGame = function(line) {
  const gameID = line.split(':')[0].slice(5,7)
  const drawn = line.split(': ')[1].split('; ').flatMap(el=> el.split(', '));

  let valid = true;
  for (draw of drawn) {
    if (+draw.split(' ')[0] > limit[`${draw.split(' ')[1]}`]) valid = false
    }
  if (!valid) return 0
  return +gameID
}

const result = lines.reduce((acc, cur) => acc + +validGame(cur),0)
console.log(`Part 1: ${result}`);

// Part 2.

const gamePower = function(line) {
  // const gameID = line.split(':')[0].slice(5,7)
  const drawn = line.split(': ')[1].split('; ').flatMap(el=> el.split(', '));
  let minCubes = {red: 0, green: 0, blue: 0};

  for (draw of drawn) {
    if (+draw.split(' ')[0] > minCubes[`${draw.split(' ')[1]}`]) {
      minCubes[`${draw.split(' ')[1]}`] = +draw.split(' ')[0]
      }
    }
    return minCubes.red * minCubes.green * minCubes.blue;
}

const powerSum = lines.reduce((a, c) => a + +gamePower(c),0)
console.log(`Part 1: ${powerSum}`);