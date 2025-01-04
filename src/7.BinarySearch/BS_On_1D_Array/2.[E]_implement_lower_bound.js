/* Implement Lower Bound

Given a sorted array of N integers and an integer x, write a program to find the lower bound of x.

Example 1:
Input Format:
 N = 4, arr[] = {1,2,2,3}, x = 2
Result:
 1
Explanation:
 Index 1 is the smallest index such that arr[1] >= x.

Example 2:
Input Format:
 N = 5, arr[] = {3,5,8,15,19}, x = 9
Result:
 3
Explanation:
 Index 3 is the smallest index such that arr[3] >= x.

*/

/* 
       m
[3, 5, 8, 15, 19]
 l
              h

*/

const findLowerBound = (arr, x) => {
  let l = 0,
    ans,
    h = arr.length - 1;
  while (l <= h) {
    let mid = Math.floor(l + l / 2);
    if (arr[mid] >= x) {
      ans = mid;
      h = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return ans;
};

/* 

Example 2:
Input Format:
 N = 6, arr[] = {3,5,8,9,15,19}, x = 9
Result:
 4


          m   
 0  1  2  3   4   5              
[3, 5, 8, 9, 15, 19]
          l
          h



ans = -1 -> 4

*/
const findUpperBound = (arr, x) => {
  let l = 0,
    ans,
    h = arr.length - 1;
  while (l <= h) {
    let mid = Math.floor(l + l / 2);
    if (arr[mid] >= x) {
      ans = mid;
      h = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return ans;
};
