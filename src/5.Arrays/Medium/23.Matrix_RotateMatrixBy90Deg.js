/*
  Rotate image(matrix) by 90deg 

  Side Note: Image is actually a matrix of pixels

Input 
 [[1,2,3],
  [4,5,6],
  [7,8,9]]

Output
 [[7,4,1],
  [8,5,2],
  [9,6,3]]

Example 2:

Input:
 [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]

Output:
[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

Explanation:
 Rotate the matrix simply by 90 degree clockwise and return the matrix
*/

/* Observation 

- 2 ways we can look at this. Observe input and output
- 1st way - The 1st row becomes last column. -> 1, 2, 3 -> will become last column. 2nd row will become 2nd last col, and last row becomes first col.
- 2nd way - The 1st column in reverse, becomes the first row. Col 1, 4, 7 becomes row 7, 4, 1. Second col in reverse becomes 2nd row and thrird col in reverse becomes 3 row.

*/

/*
Approach 1

1st way


Input 
 [[1,2,3],
  [4,5,6],
  [7,8,9]]

Consider 1, 2, 3 which I want it to be last col

- We take first row and fill it in last col
[[x, x, 1],[x, x, 2], [x, x, 3]]

- We take second row and fill it in last but 2nd col
[[x, 4, 1], [x, 5, 2], [x, 6, 3]]

So did you notice the pattern, the row is moving forward, and col is moving from last to first.
*/

/*
NOTE: To create an array like this 

[['x','x','x'],
['x','x','x'],
['x','x','x']]

I did the below

const resultMatrix = new Array(matrix.length).fill(
  new Array(matrix[0].length).fill("x")
);

This creates a matrix we want, but the biggest problem is, fill method creates arrays within it
is deepcopy of same array. I mean, if you modify an element in row1, it will modify other rows as well.

Example, when I create this with deep copy

matrix = 
[['x','x','x'],
['x','x','x'],
['x','x','x']]


and if I do, matrix[0][0] = "modified", I get

matrix = 
[
    ['modified','x','x'],
    ['modified','x','x'],
    ['modified','x','x']
]

Why does this happen. If you create sub-arrays in fill method, then this will happen because
fill creates arrays that point to same reference. 

What's the solution here?

const resultMatrix = new Array(matrix.length).fill(null).map(() => {
   return new Array(matrix[0].length).fill("x");   
});

Why am I filling with null? 

new Array(matrix.length) -> gives me [X 3 empty] whereas 
new Array(matrix.length).fill(null) -> gives me [null, null, null] on which I can then

map on each element and create new Arrays filled with 'x'. This time, each array will have a different reference.


I can also do this with Array.from as explained here https://stackoverflow.com/a/68029192/10824697

Correct ones are

Variant 1 -> using Array.from and Array.fill -> Notice, the inner fill is fine because 'x' is filled inside and not an array, so no issue of deepcopy

  const resultMatrix = Array.from({ length: matrix.length }, () => {
    return new Array(matrix[0].length).fill("x");
  });


Variant 2 -> using new Array -> A bit tedious way, but not bad

  const resultMatrix = new Array(matrix.length).fill(null).map(() => {
    return new Array(matrix[0].length).fill("x");
  });

Variant 3 -> using Array.from() only

  const resultMatrix = Array.from({ length: matrix.length }, () => {
    return Array.from({ length: matrix[0].length }, () => "x");
  });

I prefer 1 or 3.

*/

const approach1 = (matrix) => {
  // Wrong one -> Deep copy of subarrays are created by upper level's fill method

  //   const resultMatrix = new Array(matrix.length).fill(
  //     new Array(matrix[0].length).fill("x")
  //   );

  // Correct ones below

  //   const resultMatrix = new Array(matrix.length).fill(null).map(() => {
  //     return new Array(matrix[0].length).fill("x");
  //   });

  const resultMatrix = Array.from({ length: matrix.length }, () => {
    return Array.from({ length: matrix[0].length }, () => "x");
  });

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      // populate new matrix
      resultMatrix[col][matrix[row].length - row - 1] = matrix[row][col];
    }
  }
  return resultMatrix;
};

const input = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(
  "Approach 1 - Time O(NXM), Space O(NXM) due to extra space",
  approach1(input)
);

console.log("-------------------------------------");

/*
Approach 2 - Optimal Approach, Time O(), Space O(1) - In place

Input 
 [[1,2,3],
  [4,5,6],
  [7,8,9]]

Output
 [[7,4,1],
  [8,5,2],
  [9,6,3]]


So the optimal approach's idea is to first transpose matrix (convert rows to cols and vice versa) and then reverse the matrix


Input 
 [[1,2,3],
  [4,5,6],
  [7,8,9]]

Transposed input - Cols to rows and rows to cols

[
 [1, 4, 7],
 [2, 5, 8],
 [3, 6, 9]
]

Now reverse it

[
 [7, 4, 1],
 [8, 5, 2],
 [9, 6, 3]
]

This is the output.

So to rotate the array to 90deg, the optimal approach would be
- To transpose matrix - convert rows to cols and cols to rows
- And reverse the matrix (each row to be reversed)
*/

const optimalApproach = (matrix) => {
  // Diagonal half is swapped - https://www.youtube.com/watch?v=Z0R2u6gd3GU&t=1s&ab_channel=takeUforward
  for (let r = 0; r < matrix.length - 1; r++) {
    for (let c = r + 1; c < matrix[r].length; c++) {
      //   let temp = matrix[r][c];
      //   matrix[r][c] = matrix[c][r];
      //   matrix[c][r] = temp;

      // Below swapping is same as above

      [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]];
    }
  }

  // Now reverse each array in matrix using 2 pointer approach.
  for (let r = 0; r < matrix.length; r++) {
    const rowLength = matrix[r].length;
    for (let c = 0; c < matrix[r].length / 2; c++) {
      //   let temp = matrix[r][c];
      //   matrix[r][c] = matrix[r][rowLength - 1 - c];
      //   matrix[r][rowLength - 1 - c] = temp;

      //   [matrix[r][c], matrix[r][rowLength - 1 - c]] = [
      //     matrix[r][rowLength - 1 - c],
      //     matrix[r][c],
      //   ];

      [matrix[r][c], matrix[r][matrix[r].length - 1 - c]] = [
        matrix[r][matrix[r].length - 1 - c],
        matrix[r][c],
      ];
    }
  }

  return matrix;
};

const optimalInput = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log("Optimal", optimalApproach(optimalInput));
