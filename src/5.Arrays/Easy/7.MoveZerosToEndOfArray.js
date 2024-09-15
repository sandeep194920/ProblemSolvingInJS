/*
Example 1:
Input:
 1 ,0 ,2 ,3 ,0 ,4 ,0 ,1
Output:
 1 ,2 ,3 ,4 ,1 ,0 ,0 ,0
Explanation:
 All the zeros are moved to the end and non-negative integers are moved to front by maintaining order

Example 2:
Input:
 1,2,0,1,0,4,0
Output:
 1,2,1,4,0,0,0
Explanation:
 All the zeros are moved to the end and non-negative integers are moved to front by maintaining order
*/

console.log("APPROACH 1 - Brute Force");

/*
BRUTE-FORCE APPROACH
array = [1 ,0 ,2 ,3 ,0 ,4 ,0 ,1]

Step 1 - Take a temp array and push all non-zero elements from array

        temp = [1,2,3,4,1]

Step 2 - Now Main array's length is more compared to temp's length. Take the difference of both, and add 0s to temp at the end.

        array = [1, 2, 3, 4, 1, 0, 0, 1] -> Remaining will be 0 0 1 


TIME COMP -> O(N) -> for looping through arr + O(N) for looping through temp array for adding 0s. O(N) here for adding 0s because, consider this example,
       arr = [0, 0 , 0 , 0] -> O(N) for looping through this
       temp = [] -> O(N) for looping through this and adding 0s

       So time here is O(2N) which is equal to O(N)

SPACE COMP -> O(N) for extra space for temp
*/

const bruteForce = (arr) => {
  const temp = [];
  for (let ch of arr) {
    if (ch !== 0) {
      temp.push(ch);
    }
  }
  // temp now will be temp = [1,2,3,4,1]
  // Let's take difference of both arrays' length and we get 3. That means 3 0s need to be filled in the temp

  const difference = arr.length - temp.length;
  for (let i = 0; i < difference; i++) {
    // NEVER DO THIS ->  for (let i = 0; i < arr.length - temp.length; i++) <- WHERE CALCULATION for i < is done on fly. This computes the size everytime and returns wrong results
    temp.push(0);
  }
  return temp;
};

console.log("Brute Force", bruteForce([1, 0, 2, 3, 0, 4, 0, 1]));

console.log("-----------------------------------------------");

console.log("APPROACH 2 - Optimal Approach (Two pointer)");

/*
Example 1 - With one 0

consider 2 pointer i and j

0 1 4 5 8         -> should become 1 4 5 8 0

Step 1 -> Take i on first element and j on second. j should be taken where element is non zero. 
          So If second element is 0, j should be taken on 3rd if it is non-zero
i
0 1 4 5 8
  j

Swap elements at i and j, and move i to next element, and move j to next element where it is non zero
  i
1 0 4 5 8
    j

Continue this process until j is out of bounds

Swap el at i and j again, and move i and j to next elements
    i
1 4 0 5 8
      j 
      i
1 4 5 0 8
        j
        i
1 4 5 8 0
          j -> Stop here since j is out of bounds. Or you can choose to stop as i has reached last element 
--------------------------------------------------

Example 2 - With multiple 0s

1 0 0 0 4 0 5 2  -> Expected to be 1 4 5 2 0 0 0 0 

Take i on first element and j on any element from second element where element is non zero
i
1 0 0 0 4 0 5 2 
        j

If i is not 0, move i to next element until you find 0. In simple words, i should be on 0 and j should be on non-0

  i
1 0 0 0 4 0 5 2 
        j

Swap elements at i and j and move i to next 0th element, and j to next non-zeroth element

    i
1 4 0 0 0 0 5 2 
            j

Swap again

      i        
1 4 5 0 0 0 0 2 
              j

Again

        i        
1 4 5 2 0 0 0 0
                j

Done!!        

--------------------------------------------------
Example 3 - With all 0s

i
0 0 0 0 0 
          j

DONE!!

--------------------------------------------------

Example 4 - With all non-0s

1 2 3 5 8

i can't be placed anywhere so return the main array

*/

/*
i
0 1 2 3 4 
  j
*/

const twoPointerWhileLoop = (arr) => {
  let i = -1;
  let j = 1;

  for (let m = 0; m < arr.length; m++) {
    if (arr[m] === 0) {
      i = m;
      break;
    }
  }

  // meaning there are no 0s in the array
  if (i === -1) {
    return arr;
  }

  j = i + 1;

  while (j < arr.length) {
    if (arr[i] === 0 && arr[j] !== 0) {
      [arr[i], arr[j]] = [arr[j], arr[i]]; // this is same as swapping 2 elements in array using temp variable
    }

    while (arr[i] !== 0) {
      i++;
    }

    while (arr[j] === 0) {
      j++;
    }
  }
  return arr;
};

console.log(
  "Two pointer While loop",
  twoPointerWhileLoop([1, 0, 2, 3, 0, 4, 0, 1])
);

const twoPointerForLoop = (arr) => {
  const len = arr.length;
  let leftPtr = -1;

  for (let i = 0; i < len; i++) {
    if (arr[i] === 0) {
      leftPtr = i;
      break;
    }
  }

  if (leftPtr === -1) {
    return arr;
  }

  /*
                lp
    1, 2, 3, 4, 1, 0, 0, 0
                        rp
             lp
    1  2  3  0  4  5  0  0  4                        
                rp 
   */

  for (let rightPtr = leftPtr + 1; rightPtr < len; rightPtr++) {
    // here arr[leftPtr] === 0 check is also not necessary if u carefully observe, but adding just in case
    if (arr[leftPtr] === 0 && arr[rightPtr] !== 0) {
      [arr[leftPtr], arr[rightPtr]] = [arr[rightPtr], arr[leftPtr]];
      leftPtr++;
    }
  }
};

console.log(
  "Two pointer for loop",
  twoPointerForLoop([1, 0, 2, 3, 0, 4, 0, 1])
);
