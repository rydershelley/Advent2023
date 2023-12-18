const fs = require('fs');
const data = fs.readFileSync('day13_input.txt', 'utf8');
const lines = data.split(/\n\n/);


// Part 1
const transpose = function(arr) {
  let inputArr = arr.map(el => el.split(''));
  const newCols = inputArr.length;
  const newRows = inputArr[0].length;
  const newArr = []
  for (let i=0; i < newRows; i++) newArr.push([])

  for (let i=0; i<newCols; i++){
    for (let j=0; j<newRows; j++) newArr[j].push(inputArr[i][j])
  }
  return newArr.map(el=>el.join(''))
}

const findPoint = function(inputArr) {
  for (let i=0; i<inputArr.length; i++) {
    if (inputArr[i] === inputArr[i+1]) {
      let top =''
      let bottom = ''
      for (let j=0; j<Math.max(i, inputArr.length - i); j++) {
        top += inputArr[i-j] ? inputArr[i-j] : '';
        bottom += inputArr[i + 1 + j] ? inputArr[i + 1 + j] : '';
      }
      if (top.startsWith(bottom) || bottom.startsWith(top)) return i + 1
    }
  }
}

const findReflection = function(str) {
  const inputArr = str.split('\n')
  return findPoint(inputArr) ? findPoint(inputArr) *100 : findPoint(transpose(inputArr))
}

const summary = lines.reduce((a,c, i) => a + findReflection(c),0);
console.log(`Part 1: ${summary}`); // 37718


// Part 2

// Modify reflection finder to find multiple reflections -> I'll exclude the original match later
const findPoints = function(inputArr) {
  let result = [];
  for (let i=0; i<inputArr.length; i++) {
    if (inputArr[i] === inputArr[i+1]) {
      let top =''
      let bottom = ''
      for (let j=0; j<Math.max(i, inputArr.length - i); j++) {
        top += inputArr[i-j] ? inputArr[i-j] : '';
        bottom += inputArr[i + 1 + j] ? inputArr[i + 1 + j] : '';
      }
      if (top.startsWith(bottom) || bottom.startsWith(top)) result.push(i + 1)
    }
  }
  return result
}

// Change one spot of a line, then run findPoint to get new point, or keep changing / looking
const fixSmudge = function(str) {
  let origArr = str.split('\n')
  const originalReflection = findPoint(origArr) ? findPoint(origArr) *100 : findPoint(transpose(origArr))
  let [...inputArr] = origArr;
  let newReflection = originalReflection
  let transReflect, reflect;
  for(let i=0; i<inputArr.length; i++) {
    for (let j=0; j<inputArr[i].length; j++) {
      // Change element by element
      inputArr[i] = inputArr[i].split('')
      inputArr[i][j] = inputArr[i][j] === "#" ? "." : "#";
      inputArr[i] = inputArr[i].join('')

      if (findPoints(inputArr).length > 0) {
          reflect = findPoints(inputArr).filter(el=> +el * 100 !== originalReflection)
        }
      if (findPoints(transpose(inputArr)).length > 0) {
          transReflect = findPoints(transpose(inputArr)).filter(el=> el !== originalReflection)
        }
        
        newReflection = +reflect > 0 ? +reflect * 100 : +transReflect
      
      if (newReflection > 0 && newReflection !== originalReflection) return newReflection
      
      // Change element back for next one
      inputArr[i] = inputArr[i].split('')
      inputArr[i][j] = inputArr[i][j] === "#" ? "." : "#";
      inputArr[i] = inputArr[i].join('')

    }
  }
}

const fixedSummary = lines.reduce((a,c) => a + +fixSmudge(c),0);
console.log(`Part 2: ${fixedSummary}`);
