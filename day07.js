const fs = require('fs');
const data = fs.readFileSync('day07_input.txt', 'utf8');
const lines = data.split(/\n/);

// Part 1.

let fiveKind = [];
let fourKind = [];
let fullHouse = [];
let threeKind = [];
let twoPair = [];
let onePair = [];
let highCard = [];
const categories = [fiveKind, fourKind, fullHouse, threeKind, twoPair, onePair, highCard]

// categorize types of hands
const categorizeCards = function(lines) {
  const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
  for (line of lines) {
    let handScore = {}
    const hand = line.split(' ')[0]
    for (let i=0; i<5; i++) {
      if (!handScore[`${hand[i]}`]) handScore[`${hand[i]}`] = 0
      handScore[`${hand[i]}`]++
    }
    if(Object.values(handScore).includes(5)) fiveKind.push(line);
    if(Object.values(handScore).includes(4)) fourKind.push(line);
    if(Object.values(handScore).includes(3) && Object.values(handScore).includes(2)) fullHouse.push(line);
    if(Object.values(handScore).includes(3) && !Object.values(handScore).includes(2)) threeKind.push(line);
    if(Object.values(handScore).includes(2) && Object.values(handScore).length === 3) twoPair.push(line);
    if(Object.values(handScore).includes(2) && Object.values(handScore).length === 4) onePair.push(line);
    if(Object.values(handScore).every(el=> el === 1)) highCard.push(line);
  }
}
categorizeCards(lines)

// THEN for each category, sort by first card... second card... etc
const sortOrder = {
  'A': 0, 'K': 1, 'Q': 2, 'J': 3, 'T': 4, '9': 5, '8': 6, '7': 7, '6': 8, '5': 9, '4': 10, '3': 11, '2': 12
}

const handSort = function(arr) {
  return arr.sort((a,b) => sortOrder[`${a[4]}`] - sortOrder[`${b[4]}`])
    .sort((a,b) => sortOrder[`${a[3]}`] - sortOrder[`${b[3]}`])
    .sort((a,b) => sortOrder[`${a[2]}`] - sortOrder[`${b[2]}`])
    .sort((a,b) => sortOrder[`${a[1]}`] - sortOrder[`${b[1]}`])
    .sort((a,b) => sortOrder[`${a[0]}`] - sortOrder[`${b[0]}`])
}

const categorizedSorted = categories.flatMap(el => handSort(el)).reverse();
console.log(categorizedSorted.reduce((acc, cur, i) => acc + (+cur.split(' ')[1] * (+i + 1)), 0));

// Part 2.