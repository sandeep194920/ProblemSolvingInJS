// Longest Consecutive Sequence in an Array

/*
Problem Statement: You are given an array of ‘N’ integers. You need to find the length of the longest sequence which contains the consecutive elements.

Example 1:

Input:
 [100, 200, 1, 3, 2, 4]

Output:
 4

Explanation:
 The longest consecutive subsequence is 1, 2, 3, and 4.


Example 2:

Input:
 [3, 8, 5, 7, 6]

Output:
 4

Explanation:
 The longest consecutive subsequence is 5, 6, 7, and 8.

*/

// Approach 1 - Bruteforce - Time O(N^2) approx, Space O(1)

/*
The very strong point here is "consecutive". Meaning, the array can contain continuos numbers in difference of 1s. So based
on that, if we come across a number while traversing, we can check if next number exist. 

Note: Writing code can feel slightly complicated initially

  i
[100, 99, 101, 2, 3, 1, 4]
      j

place i = 100 (first element)
  - Check from index 0 itself that, if next number x which is x = a[i]+1 = 101 exists in array. You can use while loop for this
    - If number is found
      - Increase the count 
      - update the maxLength     
      - Increase the number to next number. This means the search has to start again from the beginning of array but i should not change.
        This is the reason we need while loop inside the for. With for, we can't control the inner loop running multiple times.

*/

const brute = (arr) => {
  if (!arr.length) return 0;
  let maxLength = 1,
    count,
    numToBeFound;

  for (let i = 0; i < arr.length; i++) {
    /*
          i
      0   1    2   3  4  5  6               arr length -> 7
    [100, 99, 102, 2, 3, 1, 4]
      j
    */
    count = 1; // 1 -> 2
    maxLength = Math.max(count, maxLength); // 1 -> 2
    numToBeFound = arr[i] + 1; // 101
    let j = 0; // 7

    while (j < arr.length) {
      if (arr[j] === numToBeFound) {
        count += 1;
        maxLength = Math.max(count, maxLength);
        numToBeFound++;
        j = 0;
      } else {
        j++;
      }
    }
  }
  return maxLength;
};

const input1 = [100, 200, 1, 3, 2, 4];
const input2 = [3, 8, 5, 7, 6, 9];
const input3 = [100, 200, 1, 1, 3, 3, 2, 4, 4];

console.log("Approach 1 - ", input1, brute(input1));
console.log("Approach 1 - ", input2, brute(input2));
console.log("Approach 1 - ", input3, brute(input3));

console.log("----------------------------------");

// Approach 2 - Better approach through Sorting - Time O(N + NLogN) - Space O(1)

/*

Let's sort this
[100, 99, 101, 2, 3, 1, 4]

and it will become 
 
                                i
       0  1  2  3   4   5    6
-Inf  [1, 2, 3, 4, 99, 100, 101]


Assume lastNum = -Inf -> 1 -> 2 -> 3 -> 4 -> 99 -> 100 -> 101
count = 1 -> 2 -> 3 -> 4 -> 1 -> 2 -> 3
maxLen = 1 -> 2 -> 3 -> 4

let's start for loop

for :
  is currenNum === lastNum + 1
    Yes:
     count+=1
     maxLength update
    No:
     count = 1
  lastNum = currentNum

*/

const sortApproach = (arr) => {
  if (!arr.length) return 0;

  // arr.sort(); // This is wrong, as it gives us [ 1, 100, 2, 200, 3, 4 ]
  arr = arr.sort((a, b) => a - b); // this is correct. It gives us [ 1, 2, 3, 4, 100, 200 ]

  let maxLength = 1,
    count = 1,
    lastNum = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    let currentNum = arr[i];
    if (currentNum === lastNum) continue; // this depends on interviewer. Ask what he would like to see with repeated numbers (see input 3)
    if (currentNum === lastNum + 1) {
      count += 1;
      maxLength = Math.max(maxLength, count);
    } else {
      count = 1;
    }
    lastNum = currentNum;
  }
  return maxLength;
};

console.log("Approach 2 - ", input1, sortApproach(input1));
console.log("Approach 2 - ", input2, sortApproach(input2));
console.log("Approach 2 - ", input3, sortApproach(input3));

console.log("----------------------------------");

// Approach 3 - Optimal - Time O(N), Space O(N)

/*

[100, 99, 101, 2, 3, 1, 4]

- Let's recall what we did in Brute-force

If we had [100, 99, 101, 102, 103, 104] 

At 100, we checked if we had 101, 102 and so on...
At 99, we checked if we had 100, 101, 102 and so on...
At 101, we checked if we had 102 and so on.


If you carefully observe, we are repeating the checking of further elements everytime.
I mean, standing at 100, you did the check for     101, 102, 103, 104
Again, you stand at 99, and did the check for 100, 101, 102, 103, 104
....
                                                   
which took a lot of time. Hence the time complexity increased to O(N^2). For each element, you ran the loop again and again for checking 
same set of next elements.


Optimal approach - We can get to optimal approach by using our brain a little bit based on the above observation.

Say, we are at 100 -> other elements would be -> 99, 101, 102, 103, 104

Instead of checking for 101, 102 and so on, we should check for number - 1. That is, if we are at 100, we should check if
99 exists in the array. If it does, then we just move to next element (increase i). Why?

Because, we do the check like 99 -> 100 -> 101 -> 102 -> 103 -> 104 only when we are at 99 and not at any other element. Meaning
when we don't have an element less than that, for example, when we are at 99, we check if 98 exists, if not that means
99 is the start of the sequence. Now we can check until 104 and take the count. 
 But if we are at any other element like 101, we check if 100 exist, if it does then we believe the check for longest happens at lower element, may be at 100 or less.

This way, we only check for longer sequence only when we are at start of sequence and not at the middle of the sequence. 

- The logic looks something like this

  i 
[100, 99, 101, 2, 3, 1, 4]

- We are at 100, and we check if 99 exists. For this if we take another pointer like j to do this check then it would increase the time comp.
So we can first take a hashmap and run through the array and store all the elements. The lookup from hashmap will be o(1) so we do this.

hmap = {
    100: true,
    99 : true,
    101 : true,
    2 : true,
    3 : true,
    1 : true,
    4 : true
}

- Now the lookup would be o(1)

- We are at 100, we check if 99 exists in hmap. If it does then I just move my i further.

       i 
[100, 99, 101, 2, 3, 1, 4]

- Now at 99 I check if 98 exists in hmap. It doesn't. So I will do the traversal of array from 99 using hmap. 

- At this point, I get maxLen as 3 (99, 100, 101).
-  I move my i further

           i 
[100, 99, 101, 2, 3, 1, 4]

- 100 is in hmap so I just move 

               i 
[100, 99, 101, 2, 3, 1, 4]

- 1 exists in hmap so move

                     i 
[100, 99, 101, 2, 3, 1, 4]

- 2 exists in hmap so move

                     i 
[100, 99, 101, 2, 3, 1, 4]

- 0 doesn't exist in hmap so I'll count from 1. 
  Check if 2 exists, increment count and update maxLen 
  Check if 3 exists, increment count and update maxLen 
  Check if 4 exists, increment count and update maxLen 

Whenever we find an element whose previous element doesn't exist then only we do the lookup. This reduces time comp greatly,
at almost O(N)
*/

const optimalApproach = (arr) => {
  if (!arr.length) return 0;
  const hashmap = {};

  let maxLength = 1;

  // populate hashmap for o(1) lookup time
  for (let i = 0; i < arr.length; i++) {
    hashmap[arr[i]] = true;
  }

  /*
          i 
   [5, 3, 1, 2, 100, 101]
  
  */

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] - 1 in hashmap) continue;

    let curElement = arr[i];
    let count = 1;
    while (curElement + 1 in hashmap) {
      curElement += 1;
      count++;
      maxLength = Math.max(maxLength, count);
    }
  }
  return maxLength;
};

console.log("Approach 3 - ", input1, optimalApproach(input1));
console.log("Approach 3 - ", input2, optimalApproach(input2));
console.log("Approach 3 - ", input3, optimalApproach(input3));

console.log("----------------------------------");
