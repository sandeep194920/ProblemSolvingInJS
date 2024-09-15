/* 
* Find the Majority Element that occurs more than N/2 times

Example 1:
Input Format
: N = 3, nums[] = {3,2,3}
Result
: 3
Explanation
: When we just count the occurrences of each number and compare with half of the size of the array, you will get 3 for the above solution. 

Example 2:
Input Format:
  N = 7, nums[] = {2,2,1,1,1,2,2}

Result
: 2

Explanation
: After counting the number of times each element appears and comparing it with half of array size, we get 2 as result.

Example 3:
Input Format:
  N = 10, nums[] = {4,4,2,4,3,4,4,3,2,4}

Result
: 4
*/

// Approach 1 - Brute-force

/*
Bruteforce

- i points to each element. The inner loop then loops entire array from 0 to last to find that
element and count. Once all the count is done, if the count is greater than half the array 
and also greater than current max, then update it

          i
[4, 4, 2, 4, 3, 4, 4, 3, 2, 4]
                        j

*/

const testInput1 = [4, 4, 2, 4, 3, 4, 4, 3, 2, 4];
const testInput2 = [2, 2, 1, 1, 1, 2, 2];
const testInput3 = [3, 2, 3];

console.log("Approach 1 - Brute-force - Time O(N^2), Space O(1)");

const bruteForce = (arr) => {
  let maxElement = -1,
    element,
    count;
  for (let i = 0; i < arr.length; i++) {
    // current element is arr[i] and we need to see if current element is
    // greater than arr length / 2 and also greater than max
    element = arr[i];
    count = 0;
    for (let j = 0; j < arr.length; j++) {
      if (element === arr[j]) {
        count += 1;
      }
    }
    // if there are 2 elements who are > arr.length / 2, then `count > maxElement` helps us to give max
    if (count > maxElement && count > arr.length / 2) {
      maxElement = element;
    }
  }
  return maxElement;
};

console.log(testInput1, bruteForce(testInput1));
console.log(testInput2, bruteForce(testInput2));
console.log(testInput3, bruteForce(testInput3));

console.log("----------------------------------------------------");

// Approach 2 - Better approach

console.log("Approach 2 - Better - Time O(N), Space O(N)");

/*

[4,   4,   2,   4,   3,   4,   4,   3,   2,   4]

hashmap = { 4: 6, 2: 2, 3: 2 }

once stored in hashmap, iterate hashmap and get the max out of the values. Return key

Time - O(N) for iterating through array

Space - hashmap O(N) for storage and O(1) for retrieval 

*/

const betterApproach = (arr) => {
  const frequency = {};
  let maxElement = -1;
  for (let el of arr) {
    frequency[el] = (frequency[el] || 0) + 1;
  }

  for (let [key, val] of Object.entries(frequency)) {
    if (val > arr.length / 2) {
      maxElement = Math.max(maxElement, key);
    }
  }
  return maxElement;
};

console.log(testInput1, betterApproach(testInput1));
console.log(testInput2, betterApproach(testInput2));
console.log(testInput3, betterApproach(testInput3));
console.log("----------------------------------------------------");

// Approach 3 - Optimal (Moore's voting algorithm)

/*
This algo is used to find the element that occurs more than arr.length/2 times in O(N)
without consuming extra space, so space would be O(1) 
*/

console.log("Approach 3 - Optimal - Time O(N), Space O(1)");

/*

[4, 4, 2, 4, 3, 4, 4, 3, 2, 4]

- First assume the first element to be the answer blindly. That means we assume first element 4 to be appearing more than arr.len/2 times.
- For this we take a `count` variable and assign it to 1 showing 4 appeared once to begin with. `element` is storing 4

element -> set to -> 4
count -> set to -> 1

- We then iterate the array and where ever we find 4 (initially assumed element), we increment the count, and if we find other element then we decrement count
Let's do it 

       i 
[4, 4, 2, 4, 3, 4, 4, 3, 2, 4]

element = 4
count = 1 -> 2 <- 1 


Just to see the intuition behind this approach, if you take a look above, we just iterated till 2. We traversed 4 4 2.
Count has become 1. For first 4, the count became 1, for second 4 the count became 2, and since third element wasn't 4 
we decremented count from 2 to 1. 

- The idea here is, we assume an element to be the most occurring from start and keep increasing the count if we find that element again
or decrease count if we find other element. Say, at some point, we get count as 0. That means element we assumed is no longer
the highest occurring element. In that case, from next element we consider the next element to be new element and then 
reset the count to 1 and follow the same process of traversal for that new element until count becomes 0. If the new element
has a count greater than 0, that means it potentially has occurred once more than other elements where other elements' occurrance
got cancelled out. Hope you're getting an idea.

- If the count at the end is 0, that means all the elements are appearing equally and there are no elements that appear more than half times of array.
- Say if you get a count of 1, we still are not sure if that is the element that occurred more than arr.length/2 times. For this confirmation, 
we again traverse the whole array just counting how many times that particular element has occurred and if it is greater than arr.len/2 times 
then that element is the answer.

READ THE EXPLANATION AGAIN AND AGAIN so you understand the intuition better!!
*/

/*
Example 1 -> Where 4 is the answer
                            i                           
[4, 1, 2, 4, 3, 4, 4, 3, 4, 4]

element = 4
count = 3


Example 2

                            i                           
[4, 1, 2, 4, 3, 4, 4, 3, 0, 0]

element = 0
count = 2

*/

const mooreAlgo = (arr) => {
  let element = arr[0],
    count = 1;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === element) {
      count++;
    } else {
      count--;
    }
    if (count === 0) {
      element = arr[i];
      count = 1;
    }
  }

  let occurranceCount = 0;
  // check if the element we have got is appearing more than arr.length/2
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === element) {
      occurranceCount += 1;
    }
  }
  return occurranceCount > arr.length / 2 ? element : null;
};

console.log(testInput1, mooreAlgo(testInput1));
console.log(testInput2, mooreAlgo(testInput2));
console.log(testInput3, mooreAlgo(testInput3));
console.log("----------------------------------------------------");
