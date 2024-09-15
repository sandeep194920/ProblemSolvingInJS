/*
Example 1:
Input:
 [1,2,4,7,7,5]
Output:
 Second Smallest : 2
	Second Largest : 5
Explanation:
 The elements are as follows 1,2,3,5,7,7 and hence second largest of these is 5 and second smallest is 2

Example 2:
Input:
 [1]
Output:
 Second Smallest : -1
	Second Largest : -1
Explanation:
 Since there is only one element in the array, it is the largest and smallest element present in the array. There is no second largest or second smallest element present.
*/

// The question description says we shouldn't sort the array, so not considering sort approach

/*
max = [2, 1] 
min = [1, 2]

max = [7, 5]
min = [1, 2]
*/

const findSecondSmallestLargest = (arr) => {
  const max = [-Infinity, -Infinity];
  const min = [Infinity, Infinity];

  for (let ch of arr) {
    // LARGEST NUMS CALCULATION
    if (ch > max[0]) {
      max[1] = max[0]; // transferring current first largest to second largest
      max[0] = ch; // making ch as first largest
    } else if (ch > max[1] && ch < max[0]) {
      // for repeated elements we need second condition
      max[1] = ch;
    }
    // SMALLEST NUMS CALCULATION
    if (ch < min[0]) {
      min[1] = min[0];
      min[0] = ch;
    } else if (ch < min[1] && ch > min[0]) {
      min[1] = ch;
    }
  }

  return [
    max[1] === -Infinity ? -1 : max[1],
    min[1] === Infinity ? -1 : min[1],
  ];
};

// Modified Approach - Cleaner way without confusion

const findSecondSmallestLargestModified = (arr) => {
  // let firstLargest = -Infinity;
  // let secondLargest = -Infinity;

  let [firstLargest, secondLargest] = [-Infinity, -Infinity];
  let firstSmallest = Infinity;
  let secondSmallest = Infinity;

  for (let element of arr) {
    // Largest
    if (element > firstLargest) {
      secondLargest = firstLargest;
      firstLargest = element;
    } else if (element > secondLargest && element < firstLargest) {
      secondLargest = element;
    }
    // Smallest
    if (element < firstSmallest) {
      secondSmallest = firstSmallest;
      firstSmallest = element;
    } else if (element > firstSmallest && element < secondSmallest) {
      secondSmallest = element;
    }
  }
  return {
    largest: [firstLargest, secondLargest],
    smallest: [firstSmallest, secondSmallest],
  };
};

console.log(findSecondSmallestLargest([10, 20, 5, 4]));
