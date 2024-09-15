/*Problem Statement: Given a matrix if an element in the matrix is 0 then you will have to set its entire column and row to 0 and then return the matrix.

Examples 1:
Input:
 matrix=[[1,1,1],[1,0,1],[1,1,1]]

Output:
 [[1,0,1],[0,0,0],[1,0,1]]

Explanation:
 Since matrix[2][2]=0.Therfore the 2nd column and 2nd row wil be set to 0.
 
Input:
 matrix=[[0,1,2,0],[3,4,5,2],[1,3,1,5]]

Output:
[[0,0,0,0],[0,4,5,0],[0,3,1,0]]

Explanation:
Since matrix[0][0]=0 and matrix[0][3]=0. Therefore 1st row, 1st column and 4th column will be set to 0

*/

/* 
* Approach 1 - Brute force - Time Comp - O(MXN) X O(M + N) -> X between both because at each element, we traverse row and col again. 


  Row 0   Row 1   Row 2
[[1,1,1],[1,0,1],[1,1,1]]

is equal to 


[  [1,1,1]
   [1,0,1]
   [1,1,1]
]


Outer loop represents rows and inner ones for cols

The task is to make cols and rows 0s for everywhere the 0 is present. Output should be

[  [1,0,1]
   [0,0,0]
   [1,0,1]
]

Think about it. There's a trap here. If you make any one 0, and when you reach that 0, you will see
the zero and start making it's neighbours 0 again which is wrong. So what we do is
mark adjacent rows and cols of 0 to -1 instead of 0. After completing markings, we finally 
traverse the matrix and make all -1s to 0s.

In brute-force, as soon as we see a 0 somewhere, we start marking all ajacents to -1. It is time
consuming because you are stopping the traversal at that point and marking adjacents to -1. In the future
if next element appears to be 0, you again mark all that row and col with -1. So if all rows and col
elements are 0s you do the same for each and every element.

In better (optimal) solution, we modify the traversal marking -1. There, we just keep track of elements 
to be marked -1 (but not traversing and making it -1 at that point itself). This would save us lot of time.



[     x 
   [1,0,1]
   [0,0,0]
   [1,0,1]
]
Coming back to Bruteforce - 

- consider Row 0, Col 1 that marked with x. When we encounter r0 col1, we mark all elements in row0 to be -1 and all elements 
of col1 to be -1

*/

// Inputs

const input1 = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];
const input2 = [
  [0, 1, 2, 0],
  [3, 4, 5, 2],
  [1, 3, 1, 5],
];
const input3 = [[1], [1], [1]];

const brute = (matrix) => {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      // Time of nested for-loops- O(NXM)

      if (matrix[row][col] === 0) {
        // traverse the entrire row and col and mark it -1 where ever it is not 0. It is important to leave 0s as it is
        // so it won't override others

        // matrix[row][col] = -1; // This is optional. If we do this, then at the end all -1s will get converted into 0 anyways

        markRow(matrix, row); // Time - O(M)
        markCol(matrix, col); // Time - O(N)
      }
    }
  }
  // At this point, console log the matrix and you should see -1s properly replaced
  // console.log(matrix)

  // replace -1s with 0s

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++)
      if (matrix[r][c] === -1) {
        matrix[r][c] = 0;
      }
  }

  return matrix;

  //   Overall time comp is O(MXN) X O(M+N)
};

const markRow = (matrix, row) => {
  // This for-loop means - Mark every column of given particular row with -1
  for (let col = 0; col < matrix[row].length; col++) {
    if (matrix[row][col] !== 0) {
      matrix[row][col] = -1;
    }
  }
};

const markCol = (matrix, col) => {
  // This for-loop means - In every row, this given particular column must be marked -1
  for (let row = 0; row < matrix.length; row++) {
    if (matrix[row][col] !== 0) {
      matrix[row][col] = -1;
    }
  }
};

console.log("Approach 1 - Brute-force");
console.log(brute(input1));
console.log(brute(input2));
console.log(brute(input3));

// [
//     [0, 1, 2, 0],
//     [3, 4, 5, 2],
//     [1, 3, 1, 5],
// ];

// [
//     [0, -1, -1, 0],
//     [3, 4, 5, 2],
//     [1, 3, 1, 5],
// ];

// Approach 2 - Betterment of Bruteforce - Time O(2 NXM) Space O(M) + O(N)

/*
As I explained in Bruteforce, what used to happen in BF approach is that, we used to traverse the array and whenever we 
encountered a 0, we traversed all the rows and cols in that row (expect ones that were 0s) and were marking as -1.
The key point was, at every point where we found 0, we used to traverse the rows and cols from that point and made them -1. This
consumed a lot of time of O(N*M ^ 2). 

For example, if we have [0,0,0] just taking 3 elements for simplicity, we reach first 0, we traverse all elements in that row 
and col and mark it -1. We reach 2nd 0 we do the same, we reach 3rd 0 and do the same. So for 3 elements, we traversed 3 rows and 
3 cols at every element. So it's total of 3*3 = 9 times. 

But in this better approach we don't traverse 3 times at each element. Instead we try to traverse 3 times overall at the end to mark them.

Let's take 2 hashmaps. Row hashmap and col hashmap to keep track of occurrance of 0.


rhash = {
 0: true
}

chash = {

}



[     c
     [0, 1, 2, 0],
   r [3, 4, 5, 2],
     [1, 3, 1, 5],
];

We check, is r 0, if yes we add that in rhash
Similarly We check, is c 0, if yes we add that in chash

We do this for all elements. At the end it looks like this 


rhash = {
 0: true
}

chash = {
 0:true,
 3:true
}


Instead of rhash and chash, we can take an array as well.

rowTracker = [] -> for tracking row that gets 0
colTracker = [] -> for tracking col that gets 0

Once I mark that, let's traverse the main array again

*/

const betterApproach = (matrix) => {
  //   const rhash = {},
  //     chash = {};

  const rowTracker = new Array(matrix.length).fill("x");
  const colTracker = new Array(matrix.length).fill("x");

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === 0) {
        rowTracker[row] = 0;
        colTracker[col] = 0;
      }
    }
  }

  // look at hashmap and mark 0 in the matrix accordingly
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (rowTracker[row] === 0 || colTracker[col] === 0) {
        matrix[row][col] = 0;
      }
    }
  }
  return matrix;
};

const betterApproachInput1 = [
  [0, 1, 2, 0],
  [3, 4, 5, 2],
  [1, 3, 1, 5],
];

console.log("Approach 2 - Better Approach");
console.log(betterApproach(betterApproachInput1));
// console.log(betterApproach(input2));
// console.log(betterApproach(input3));

// OPTIMAL APPROACH - Time O(2 * M * N), Space O(1) (Inplace alteration)

/* Most interesting solution

Desclaimer - I saw Striver's and others' solutions but didn't really feel good. Chat GPT's solution was the best for this
https://chatgpt.com/share/c4b471db-7873-426f-b4b0-bf71572015f3 which I will explain here


Basically, the idea is to avoid using extra space like we did above. In the better approach above, we took an extra array for
row and extra array for column to hold the 0s. If that extra row/col had a 0, that means all elements in those rows/cols must be marked as 0s correct!

We apply same analogy but without extra row & col. We take the first row and first col of existing matrix to store the result.

I mean, the high level idea is, whenever you find a 0, you mark the beginning of that row  and beginning of that col to 0.
But that's not all. There is a catch. First digest the point I'm trying to make using below matrix

[
 AB  A A A

 A   B B B 

 A   B B B
]

 If you take a look, consider As to be the 0th row/col that we use to mark 0 (to avoid space). Meaning, if we encounter a 0 
 anywhere in B, then we mark the corresponding A row and A col to 0. 

 Then we traverse the array and whereever we find As to be 0, we mark B in that row/col to be 0. 
 But like I said, there's a catch. First observe AB. what is AB. AB is the place where it is common for first row and first column. 

 Imagine if we have a matrix like this


 1  2  3  0
 4 5 6 7
 8 9 10 11


 0 is at first row, last col. Looking at 0, if you set 1 to 0 (which is the common element for first row and first col), as I explained in above step,
 then that would mess up because, the first column elements 4 and 8 should also then be set to 0 as the 1 at AB was set to 0. This would be wrong.
Hence, we need to treat first row and first column using 2 variables (just for first row and col). Remaining whatever I said above holds true.
Enough theory, let's see the steps.

Consider this example:

matrix   

10   0   20  30                                             0   0   0  0 

5   18   0   25             -> should convert to ->         0   0   0  0

30  40  50   60                                             30  0   0  60    

         

STEPS:

1. First take two variables called firstRowIsZero, firstColIsZero and set them to false. False indicate that there are no zeros in first row or first col yet.

firstRowIsZero = false, firstColIsZero = false

2. Traverse first row only -> and set firstRowIsZero to true if any element in first row is 0.

3. Traverse first col only -> and set firstColIsZero to true if any element in first col is 0.

4. Traverse row 1, col 1 to end. That is, from 18 to 60. While doing so, if you encounter any 0, mark first element in that row,
and first element in that column to 0. This indicates that, in the next traversal we need to mark the entire row/col to 0 if 
the first element in that row/col is 0. But notice, this logic should not be applied to row0 and col0. For row0 and col0, 
we use firstRowIsZero and firstColIsZero.

At this point, your matrix would look like this.

firstRowIsZero = true (as we had 0 in first row, second col), 
firstColIsZero = false (as we didn't have any 0 in first col)

10             0           0(This)       30             

0(This)       18            0            25             

30            40           50            60


"This" elements are marked 0s according to step 4.


5. Now that we have marked first rows and cols (except for first row and col as we are handling them through frIZ and frCZ variables),
we can now traverse matrix and mark elements. If the first element in row/col we traverse is 0, then any element in that row must be
marked 0. But REMEMBER, WE NEED TO START TRAVERSING FROM ROW1 and COL1 (Not row0, col0). If you do traverse row0, col0 initially 
and mark 0s there, then the next elements (B elements -> Refer to our first diagram), will follow first row and that will also be marked 0 which is wrong.

So we have to start from row1,col1 and for each element, check if the first element in that row/col is 0. If yes then mark it 0.
The matrix now looks like this.



firstRowIsZero = true 
firstColIsZero = false

10                              0                                  0                                      30             

0              0(made 0 due to first el 0 in row)          0(was 0 already)              0(made 0 due to first el 0 in row)           

30             0(made 0 due to first el 0 in col)          0(made 0 due to first el 0 in col)            60

So it is like this



10     0      0        30             

0      0      0        0        

30     0      0        60


Step 6 - Now that we have taken care of all B elements, time to take care of A and AB elements. That's pretty easy due to 
firstRowIsZero and firstColIsZero. 
Iterate through row 0 and check for each element, if firstRowIsZero === true then mark every element in first row as 0.
Similarly, iterate through row 1 and check for each element, if firstColIsZero === true then mark every element in first col as 0.

We finally get like this

firstRowIsZero = true 
firstColIsZero = false

 0     0      0      0              ------> all 0s due to  firstRowIsZero being true

 0      0      0     0        

30     0      0      60


*/

const optmialApproach = (matrix) => {
  let firstRowIsZero = false,
    firstColIsZero = false;

  // first row iteration
  for (let col = 0; col < matrix[0].length; col++) {
    // As soon as we find first 0 in first row we set firstRowIsZero to true
    if (matrix[0][col] === 0) {
      firstRowIsZero = true;
      break;
    }
  }

  // first col iteration
  for (let row = 0; row < matrix.length; row++) {
    if (matrix[row][0] === 0) {
      firstColIsZero = true;
      break;
    }
  }

  console.log("Firstrowis0", firstRowIsZero);
  console.log("Firstcolis0", firstColIsZero);

  // At this point, we would have set firstRowIsZero and firstColIsZero

  // Now let's traverse B elements and set A elements (except AB element) to 0 if any B element is 0

  for (let row = 1; row < matrix.length; row++) {
    for (let col = 1; col < matrix[row].length; col++) {
      if (matrix[row][col] === 0) {
        matrix[row][0] = 0;
        matrix[0][col] = 0;
      }
    }
  }

  // This now sets A elements to 0, but don't worry about AB element. That wouldn't be set as we looped from row 1 and col 1, and not row 0, col 0

  // Now we can iterate again for B elements and check if A elements are 0 then we make the entire row col 0 (make each element 0)

  for (let row = 1; row < matrix.length; row++) {
    for (let col = 1; col < matrix[row].length; col++) {
      if (matrix[row][0] === 0 || matrix[0][col] === 0) {
        matrix[row][col] = 0;
      }
    }
  }

  // This now sets all B elements properly following 0s present in first row and col.
  // Now let's take care of AB element and A elements. Meaning, if any element in first row is 0, then entire row should be 0. Similarly
  // for the column.

  // let's do it for first row
  if (firstRowIsZero) {
    for (let col = 0; col < matrix[0].length; col++) {
      matrix[0][col] = 0;
    }
  }

  // let's do it for first col
  if (firstColIsZero) {
    for (let row = 0; row < matrix.length; row++) {
      matrix[row][0] = 0;
    }
  }

  return matrix;
};

const optimalInput1 = [
  [10, 0, 20, 30],

  [5, 18, 0, 25],

  [30, 40, 50, 60],
];

const optimalInput2 = [
  [1, 2, 3, 0],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
];

console.log("--------------------------------------");
console.log("Optimal approach", optmialApproach(optimalInput1));
console.log("Optimal approach", optmialApproach(optimalInput2));
