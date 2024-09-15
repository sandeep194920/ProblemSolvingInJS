/*
Example 1:
Input: N = 7, array[] = {1,2,3,4,5,6,7} , k=2 , right
Output: 6 7 1 2 3 4 5
Explanation: array is rotated to right by 2 position .

Example 2:
Input: N = 6, array[] = {3,7,8,9,10,11} , k=3 , left 
Output: 9 10 11 3 7 8
Explanation: Array is rotated to right by 3 position.
*/

/*
Rotate to right by 1 - Last element by right 1 place
[1,2,3,4,5,6,7]
[7,1,2,3,4,5,6] -> First element rotated to right

Rotate to right by 2
[1,2,3,4,5,6,7]
[7,1,2,3,4,5,6] -> First element rotated to right
[6,7,1,2,3,4,5] -> Second element rotated to right
*/

/*
Rotate to left by 1
[1,2,3,4,5,6,7]
[2,3,4,5,6,7,1] -> First element rotated to left
[3,4,5,6,7,1,2]
*****************************************************************/

// Check the Points to remember for number of approaches.
// We are not doing Brute approach here which is similar to better approrach but without using extra array for shifting

// *APPROACH 1 - Better approach where we take extra space for K elements

// !Left Rotate - Better approach - not using extra array for shifting
const leftRotatedArray = (arr, k) => {
  /*
Original -     1, 2, 3, 4, 5, 6, 7
Modifying original - 3, 4, 5, 6, 7, 6, 7
        arr[i - k] = arr[i]
   i=2  arr[0] = arr[2]
   i=3  arr[1] = arr[3]
   i=4  arr[2] = arr[4]
   i=5  arr[3] = arr[5]
   i=6  arr[4] = arr[6]

1,2

*/
  const kElements = arr.slice(0, k); // Space comp here is O(K) and Time comp is also O(K) for extracting k elements

  for (let i = k; i < arr.length; i++) {
    arr[i - k] = arr[i];
  } // Time comp here is O(n - k) as we are starting for loop from after kth element until end, so in the entire array of n elements, we dont consider k elements

  for (let i = arr.length - k; i < arr.length; i++) {
    arr[i] = kElements[i - (arr.length - k)];
  } // Time comp here is O(k) as we are putting back k elements into the main array

  // Overall time comp is O(K) + O(N - K) + O(K) -> O(N + K)
  // OVerall space comp is O(K) for storing k elements

  return arr;
};

console.log("Left rotated array", leftRotatedArray([1, 2, 3, 4, 5, 6, 7], 2));
console.log("Time - O(N+K), Space - O(K)");

console.log("-------------------------");

// *APPROACH 1 - Better approach where we take extra space for K elements

// !Right Rotate - Better approach - not using extra array for shifting
const rightRotatedArray = (arr, k) => {
  /*
 kElements - 6, 7 -> Space O(K)
 original -  1, 2, 3, 4, 5, 6, 7
 modified -  1, 2, 1, 2, 3, 4, 5
  
 Add K elements -> 6, 7, 1, 2, 3, 4, 5
  */

  // const kElements = arr.slice(arr.length - k, arr.length); -> Same as below line
  const kElements = arr.slice(arr.length - k); // Space comp here is O(K) and Time comp is also O(K) for extracting k elements

  for (let i = arr.length - 1; i >= k; i--) {
    arr[i] = arr[i - k];
  } // Time comp here is O(n - k) as we are starting for loop from after kth element until end, so in the entire array of n elements, we dont consider k elements

  for (let i = 0; i < k; i++) {
    arr[i] = kElements[i];
  } // Time comp here is O(k) as we are putting back k elements into the main array

  // Overall time comp is O(K) + O(N - K) + O(K) -> O(N + K)
  // OVerall space comp is O(K) for storing k elements

  return arr;
};

console.log("Right rotated array", rightRotatedArray([1, 2, 3, 4, 5, 6, 7], 2));
console.log("Time - O(N+K), Space - O(K)");

console.log("-------------------------");

// *APPROACH 2 - We take extra time but, optimize space by reducing O(K) space and making it constant O(1) space
// !This approach is called REVERSAL TECHNIQUE where we reverse the array in place

const leftRotateByReversal = (arr, k) => {
  /*
    original array  -   1, 2, 3, 4, 5, 6, 7
    k = 3
    We can split the array logically until k in place and reverse them for each split. I mean

    ---K---  -Remaining-
    1, 2, 3, 4, 5, 6, 7

    Let's reverse K elements and then reverse remaining elements. It looks like this
    
    ---K---  -Remaining-
    3, 2, 1, 7, 6, 5, 4 

    Now let's reverse entire array

    4, 5, 6, 7, 1, 2, 3 -> This is perfectly left rotated now

    Summary - We did reverse 3 times to get back left rotated array to avoid extra space
    reverse from 0th index until kth index -> reverse(0, k-1)
    reverse from kth index until last index -> reverse(k, arr.length-1)
    reverse from 0 to last to get back left rotated array -> reverse(0, arr.length-1)
  */
  //   reverseArray(arr, 0, k - 1);
  //   console.log("Reversed first part", arr);
  reverseArray(arr, 0, k - 1);
  reverseArray(arr, k);
  reverseArray(arr);
  return arr;
};

const reverseArray = (arr, startIndex = 0, endIndex = arr.length - 1) => {
  if (startIndex >= endIndex) return arr;
  if (endIndex > arr.length - 1) endIndex = arr.length - 1;

  for (let i = startIndex; i <= Math.floor((startIndex + endIndex) / 2); i++) {
    const temp = arr[i];
    arr[i] = arr[endIndex - (i - startIndex)];
    arr[endIndex - (i - startIndex)] = temp;
  }
  return arr;
};

console.log("Reverse array", reverseArray([1, 2, 3, 4, 5], 2, 4));

// const leftRotated = leftRotateByReversal([1, 2, 3, 4, 5, 6, 7], 2);
// console.log("Left rotated array by reversal", leftRotated);

/*************************************************************************************************
//* POINTS TO REMEMBER

- There are 3 approaches to this problem

    But before that, WE CAN OPTIMIZE NUMBER OF ROTATIONS (K). Remember if we rotate array of 7 elements by 7 places (k=7), we get back same array. If we have k = 8 that means, 
    it is same as having k = 7 + 1 (where we get back same array for 7 and then 1 place rotation), so (k = 8) == (k = 1)
    This optimizes the number of rotations (K).

    That is by doing k = k % arr.length
    If k = 20, array length is 7, that means we have to do 20%7 which is equal to 6 rotations, so k will be 6 which is now optimized

    1. Brute force -> Extra array to store k elements + Extra array for storing shifting values 
       
       Time complexity - O(k) -> to extract K array + O(n-k) for shifting + O(k) to put back k elements
                       -> That gives time comp O(k + n-k + k) = O(n+k)

       Space complexity - O(k) for storing k elements + O(n) for storing new array
                       -> That gives space comp O(n+k)


    2. Improvised -> Extra array to store k elements + No extra space for storing array as we are doing it in same array
       
       Time complexity - Same as Bruteforce - O(n+k)
       Space complexity - O(k) for storing k elements

    3. Optimal -> Can we do it in O(1) space complexity with slightly increased time

       Yes, by using reversal technique

*************************************************************************************************/
