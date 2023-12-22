const fs = require("fs");
const { start } = require("repl");
const data = fs.readFileSync("day21_input.txt", "utf8");
const test = fs.readFileSync("day21_test.txt", "utf8");

const findSteps = function (str, steps) {
  let arr = str.split("\n").map((el) => el.split(""));

  let startRow = arr.findIndex((row) => row.includes("S"));
  let startCol = arr[startRow].findIndex((el) => el === "S");

  let possibles = [];
  possibles.push([startRow, startCol]);

  for (let i = 0; i < steps; i++) {
    let newsteps = [];
    while (possibles.length > 0) {
      let poss = possibles.shift();
      let row = poss[0];
      let col = poss[1];
      arr[row][col] = ".";
      //Above
      if (row > 0 && arr[row - 1][col] === ".") {
        arr[row - 1][col] = "O";
        newsteps.push([row - 1, col]);
      }
      //Below
      if (row < arr.length - 1 && arr[row + 1][col] === ".") {
        arr[row + 1][col] = "O";
        newsteps.push([row + 1, col]);
      }
      //Left
      if (col > 0 && arr[row][col - 1] === ".") {
        arr[row][col - 1] = "O";
        newsteps.push([row, col - 1]);
      }
      //Right
      if (col < arr[row].length - 1 && arr[row][col + 1] === ".") {
        arr[row][col + 1] = "O";
        newsteps.push([row, col + 1]);
      }
    }
    possibles.push(...newsteps);
  }
  return arr.map((el) => el.join("")).join("\n");
  // console.log(
  //   arr.reduce(
  //     (a, c) => a + c.reduce((acc, cur) => (cur === "O" ? acc + 1 : 0), 0),
  //     0
  //   )
  // );
  const os = arr.map((row) => row.filter((el) => el === "O"));
  console.log(os.reduce((a, c) => a + c.length, 0));
  return arr;
};

// findSteps(test, 64);

// Part 2.

const countRocks = function (str) {
  const origArr = str.split("\n").map((el) => el.split(""));
  let sum = 0;
  for (line of origArr) {
    for (el of line) {
      if (el === "#") sum++;
    }
  }
  return sum;
};

const countORocks = function (str) {
  const osArr = findSteps(data, 64).split("\n");
  let sum = 0;
  for (line of osArr) {
    let first = line !== osArr[65] ? line.indexOf("..O") + 2 : 1;
    let last = line !== osArr[65] ? line.indexOf("O..") - 2 : line.length - 1;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === "#" && (i < first || i > last)) sum++;
    }
    // console.log(first, last);
  }
  return sum;
};
// console.log(countRocks(data)); // 2248 total rocks in grid
// console.log(countORocks(findSteps(data, 64))); // rocks outside diamond
// console.log(countRocks(data) - countORocks(findSteps(data, 64))); // 1089 rocks INSIDE diamond
// const dat = findSteps(data, 64);
// console.log(dat);

// console.log(26501365 % 131); // 65
// console.log(26501365 / 131);
// console.log(202300 * 131);

const rockOneGrid = 2248;
const rockODiamond = 1089;
const grids = (202300 + 202299) * 202300 - 202299 + 4 * 20299 + 2; // total grids inside diamond
console.log(grids);

const rockTotal = grids * rockOneGrid + rockODiamond; // total rocks inside diamond
console.log(rockTotal);

const stepDiamond = 26501365 ** 2; // total outline step diamond
console.log(stepDiamond);

console.log(stepDiamond - rockTotal);

//High - 610322294942066
//Low - 518322243022136

// console.log(findSteps(test, 18));

// console.log(`test ${(202300 * 2 + 1) ** 2}`);
// console.log(1089 / 2248);
// console.log(stepDiamond - (202300 * 2 + 1) ** 2 * 2248);
