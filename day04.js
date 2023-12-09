const fs = require('fs');
const data = fs.readFileSync('day04_input.txt', 'utf8');
const lines = data.split(/\n/);
const subset = lines.slice(0,5)

// console.log(lines);


// Part 1
let resultArray = [];
const cardScore = function(line){
  // Split line into winners and players
  let nums = line.split(': ')
  nums = nums[1].split(' | ')
  const winners = nums[0].replaceAll('  ',' ').split(' ')
  const candidates = nums[1].replaceAll('  ',' ').split(' ')
  // console.log(winners);
  // console.log(candidates);

  // Match winners and players
  let score = 0;
  for (winner of winners) {
    if (candidates.includes(winner) && winner !== '') {
      score++
    }
  }

  // Score = 1 or 2^(matches - 1)
  // console.log(`matches: ${score}`);
  resultArray.push(score)
  return score >0? 2**(score-1) : score
}

const totalScore = function(arr) {
  let result = 0;
  for (line of arr) {
    result += cardScore(line)
  }
  return result
}
// totalScore([
// 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
// 'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
// 'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
// 'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
// 'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36',
// 'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11']);

totalScore(lines)
// console.log(resultArray);
// console.log(resultArray.reduce((acc, cur) => cur > 0 ? acc+(2**(cur - 1)) : acc,0));

// Part 2
// cardTotals starts as one of each card
// resultArray tells how many matches there are (how many new copies get created)

let cardTotals = new Array(resultArray.length);
for (let i=0; i<cardTotals.length; ++i) cardTotals[i] = 1;

for (let i = 0; i < resultArray.length; i++) {
  for (let j=1;j<=resultArray[i]; j++) {
    //add iterative matches for every copied card
    cardTotals[i+j] += cardTotals[i]
  }
}

// Reduce function to cound cards in cardTotals
console.log(cardTotals.reduce((acc, cur) => acc + cur,0));

