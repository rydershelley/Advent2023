const fs = require('fs');
const data = fs.readFileSync('day01_input.txt', 'utf8');
const lines = data.split(/\n/);
const subset = lines.slice(0,5)

// Part 1
// Extract digits as string from each line
const lineNums = lines.map(line => {
  const numbers = [...line].reduce((numStr, cur) => {
    const nums = '0123456789';
    if(nums.includes(cur)) {
      return numStr + cur
    }
    return numStr
  },'')
  return numbers
});

// Get first and last digits, concat them
const firstLast = function(numStr){
  const first = numStr[0];
  const last = numStr.slice(-1);
  const sum = Number(first + last);
  // console.log(first,last, sum);
  return sum
}

// Get first and last, then reduce to cumulative total
const total = lineNums.map(el=> firstLast(el)).reduce((acc,cur)=>acc+cur,0)
// console.log(total);


// Part 2
const numWords = ['zero','one','two','three','four','five','six','seven','eight','nine']

// replace written out word with number
const lineNumWritten = lines.map(line=>{
  if(line.includes('oneight')) line=line.replaceAll('one','onee')
  if(line.includes('eightwo')) line=line.replaceAll('eight','eightt')
  if(line.includes('twone')) line=line.replaceAll('two','twoo')

  for (let i=0; i<numWords.length; i++ ) {
    line = line.replaceAll(numWords[i], i);
  };
  return line
})
// console.log(lineNumWritten);

const writtenLineNums = lineNumWritten.map(line => {
  const numbers = [...line].reduce((numStr, cur) => {
    const nums = '0123456789';
    if(nums.includes(cur)) {
      return numStr + cur
    }
    return numStr
  },'')
  return numbers
});
// console.log(writtenLineNums);

const writtenTotal = writtenLineNums.map(el=> firstLast(el)).reduce((acc,cur)=>acc+cur,0)
console.log(writtenTotal);


