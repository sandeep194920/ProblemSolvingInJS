/*

Example 1:
Input Format: arr[] = {1,2,4,7}, x = 6
Result: 3
Explanation: 6 is not present in the array. So, if we will insert 6 in the 3rd index(0-based indexing), the array will still be sorted. {1,2,4,6,7}.

Example 2:
Input Format: arr[] = {1,2,4,7}, x = 2
Result: 1
Explanation: 2 is present in the array and so we will return its index i.e. 1.


*/

/* 


Example 1 

x = 6


             m
 0   1   2   3    
[1,  2,  4,  7]
             l
         h


Example 2

x = 3


 0   1   2   3     
     m
[1,  2,  4,  7]
 l
             h


Example 3

x = 2           

 0   1   2   3 
 m
[1,  3,  5,  6]
 l
          h           



*/
// Without using extra variable for result.
const findInsertPosition = (arr, x) => {
  let l = 0,
    h = arr.length - 1;

  while (l <= h) {
    let mid = Math.floor((l + h) / 2);
    if (x === arr[mid]) {
      return mid;
    } else if (x > arr[mid]) {
      l = mid + 1;
    } else {
      h = mid - 1;
    }
  }
  return l;
};

// using extra variable for result
const findInsertPositionwithResult = (arr, x) => {
  let l = 0,
    answer = 0,
    h = arr.length - 1;

  while (l <= h) {
    let mid = Math.floor((l + h) / 2);
    if (x === arr[mid]) {
      return mid;
    } else if (x >= arr[mid]) {
      l = mid + 1;
    } else {
      answer = mid;
      h = mid - 1;
    }
  }
  return answer;
};

console.log(findInsertPosition([1, 2, 4, 7], 6));
console.log(findInsertPositionwithResult([1, 2, 4, 7], 6));
