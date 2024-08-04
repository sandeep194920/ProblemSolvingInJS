/*
print your name N times using recursion
*/

const printName = (count, n) => {
  if (n === 0) return; // handles edge case where n is 0

  console.log("Sandeep");

  if (count === n) return;

  printName(count + 1, n);
};

printName(1, 6);
