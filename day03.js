const fs = require("fs");
const data = fs.readFileSync("day03_input.txt", "utf8");
const lines = data.split(/\n/);

// Part 1

const partNumbers = function (lines) {
  const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const sym = ["@", "#", "$", "%", "&", "*", "/", "=", "-", "+"];
  let numString = "";
  let total = 0;
  let valid = false;
  for (let line = 0; line < lines.length; line++) {
    for (let i = 0; i < lines[line].length; i++) {
      // If character is a number, add it to accumulating number string
      if (nums.includes(lines[line][i])) {
        numString += lines[line][i];
        // if an adjacent index is a symbol, trigger the number as valid
        if (line === 0) {
          if (
            sym.includes(lines[line][i - 1]) ||
            sym.includes(lines[line][i + 1]) ||
            sym.includes(lines[line + 1][i - 1]) ||
            sym.includes(lines[line + 1][i]) ||
            sym.includes(lines[line + 1][i + 1])
          )
            valid = true;
        } else if (line === lines.length - 1) {
          if (
            sym.includes(lines[line - 1][i - 1]) ||
            sym.includes(lines[line - 1][i]) ||
            sym.includes(lines[line - 1][i + 1]) ||
            sym.includes(lines[line][i - 1]) ||
            sym.includes(lines[line][i + 1])
          )
            valid = true;
        } else {
          if (
            sym.includes(lines[line - 1][i - 1]) ||
            sym.includes(lines[line - 1][i]) ||
            sym.includes(lines[line - 1][i + 1]) ||
            sym.includes(lines[line][i - 1]) ||
            sym.includes(lines[line][i + 1]) ||
            sym.includes(lines[line + 1][i - 1]) ||
            sym.includes(lines[line + 1][i]) ||
            sym.includes(lines[line + 1][i + 1])
          )
            valid = true;
        }
      }
      // element after the number string
      if (numString && !nums.includes(lines[line][i])) {
        // if the completed number is valid, add it to the total
        if (valid) {
          total += +numString;
        }
        // reset the number string for next possibilities
        numString = "";
        valid = false;
      }
    }
  }
  return total;
};
// console.log(partNumbers(lines));

//  Part 2.
