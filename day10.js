const fs = require("fs");
const data = fs.readFileSync("day10_input.txt", "utf8");
const lines = data.split(/\n/);

// Part 1.

const travelTunnel = function (str) {
  const field = str.split(/\n/).map((el) => el.split(""));
  const startRow = field.findIndex((row) => row.includes("S"));
  const startCol = field[startRow].findIndex((el) => el === "S");

  let row = startRow;
  let col = startCol;
  let dir;
  let stepCount = 0;

  // Find a starting point, look Up, Right, Down, then Left
  if (
    field[row - 1][col] === "F" ||
    field[row - 1][col] === "|" ||
    field[row - 1][col] === "7"
  ) {
    dir = "U";
    row--;
    stepCount++;
  } else if (
    (field[row][col + 1] === "7" && field[row][col + 1] === "-") ||
    field[row][col + 1] === "J"
  ) {
    dir = "R";
    col++;
    stepCount++;
  } else if (
    field[row + 1][col] === "J" ||
    field[row + 1][col] === "|" ||
    field[row + 1][col] === "L"
  ) {
    dir = "D";
    row++;
    stepCount++;
  } else if (
    field[row][col - 1] === "L" ||
    field[row][col - 1] === "-" ||
    field[row][col - 1] === "F"
  ) {
    dir = "L";
    col--;
    stepCount++;
  }

  // Walk the tunnel, turning as needed
  while (field[row][col] !== "S") {
    let cur = field[row][col];

    if (cur === "|" && dir === "U") {
      row--;
    } else if (cur === "|" && dir === "D") {
      row++;
    } else if (cur === "-" && dir === "L") {
      col--;
    } else if (cur === "-" && dir === "R") {
      col++;
    } else if (cur === "L" && dir === "D") {
      dir = "R";
      col++;
    } else if (cur === "L" && dir === "L") {
      dir = "U";
      row--;
    } else if (cur === "J" && dir === "D") {
      dir = "L";
      col--;
    } else if (cur === "J" && dir === "R") {
      dir = "U";
      row--;
    } else if (cur === "7" && dir === "U") {
      dir = "L";
      col--;
    } else if (cur === "7" && dir === "R") {
      dir = "D";
      row++;
    } else if (cur === "F" && dir === "U") {
      dir = "R";
      col++;
    } else if (cur === "F" && dir === "L") {
      dir = "D";
      row++;
    }
    stepCount++;
  }
  // Halve the length to find the farthest length from start
  return stepCount / 2;
};
// console.log(travelTunnel(data));

// Part 2.

const fillTunnel = function (str) {
  const field = str.split(/\n/).map((el) => el.split(""));
  const startRow = field.findIndex((row) => row.includes("S"));
  const startCol = field[startRow].findIndex((el) => el === "S");

  let row = startRow;
  let col = startCol;
  let dir;
  const fill = " ";

  // Find a starting point, look Up, Right, Down, then Left
  if (
    field[row - 1][col] === "F" ||
    field[row - 1][col] === "|" ||
    field[row - 1][col] === "7"
  ) {
    dir = "U";
    row--;
  } else if (
    (field[row][col + 1] === "7" && field[row][col + 1] === "-") ||
    field[row][col + 1] === "J"
  ) {
    dir = "R";
    col++;
  } else if (
    field[row + 1][col] === "J" ||
    field[row + 1][col] === "|" ||
    field[row + 1][col] === "L"
  ) {
    dir = "D";
    row++;
  } else if (
    field[row][col - 1] === "L" ||
    field[row][col - 1] === "-" ||
    field[row][col - 1] === "F"
  ) {
    dir = "L";
    col--;
  }

  // Walk the tunnel, turning as needed
  while (field[row][col] !== "S") {
    let cur = field[row][col];

    if (cur === "|" && dir === "U") {
      field[row][col] = fill;
      row--;
    } else if (cur === "|" && dir === "D") {
      field[row][col] = fill;
      row++;
    } else if (cur === "-" && dir === "L") {
      field[row][col] = fill;
      col--;
    } else if (cur === "-" && dir === "R") {
      field[row][col] = fill;
      col++;
    } else if (cur === "L" && dir === "D") {
      field[row][col] = fill;
      dir = "R";
      col++;
    } else if (cur === "L" && dir === "L") {
      field[row][col] = fill;
      dir = "U";
      row--;
    } else if (cur === "J" && dir === "D") {
      field[row][col] = fill;
      dir = "L";
      col--;
    } else if (cur === "J" && dir === "R") {
      field[row][col] = fill;
      dir = "U";
      row--;
    } else if (cur === "7" && dir === "U") {
      field[row][col] = fill;
      dir = "L";
      col--;
    } else if (cur === "7" && dir === "R") {
      field[row][col] = fill;
      dir = "D";
      row++;
    } else if (cur === "F" && dir === "U") {
      field[row][col] = fill;
      dir = "R";
      col++;
    } else if (cur === "F" && dir === "L") {
      field[row][col] = fill;
      dir = "D";
      row++;
    }
  }
  // Halve the length to find the farthest length from start
  return field.map((chars) => chars.join("")).join("\n");
};

console.log(fillTunnel(data));
