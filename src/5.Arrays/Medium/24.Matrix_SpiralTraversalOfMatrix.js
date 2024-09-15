/*Spiral Traversal of Matrix

Problem Statement: Given a Matrix, print the given matrix in spiral order.

Example 1:
Input: Matrix[][] = 

[
  [1, 2, 3, 4 ], 
  [5, 6, 7, 8 ],	
  [9, 10, 11, 12 ],
  [13, 14, 15, 16 ]
]

Output: 1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10.
Explanation: The output of matrix in spiral form.

Example 2:
Input: Matrix[][] = { { 1, 2, 3 },
	              { 4, 5, 6 },
		      { 7, 8, 9 } }
			    
Output: 1, 2, 3, 6, 9, 8, 7, 4, 5.
Explanation: The output of matrix in spiral form.
*/

/*
First row last col -> Last row last col -> last row first col -> 

r[0]col[0] -> row[0]col[arr.length - 1 - row]

row[0]col[arr.length - 1 - row] -> row[arr.length - 1 - row]col[arr.length - 1 - col]

row[arr.length - 1 - row]col[arr.length - 1 - col] -> row[0]col[arr.length - 1 - col]

row[0]col[arr.length - 1 - col] -> row[1]col[0]

 row[1]col[0] -> row[1]col[arr.length - 1 - row]


So we need 4 loops

1 -> Print left to right
2 -> Print from top to bottom
3 -> Print from right to left
4 -> Print from bottom to top

How to do it?

Visualize this.

-Take 4 points. PA, PB, PC and PD.
- PA -Starts at top row- moves across rows (it's direction is from top to bottom. Starts at top and slowly moves to bottom)
- PB -Starts at last col- moves across columns in reverse (it's direction is from top to left. Starts at top and slowly moves to left)
- PC -Starts at last row- moves across rows (it's direction is from bottom to top. Starts at bottom and slowly moves to top)
- PD -Starts at last col- moves across columns in forward direction(it's direction is from left to right. Starts at left and slowly moves to right)

                PB 
  PA  [1, 2, 3, 4] 
      [5, 6, 7, 8]	
      [9, 10, 11, 12] 
      [13, 14, 15, 16] PC 
      PD            

- When PA meets PC or PB meets PD we end the loop.     

*/

const traverse = (matrix) => {
  const result = [];
  let pointA = 0,
    pointB = matrix[0].length - 1,
    pointC = matrix.length - 1,
    pointD = 0;

  while (pointA <= pointC || pointB >= pointD) {
    for (let col = pointA; col <= pointB; col++) {
      result.push(matrix[pointA][col]);
    }

    pointA++; // incrementing upper row by 1

    for (let row = pointA; row <= pointC; row++) {
      result.push(matrix[row][pointC]);
    }

    pointB--; //decrement right col by 1

    for (let col = pointB; col >= pointD; col--) {
      result.push(matrix[pointC][col]);
    }

    pointC--; // decrement lower row by 1

    for (let row = pointC; row >= pointA; row--) {
      result.push(matrix[row][pointD]);
    }

    pointD++; // increment lower column by 1
  }
  return result;
};

const input = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];
console.log(traverse(input));
