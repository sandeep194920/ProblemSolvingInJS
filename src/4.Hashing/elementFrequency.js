/*
Example 1:
Input: arr[] = {10,5,10,15,10,5};
Output: 10  3
	 5  2
        15  1
Explanation: 10 occurs 3 times in the array
	      5 occurs 2 times in the array
              15 occurs 1 time in the array

Example2: 
Input: arr[] = {2,2,3,4,4,2};
Output: 2  3
	3  1
        4  2
Explanation: 2 occurs 3 times in the array
	     3 occurs 1 time in the array
             4 occurs 2 time in the array
*/

const findOccurances = (arr) => {
  const frequencies = {};
  // populate frequencies hashmap first
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] in frequencies) {
      frequencies[arr[i]] = frequencies[arr[i]] + 1;
    } else {
      frequencies[arr[i]] = 1;
    }
  }
  for (let ch of arr) {
    console.log(ch, "appears", frequencies[ch], "times");
  }
};

findOccurances([10, 5, 10, 15, 10, 5]);
