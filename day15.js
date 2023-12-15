const fs = require('fs');
const data = fs.readFileSync('day15_input.txt', 'utf8').split(',');


// Part 1.
const hash = (input) => input.split('').map(el=> el.charCodeAt()).reduce((a,c) => (a + c) * 17 % 256, 0);
const result = data.reduce((a,c) => a + hash(c),0)
console.log(`Part 1: ${result}`);

// Part 2.

// Create array of arrays with strings to match, = or - operators, values to insert
const hashMap = function(arr) {
  const result = arr.map(el => {
    if (el.includes('-')) return [el.split('-')[0], '-', el.split('-')[0]]
    else return [el.split('=')[0], '=', el.split('=').join(' ')]
  })
  return result
}
const fullHashMap = hashMap(data);

// Loop through entries and fill 256 boxes based on rules
const fixBoxes = function(entries) {
  let fillBoxes = new Array(256).fill([]);
  for (entry of entries) {
    const index = hash(entry[0])
    const method = entry[1];
    const value = entry[2]
    
    if (method === '-') {
      if (fillBoxes[index].some(el => el.startsWith(entry[0]))) {
        const replaceIndex = fillBoxes[index].findIndex(el=>el.startsWith(entry[0]))
        fillBoxes[index].splice(replaceIndex,1)
        }
      }
    
    else if (method === '=') {
      if (fillBoxes[index].some(el => el.startsWith(entry[0]))) {
        fillBoxes[index][fillBoxes[index].findIndex(el=>el.startsWith(entry[0]))] = value
        }
      else fillBoxes[index].length === 0 ? fillBoxes[index] = [value] : fillBoxes[index].push(value)
    }
  }
  return fillBoxes
}
const fixedBoxes = fixBoxes(fullHashMap)

// Calculate power based on box number, index, and focal power
const calcPower = function(boxes) {
  let power = 0;
  // Loop over all boxes
  for (let i=0; i < boxes.length; i++){
    // Loop inside each box
    for (let j=0; j < boxes[i].length; j++) {
      if (boxes[i].length === 0) continue
      const focal = boxes[i][j].split(' ')[1];
      power += (i+1) * (j+1) * +focal
    }
  }
  return power
}
console.log(`Part 2: ${calcPower(fixedBoxes)}`);
