function solve(board, col, n, possibilities) {
  // if the col is out of bounds, then store the answer and return - base case

  if (col === n) {
    possibilities.push(board.map((row) => row.join("")));
    return;
  }

  for (let row = 0; row < n; row++) {
    if (isSafe(row, col, board, n)) {
      board[row][col] = "Q";
      solve(board, col + 1, n, possibilities);
      board[row][col] = ".";
    }
  }
  return possibilities;
}

// Utilities

// using for loop
function isSafe(row, col, board, n) {
  // row check

  let r = row,
    c = col;

  while (c >= 0) {
    if (board[r][c] === "Q") {
      return false;
    }
    --c;
  }

  r = row;
  c = col;

  // upper left diag check

  while (r >= 0 && c >= 0) {
    if (board[r][c] === "Q") {
      return false;
    }

    --r;
    --c;
  }

  r = row;
  c = col;

  // lower left diag check
  while (r < n && c >= 0) {
    if (board[r][c] === "Q") {
      return false;
    }
    ++r;
    --c;
  }

  return true;
}

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const board = [],
    possibilities = [];

  for (let row = 0; row < n; row++) {
    board.push(Array(n).fill("."));
  }

  return solve(board, 0, n, possibilities);
};

const result = solveNQueens(4);
console.log(result);
