// Day 06

// Part 1

/*
Time:        53     89     76     98
Distance:   313   1090   1214   1201
*/

const waysToWin = function(t, d){
  let result = 0;
  for (let i = 1; i <=t; i++) {
    if (i*(t-i) >= d) result ++
  }
  return result
}

// console.log(waysToWin(53,313));
// console.log(waysToWin(89,1090));
// console.log(waysToWin(76,1214));
// console.log(waysToWin(98,1201));

// console.log(waysToWin(53,313)*waysToWin(89,1090)*waysToWin(76,1214)*waysToWin(98,1201));

// Part 2

console.log(waysToWin(53897698,313109012141201));