const fs = require("fs");
const data = fs.readFileSync("day14_input.txt", "utf8");

// Part 1.

const transpose = function (str) {
  let inputArr = str.split(/\n/).map((el) => el.split(""));
  const newCols = inputArr.length;
  const newRows = inputArr[0].length;
  const newArr = [];
  for (let i = 0; i < newRows; i++) newArr.push([]);
  for (let i = 0; i < newCols; i++) {
    for (let j = 0; j < newRows; j++) newArr[j].push(inputArr[i][j]);
  }
  return newArr.map((el) => el.join("")).join("\n");
};

const slideRocks = function (str) {
  let rockArr = str.split(/\n/).map((line) => line.split(""));
  for (let line = 0; line < rockArr.length; line++) {
    for (let runTimes = 0; runTimes < rockArr[line].length; runTimes++) {
      for (let i = 0; i < rockArr[line].length; i++) {
        if (rockArr[line][i] === "." && rockArr[line][i + 1] === "O") {
          rockArr[line][i] = "O";
          rockArr[line][i + 1] = ".";
        }
      }
    }
  }
  return rockArr.map((line) => line.join("")).join("\n");
};

const sumRoundedRocks = (str) => {
  // For sliding North
  let slidArr = str.split(/\n/);
  let sum = 0;
  for (let row = 0; row < slidArr.length; row++) {
    slidArr[row]
      .split("")
      .map((rock) =>
        rock === "O" ? (sum += slidArr.length - row) : (sum += 0)
      );
  }
  return sum;
};

// console.log(`Part 1: ${sumRoundedRocks(transpose(slideRocks(transpose(data))))}`);
// console.log(`Part 1: ${sumRoundedRocks(transpose(slideRocks(transpose(test))))}`);

// Part 2.
// modified functions to I/O arrays instead of strings to minimize split/joins

const transArr = function (arr) {
  let inputArr = arr;
  const newCols = inputArr.length;
  const newRows = inputArr[0].length;
  const newArr = [];
  for (let i = 0; i < newRows; i++) newArr.push([]);
  for (let i = 0; i < newCols; i++) {
    for (let j = 0; j < newRows; j++) newArr[j].push(inputArr[i][j]);
  }
  return newArr;
};

const rotateCCW = (inputArr) => {
  const arr = inputArr;
  return arr[0].map((_, index) =>
    arr.map((row) => row[row.length - 1 - index])
  );
};

const slideArray = function (inputArr) {
  let rockArr = inputArr;
  for (let line = 0; line < rockArr.length; line++) {
    for (let runTimes = 0; runTimes < rockArr[line].length; runTimes++) {
      for (let i = 0; i < rockArr[line].length; i++) {
        if (rockArr[line][i] === "." && rockArr[line][i + 1] === "O") {
          rockArr[line][i] = "O";
          rockArr[line][i + 1] = ".";
        }
      }
    }
  }
  return rockArr;
};

const sumRocksArr = (arr) => {
  let slidArr = arr;
  let sum = 0;
  for (let row = 0; row < slidArr.length; row++) {
    slidArr[row].map((rock) =>
      rock === "O" ? (sum += slidArr.length - row) : (sum += 0)
    );
  }
  return sum;
};

const slideRocksCycle = function (str, cycles) {
  // N, W, S, E
  let rounded = 0;
  let result = transArr(str.split("\n").map((el) => el.split("")));
  let searchArr = [];
  for (let i = 0; i < cycles; i++) {
    result = rotateCCW(
      slideArray(
        rotateCCW(
          slideArray(rotateCCW(slideArray(rotateCCW(slideArray(result)))))
        )
      )
    );
    if (searchArr.includes(sumRocksArr(result)) && i > 1000)
      return [searchArr.indexOf(sumRocksArr(result)), i];
    searchArr.push(sumRocksArr(result));
  }
  return sumRocksArr(transArr(result));
};

// This will first return the current and previous indexes that have the same outcome
// so I can determine the frequency for repetition. Run again on the index that will match
// the billion cycle run result

const cycles = 1000000000;
const [prev, cur] = slideRocksCycle(data, cycles);
const equiv = (cycles % (cur - prev)) + (cur - prev);
console.log(equiv);
console.log(`Part 2: ${slideRocksCycle(data, equiv)}`);
