function solve(board, col, n, possibilities, rSet, udSet, ldSet) {
  // if the col is out of bounds, then store the answer and return - base case

  if (col === n) {
    possibilities.push(board.map((row) => row.join("")));
    return;
  }

  for (let row = 0; row < n; row++) {
    if (isSafe(row, col, n, rSet, udSet, ldSet)) {
      board[row][col] = "Q";

      // add
      rSet.add(row);
      udSet.add(row + col);
      ldSet.add(row - col + (n - 1));

      solve(board, col + 1, n, possibilities, rSet, udSet, ldSet);
      board[row][col] = ".";

      // remove
      rSet.delete(row);
      udSet.delete(row + col);
      ldSet.delete(row + (n - 1) - col);
    }
  }
  return possibilities;
}

function isSafe(row, col, n, rSet, udSet, ldSet) {
  //   if (rSet.has(row)) return false;
  //   if (udSet.has(row + col)) return false;
  //   if (ldSet.has(row + (n - 1) - col)) return false;
  if (rSet.has(row) || udSet.has(row + col) || ldSet.has(row + (n - 1) - col))
    return false;
  return true;
}

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const board = [],
    possibilities = [];

  const rSet = new Set();
  const udSet = new Set();
  const ldSet = new Set();

  for (let row = 0; row < n; row++) {
    board.push(Array(n).fill("."));
  }

  return solve(board, 0, n, possibilities, rSet, udSet, ldSet);
};

const result = solveNQueens(4);
console.log(result);
