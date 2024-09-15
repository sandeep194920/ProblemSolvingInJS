/*
Example 1:
Input:
 N = 5, array[] = {1,2,3,4,5}
Output:
 2,3,4,5,1
Explanation:
 
Since all the elements in array will be shifted 
toward left by one so ‘2’ will now become the 
first index and and ‘1’ which was present at 
first index will be shifted at last.


Example 2:
Input:
 N = 1, array[] = {3}
Output:
 3
Explanation:
 Here only element is present and so 
the element at first index will be shifted to 
last index which is also by the way the first index.
*/

// Approach 1
const usingExtraArray = (arr) => {
  const extraArray = new Array(arr.length);

  //               [1, 2, 3, 4, 5]
  // extraArray -  [2, 3, 4, 5, x]

  for (let i = 1; i < arr.length; i++) {
    extraArray[i - 1] = arr[i];
  }
  extraArray[arr.length - 1] = arr[0];
  return extraArray;
};

console.log(usingExtraArray([1, 2, 3, 4, 5]));
console.log(
  "Time complexity is O(N) and Space complexity is O(N) due to extra array"
);

// Approach 2
const modifyingSameArray = (arr) => {
  const firstElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    arr[i - 1] = arr[i];
  }

  arr[arr.length - 1] = firstElement;
  return arr;
};

console.log(modifyingSameArray([1, 2, 3, 4, 5]));
console.log(
  "Time complexity is O(N) and Space complexity is O(1) due to modifying same array"
);
