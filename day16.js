const fs = require("fs");
const data = fs.readFileSync("day16_input.txt", "utf8");

// Part 1.
const energizeTiles = function (str) {
  const field = str.split(/\n/).map((el) => el.split(""));
  // Create second array to tally energizations
  let energy = [];
  for (let i = 0; i < field.length; i++) {
    energy.push([]);
    for (let j = 0; j < field[0].length; j++) energy[i].push(0);
  }
  const rowBound = field.length;
  const colBound = field[0].length;

  let start = [0, 0, "R"];
  let queue = [];
  queue.push(start);

  while (queue.length > 0) {
    let [row, col, dir] = queue.shift();

    if (
      row < 0 ||
      row >= rowBound ||
      col < 0 ||
      col >= colBound ||
      energy[row][col] > 10
    ) {
    } else {
      let cur = field[row][col];
      energy[row][col]++;

      if (dir === "R" && (cur === "." || cur === "-")) {
        col++;
      } else if (dir === "L" && (cur === "." || cur === "-")) {
        col--;
      } else if (dir === "U" && (cur === "." || cur === "|")) {
        row--;
      } else if (dir === "D" && (cur === "." || cur === "|")) {
        row++;
      } else if (cur === "/" && dir === "L") {
        dir = "D";
        row++;
      } else if (cur === "/" && dir === "R") {
        dir = "U";
        row--;
      } else if (cur === "/" && dir === "U") {
        dir = "R";
        col++;
      } else if (cur === "/" && dir === "D") {
        dir = "L";
        col--;
      } else if (cur === "\\" && dir === "L") {
        dir = "U";
        row--;
      } else if (cur === "\\" && dir === "R") {
        dir = "D";
        row++;
      } else if (cur === "\\" && dir === "U") {
        dir = "L";
        col--;
      } else if (cur === "\\" && dir === "D") {
        dir = "R";
        col++;
      } else if (cur === "-" && (dir === "L" || dir === "R")) {
        col = dir === "L" ? col - 1 : col + 1;
      } else if (cur === "|" && (dir === "U" || dir === "D")) {
        row = dir === "U" ? row - 1 : row + 1;
      } else if (cur === "|" && (dir === "L" || dir === "R")) {
        queue.push([row, col, "U"]);
        queue.push([row, col, "D"]);
        col = -1;
      } else if (cur === "-" && (dir === "U" || dir === "D")) {
        queue.push([row, col, "L"]);
        queue.push([row, col, "R"]);
        col = -1;
      }
      queue.push([row, col, dir]);
    }
  }
  return energy
    .join(",")
    .split(",")
    .map((el) => (el > 0 ? 1 : 0))
    .reduce((a, c) => a + c, 0);
};
// console.log(energizeTiles(data));

// Part 2.
const energizeAllEntries = function (str) {
  const field = str.split(/\n/).map((el) => el.split(""));

  let outcomes = [];
  let starts = [];
  for (let i = 0; i < field.length; i++) {
    starts.push([i, 0, "R"]);
    starts.push([i, field[i].length - 1, "L"]);
    starts.push([0, i, "D"]);
    starts.push([field.length, i, "U"]);
  }

  for (entry of starts) {
    // Create second array to tally energizations
    let energy = [];
    for (let i = 0; i < field.length; i++) {
      energy.push([]);
      for (let j = 0; j < field[0].length; j++) energy[i].push(0);
    }
    const rowBound = field.length;
    const colBound = field[0].length;

    let start = [...entry];
    let queue = [];
    queue.push(start);

    while (queue.length > 0) {
      let [row, col, dir] = queue.shift();

      if (
        row < 0 ||
        row >= rowBound ||
        col < 0 ||
        col >= colBound ||
        energy[row][col] > 10
      ) {
      } else {
        let cur = field[row][col];
        energy[row][col]++;

        if (dir === "R" && (cur === "." || cur === "-")) {
          col++;
        } else if (dir === "L" && (cur === "." || cur === "-")) {
          col--;
        } else if (dir === "U" && (cur === "." || cur === "|")) {
          row--;
        } else if (dir === "D" && (cur === "." || cur === "|")) {
          row++;
        } else if (cur === "/" && dir === "L") {
          dir = "D";
          row++;
        } else if (cur === "/" && dir === "R") {
          dir = "U";
          row--;
        } else if (cur === "/" && dir === "U") {
          dir = "R";
          col++;
        } else if (cur === "/" && dir === "D") {
          dir = "L";
          col--;
        } else if (cur === "\\" && dir === "L") {
          dir = "U";
          row--;
        } else if (cur === "\\" && dir === "R") {
          dir = "D";
          row++;
        } else if (cur === "\\" && dir === "U") {
          dir = "L";
          col--;
        } else if (cur === "\\" && dir === "D") {
          dir = "R";
          col++;
        } else if (cur === "-" && (dir === "L" || dir === "R")) {
          col = dir === "L" ? col - 1 : col + 1;
        } else if (cur === "|" && (dir === "U" || dir === "D")) {
          row = dir === "U" ? row - 1 : row + 1;
        } else if (cur === "|" && (dir === "L" || dir === "R")) {
          queue.push([row, col, "U"]);
          queue.push([row, col, "D"]);
          col = -1;
        } else if (cur === "-" && (dir === "U" || dir === "D")) {
          queue.push([row, col, "L"]);
          queue.push([row, col, "R"]);
          col = -1;
        }
        queue.push([row, col, dir]);
      }
    }
    outcomes.push(
      energy
        .join(",")
        .split(",")
        .map((el) => (el > 0 ? 1 : 0))
        .reduce((a, c) => a + c, 0)
    );
  }
  return Math.max(...outcomes);
};
console.log(energizeAllEntries(data));
