const board = [],
  possibilities = [];

const rSet = new Set();
const udSet = new Set();
const ldSet = new Set();

for (let row = 0; row < 4; row++) {
  board.push(Array(4).fill(""));
}

function solve(board, col, n) {
  // if the col is out of bounds, then store the answer and return - base case

  if (col === n) {
    // possibilities.push(board.map((row) => row.slice()));

    return;
  }

  for (let row = 0; row < n; row++) {
    if (isSafe(row, col, n)) {
      board[row][col] = "Q";

      // add
      rSet.add(row);
      udSet.add(row + col);
      ldSet.add(row - col + (n - 1));

      solve(board, col + 1, n);
      board[row][col] = "";

      // remove
      rSet.delete(row);
      udSet.delete(row + col);
      ldSet.delete(row + (n - 1) - col);
    }
  }
}

solve(board, 0, 4);

function isSafe(row, col, n) {
  //   if (rSet.has(row)) return false;
  //   if (udSet.has(row + col)) return false;
  //   if (ldSet.has(row + (n - 1) - col)) return false;
  if (rSet.has(row) || udSet.has(row + col) || ldSet.has(row + (n - 1) - col))
    return false;
  return true;
}

// console.log(possibilities);
