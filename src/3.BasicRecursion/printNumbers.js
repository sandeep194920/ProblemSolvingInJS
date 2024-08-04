/*
Print numbers from 1 to n using recursion
*/

// Approach 1 - Print first
console.log("----------APPROACH 1-----------------");

const printNumbers = (count, n) => {
  console.log(count);
  if (count === n) return;
  printNumbers(count + 1, n); // same as return printNumbers(count + 1, n). return is not needed here as there's no other lines to be executed after this line
};

printNumbers(1, 6);

// Approach 2 - Print at last

console.log("----------APPROACH 2-----------------");

const printNumbersWhileExiting = (n) => {
  if (n < 1) return;
  printNumbersWhileExiting(n - 1);
  console.log(n);
};

printNumbersWhileExiting(6);

/*
CALL STACK FOR APPROACH 2
1 -> 1
2 -> 2 ... and so on below
3
4
5
6
*/
