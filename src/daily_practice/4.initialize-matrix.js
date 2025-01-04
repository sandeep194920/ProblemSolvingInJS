const initializeBoard1 = (n) => {
  const board = Array(n).fill([]);
  return board;
};

const board1 = initializeBoard1(4);
// board1[0] = "john";
console.log(board1);

// Correct way to initialize a matrix

// const initializeBoard = (n) => {
//   //   const board = Array.from({ length: n }, () => );
//   return board;
// };

// const board = initializeBoard(4);
// console.log(board);
