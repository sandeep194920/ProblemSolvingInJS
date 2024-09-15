/*
Example 1:
Input:

n = 5,m = 5.
arr1[] = {1,2,3,4,5}  
arr2[] = {2,3,4,4,5}
Output:

 {1,2,3,4,5}

Explanation: 

Common Elements in arr1 and arr2  are:  2,3,4,5
Distnict Elements in arr1 are : 1
Distnict Elemennts in arr2 are : No distinct elements.
Union of arr1 and arr2 is {1,2,3,4,5} 

Example 2:
Input:

n = 10,m = 7.
arr1[] = {1,2,3,4,5,6,7,8,9,10}
arr2[] = {2,3,4,4,5,11,12}
Output:
 {1,2,3,4,5,6,7,8,9,10,11,12}
Explanation:
 
Common Elements in arr1 and arr2  are:  2,3,4,5
Distnict Elements in arr1 are : 1,6,7,8,9,10
Distnict Elemennts in arr2 are : 11,12
Union of arr1 and arr2 is {1,2,3,4,5,6,7,8,9,10,11,12} 
*/

/*
      i
a1 = { c}
a2 = {2,3,4,4,5,11,12}
      j

min(both) -> gives an el. Check if el === current element. If yes move, else add

a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ]

*/

export const unionOfTwoSortedArrays = (a1, a2) => {
  let i = 0;
  let j = 0;
  const arr = [];

  // while loop runs until elements are present in both the arrays.
  // If any one array's traversal is done, the while loop ends even if other array still has elements. This avoids outofbounds error

  while (i < a1.length && j < a2.length) {
    if (a1[i] <= a2[j]) {
      if (arr[arr.length - 1] !== a1[i]) {
        arr.push(a1[i]);
      }
      i++;
    } else if (a2[j] < a1[i]) {
      if (arr[arr.length - 1] !== a2[j]) {
        arr.push(a2[j]);
      }
      j++;
    }
  }

  // If any elements are remaining in either of the arrays

  while (i < a1.length) {
    if (arr[arr.length - 1] !== a1[i]) {
      arr.push(a1[i]);
    }
    i++;
  }

  while (j < a2.length) {
    if (arr[arr.length - 1] !== a2[j]) {
      arr.push(a2[j]);
    }
    j++;
  }

  return arr;
};

/*
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

                                         i
a1= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

                         j
a2= [2, 3, 4, 4, 5, 11, 12];

*/

const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const arr2 = [2, 3, 4, 4, 5, 11, 12];
const union = unionOfTwoSortedArrays(arr1, arr2);
console.log(union);

console.log(new Set([1, 1, 0, 2, 10, 7]));
