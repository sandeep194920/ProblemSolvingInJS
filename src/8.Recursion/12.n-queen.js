const board = [],
  possibilities = [];

for (let row = 0; row < 4; row++) {
  board.push(Array(4).fill(""));
}

function solve(board, col, n) {
  // if the col is out of bounds, then store the answer and return - base case

  if (col === n) {
    possibilities.push(board.map((row) => row.slice()));
    // console.log(board);

    return;
  }

  for (let row = 0; row < n; row++) {
    if (isSafe(row, col, board, n)) {
      board[row][col] = "Q";
      solve(board, col + 1, n);
      board[row][col] = "";
    }
  }
}

solve(board, 0, 4);
console.log("Different ways to arrange n queens", possibilities);

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

  for (let r = row, c = col; r >= 0 && c >= 0; r--, c--) {
    if (board[r][c] === "Q") {
      return false;
    }
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
