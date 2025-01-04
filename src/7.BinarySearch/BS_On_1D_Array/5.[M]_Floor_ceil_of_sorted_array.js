/* 
Floor and Ceil in Sorted Array

Problem Statement: You're given a sorted array arr of n integers and an integer x. Find the floor and ceiling of x in arr[0..n-1].
The floor of x is the largest element in the array which is smaller than or equal to x.
The ceiling of x is the smallest element in the array greater than or equal to x.

Example 1:
Input Format: n = 6, arr[] ={3, 4, 4, 7, 8, 10}, x= 5
Result: 4 7
Explanation: The floor of 5 in the array is 4, and the ceiling of 5 in the array is 7.

Example 2:
Input Format: n = 6, arr[] ={3, 4, 4, 7, 8, 10}, x= 8
Result: 8 8
Explanation: The floor of 8 in the array is 8, and the ceiling of 8 in the array is also 8.

*/

/* 

x = 5


             m
 0   1   2   3   4    5
[3,  4,  4,  7,  8,  10]
             l       
         h

floor = 4

ceil = 8 -> 7

mid = 4 -> 8 -> 7


if(a[mid] < x) 
  floor = arr[mid]
  l = mid + 1
  

else if(a[mid] > x)
  ceil = arr[mid]
  h = mid - 1
  
else
  return a[mid], a[mid]

*/

const findMid = (arr, x) => {
  let low = 0,
    high = arr.length - 1,
    // the reason we take floor and ceil as -1 because if the target is less than first element
    // or greater than last element, then we give floor and ceil -1 respectively as there's no element
    // floor/ceil of element. Say if target/x is 2 in our case, then floor should be -1 as the first element is 3 which is greater than x.
    floor = -1,
    ceil = -1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] < x) {
      floor = arr[mid];
      low = mid + 1;
    } else if (arr[mid] > x) {
      ceil = arr[mid];
      high = mid - 1;
    } else {
      return [arr[mid], arr[mid]];
    }
  }
  return [floor, ceil];
};

console.log(findMid([3, 4, 4, 7, 8, 10], 5));
