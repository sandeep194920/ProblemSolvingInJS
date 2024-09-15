// * Similar to Medium/12.LongestSubarraySumWithK.js First get familiar with that and come back to this
// * In that problem, k was given where we had to give subarray's sum equal to k, & here the max sum must be found out

/* 
Problem: Given an integer array arr, find the contiguous subarray (containing at least one number) which
has the largest sum and returns its sum and prints the subarray.

Example 1:
Input:
 arr = [-2,1,-3,4,-1,2,1,-5,4] 

Output:
 6 

Explanation:
 [4,-1,2,1] has the largest sum = 6. 

Examples 2:
Input:
 arr = [1] 

Output:
 1 

Explanation:
 Array has only one element and which is giving positive sum of 1.
*/

// *Approach 1 - Brute-force - O(N^3) - Similar to the one in problem 12

const approach_1_brute_force = (arr, targetSum) => {
  let maxSum = 0,
    sum;

  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      sum = 0;
      for (let k = i; k <= j; k++) {
        sum += arr[k];
      }
      maxSum = Math.max(sum, maxSum);
    }
  }
  return maxSum;
};

console.log(
  "Approach 1 - Brute - Time O(N^3), Space - O(1)",
  approach_1_brute_force([-2, 1, -3, 4, -1, 2, 1, -5, 4])
);

console.log("--------------------------------------------");

// *Approach 2 - Improved Brute force using sliding window OR Expanded window (not sliding window, see the explanation in last line below) to avoid recalculation everytime.
/*
In the above approach, we need a third inner loop to find the subarray from i to j.
We can eliminate that by using sliding window technique where we add the last element and remove first element to get the result.

WHEN TO USE SLIDING WINDOW ACTUALLY?

The simple answer is when you find yourself repeating traversal from point A to point B everytime from start.

Consider this array

 s                  e
[2, 5, 8, 6, 8, 9, 10]


I will tell you to get every subarray's sum. You will have to add like this

subarrays as follows:
2
2,5
2,5,8
2,5,8,6
2,5,8,6,8

So what you are doing basically is, starting from first element every time and adding until some element which you might have previously done in past iteration.
To avoid this, we use sliding window.

subarray1 = 2
subarray2 = subarray1 + 5
subarray3 = subarray2 + 8
and so on.

That is what we will do now in improved brute approach.

Note: Don't get confused as to why the hell we are not subtracting i in the left as we move forward.
That is because we are not taking a fixed sized sliding window here.

This is the general approach we take even when we want to add up all elements in array like this

for (let i = 0; i < arr.len; i++) {
 sum += arr[i] -> We are doing same thing here. so you could argue this is not sliding window. But I agree, sliding window 
 properly happens when the left side slides as well. The reason I wrote this long description is because I initially thought
 why is this not sliding window as we add the right side element to the sum. It can be called expanded window and not the sliding window may be.
}

*/

const better_brute = (arr) => {
  let sum = 0,
    maxSum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum = 0;
    for (let j = i; j < arr.length; j++) {
      sum += arr[j];
      maxSum = Math.max(sum, maxSum);
    }
  }
  return maxSum;
};

console.log(
  "Approach 2 - Better Brute - Time O(N^2), Space O(1)",
  better_brute([-2, 1, -3, 4, -1, 2, 1, -5, 4])
);

console.log("--------------------------------------------");

// *Approach 3 - Kadane's Algorithm - Time O(N), Space O(1)

/* Kadane's Algorithm

When there are negative elements in the array and when you want to add up to give the maximum sum, then recall this algorithm. 
So, if you see negatives in array, just give it a thought of this algo and see if you are trying to ignore negatives. 

? Intuition behind this algo

 i
[-2, -3, 4, -1, -2, 1, 5, -3]

- We need to get the sum of all elements till end of the array at different positions of i. This is the ask.
- If you carefully observe, this part

 i
[-2 -3  4]

- Initially at i = 0, sum will be -2, hence maxSum will also be -2. As we move i to 1, there is another negative number.
When we add a negative number to a negative number, obviously our total is reducing and is not giving the maximum positive number.
That is the key intuition or idea of this algo. If -ve num is added with a -ve num, then the result will be a lower number compared
to both the added numbers. That is when we have to reset the maxSum to 0, instead of adding -ve sum to maxSum. 

- Let's run through this to better understand

 i
[-2, -3, 4, -1, -2, 1, 5, -3]


sum = 0 -> -2

maxSum = 0

- The sum is -2. Now we have a choice to continue adding next number to this sum, but think for a second. The next number even if it is 
positive or negative, adding -2 will make the next number weaker when compared to not adding it correct?

I mean, say I choose to add this number to -3, the sum then becomes -5 which is less than -3.
Even if the next number was positive, for example 3 instead of -3, if I add -2 + 3, it would have reduced to 1. So if I had not added -2, then I could have got 3 instead of 1 which maximizes the result.
So what I am doing simply here is, I am choosing not to add -ve sum to my next number and instead make sum 0 if sum ever goes -ve.

Why am I doing it? Why am I ignoring -ve numbers?
 - If you think about it, we want subarrays which has maximum sum. So obviously adding -ve number to that subarray makes the subarray weaker, so we
 just choose to drop the negative number and not consider that -ve number at all. We reset sum to 0 which means we are dropping the subarray and making a new subarray from next number.

Let's continue traversing.


                       i
[-2, -3, `4, -1, -2, 1, 5`, -3]
         👆 -> First updated max here as sum was greater than 0. Later it was updated at element 5.

sum = 0 -> -2 (Let's make sum 0 here and not -2) 0 -> -3 (again making 0) 0 -> 4 -> 3 (note that, for a positive number 4, I could add a negative which could result in positive)
-> 1 -> 2 -> 7

maxSum = 4 -> 7

So the subarray is 4, -1, -2, 1, 5 which gave us 7 as maxSum

Again, Kadane's algo is all about ignoring negatives that happened in the past and going forward with positives (0s in the least case).
Which simply means, when you are adding a negative to positve it is fine. But if you are adding a -ve to -ve then that is bad
and hence reset it to 0. Thats it!!
*/

const kadanesAlgo = (arr) => {
  let sum = 0,
    maxSum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];

    maxSum = Math.max(sum, maxSum);
    if (sum < 0) {
      sum = 0;
    }
  }
  return maxSum;
};

const input1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const input2 = [-2, -3, 4, -1, -2, 1, 5, -3];
console.log("Approach 3 - Kadane's Algorithm - Time O(N), Space O(1)");
console.log(input1, kadanesAlgo(input1));
console.log(input2, kadanesAlgo(input2));

console.log("--------------------------------------------");

// What if the interviewer asks to return the subarray (any subarray if there are multiple leading to same maxSum) that gave the maxSum.

/*
 We know that, the subarray starts when the sum starts at 0. So whenever the sum becomes 0, we will start counting number of elements in subarray.
 At very first element, we know the sum will be 0, so we will have our startIndex to be at 0. When sum becomes 0 we update the startIndex as well.

We can track the endIndex by doing start + i.

         i
[-2, -3, 4, -1, -2, 1, 5, -3]

startIndex = 0(at index 0) -> 0(at index 1) -> 2(at index 2) 

endIndex = startIndex + i 

NOTE: startIndex and endIndex are calculated only when we update the maxSum

endIndex = 0 -> 2(at 4) -> 6(at 5) 

sum = 4 -> 3 -> 1 -> 2 -> 7
maxSum = 4 -> 7
*/

const kadanesAlgoWithSubArray = (arr) => {
  let sum = 0,
    maxSum = 0,
    startIndex = -1,
    endIndex = -1;
  for (let i = 0; i < arr.length; i++) {
    if (sum === 0) {
      startIndex = i;
    }
    sum += arr[i];

    // maxSum = Math.max(sum, maxSum); // we do it below in if condition fashion as we also have to track start and end index

    if (sum > maxSum) {
      maxSum = sum;
      endIndex = i;
    }

    if (sum < 0) {
      sum = 0;
    }
  }

  const result = []; // don't consider this as extra space. Just using this to return the subarray. We could have printed this directly here
  for (let j = startIndex; j <= endIndex; j++) {
    result.push(arr[j]);
  }

  return { result, maxSum };
};

// const { result, maxSum } = kadanesAlgoWithSubArray(input1);

// *Interesting thing to notice here. Why do we use `[]` for creating an array in console log? Doesn't the result give back the array itself?
// *The answer is, if we do `console.log(result)` it prints array properly [4,-1,2,1], and if we do additional elements in console log like below it will not give array format, so added it here manually.
console.log(
  `[${kadanesAlgoWithSubArray(input1).result}] subarray gives max sum of ${
    kadanesAlgoWithSubArray(input1).maxSum
  }`
);
console.log(
  `[${kadanesAlgoWithSubArray(input2).result}] subarray gives max sum of ${
    kadanesAlgoWithSubArray(input2).maxSum
  }`
);
