// PRE-REQUISITE - src/5.Arrays/Medium/12.LongestSubarraySumWithK.js

/*
Count Subarray sum Equals K

Problem Statement: Given an array of integers and an integer k, return the total number of subarrays whose sum equals k.

A subarray is a contiguous non-empty sequence of elements within an array.


Example 1:
Input Format:
 N = 4, array[] = {3, 1, 2, 4}, k = 6
Result:
 2
Explanation:
 The subarrays that sum up to 6 are [3, 1, 2] and [2, 4].

Example 2:
Input Format:
 N = 3, array[] = {1,2,3}, k = 3
Result:
 2
Explanation:
 The subarrays that sum up to 3 are [1, 2], and [3].
*/

// Similar to 12.LongestSubarraySumWithK.js

// Approach 1 - Optimal for positive nums only

/*
 i
[3, 1, 2, 4]
 j

We start from i 0, j 0. We count sum at that point. If it is equal to k, we update subarray count,
and update i accordingly.

subArrayCount = 1


Now, let's move i and j
    i
[3, 1, 2, 4]
 j

subArrayCount = 1


Example 2

k = 3




          i
[1, 3, 2, 4]
          j


       i
[1, 2, 3, 4]
       j
 i
[3, 1, 1, 1]       
    j
sum = 0 -> 3

numOfSubArrays = 0 -> 1 
*/
// const optimalApproach = (arr) => {
//   let i = 0,
//     j = 0,
//     sum = 0,
//     numberOfSubarrays = 0;

//   while (j < arr.length) {
//     sum += arr[j];

//     if (sum < k) {
//       j++;
//     }
//     if (sum >= k) {
//       while (sum > k && i < j) {
//         sum -= arr[i];
//         i++;
//       }
//       if (sum === k) {
//         numberOfSubarrays += 1;
//       }
//       j++;
//     }
//   }
// };

const optimalApproachForPositiveNumbers = (arr, k) => {
  let i = 0,
    sum = 0,
    numberOfSubarrays = 0;

  // How did I get from while loop to for loop
  /*
  - I identified that, no matter what i have to do j++ increment if sum is < or > or equal to k. That made me replace while with for
  - Next optmization was, I see while was inside if (sum > k) which is not necesary, so I removed it and code automatically became best
  
  */
  for (let j = 0; j < arr.length; j++) {
    sum += arr[j];

    while (sum > k && i < j) {
      sum -= arr[i];
      i++;
    }
    if (sum === k) {
      numberOfSubarrays += 1;
    }
  }
  return numberOfSubarrays;
};

/*
Step 1 --------------------------

sum = 0

numOfSubArrays = 0

hmap = {
0: 1,

}

This is the start where we add 0 to hashmap, so the array is assumed like this with prefix 0
   i
0 [1, 2, 3, -3, 1, 1, 1]
1  

Step 2 --------------------------


Let's start iterating now

sum = 0

numOfSubArrays = 0

hmap = {
0: 1,
1: 1

}

This is the start where we add 0 to hashmap, so the array is assumed like this with prefix 0
   i
0 [1, 2, 3, -3, 1, 1, 1]
1  1

At every element 
- Add every element to sum
- Check if sum - target exists in hmap. If Yes/No add it to hashmap. If yes then that means we have a subarray. 
  Here's the keypoint. In problem 12, we were storing the index in hmap against the sum. But here, we store number of 
  subarrays generated at that particular sum. You will understand as we go.

  When you find sum-target in hmap, get hmap[sum-target] and add that value to numOfSubarrays, which indicates we have  hmap[sum-target]
  number of subarrays until that point
- In this case, 1 - target which is 1 - 3 = -2 does not exist in hmap, so continue iterating.


Step 3 --------------------------



sum = 0 -> 1

numOfSubArrays = 0

hmap = {
0: 1,
1: 1

}

This is the start where we add 0 to hashmap, so the array is assumed like this with prefix 0
   i
0 [1, 2, 3, -3, 1, 1, 1]
1  1

Here I got 3. 3 - 0 is 3. This 0 is in hmap. So basically we are checking if 3-0 in hmap, and if it exists, that means
we get the value of that in hmap which says number of subarrays at that point. So we get 3-0 which is 0 in hmap and its value is 1.
We add this 1 to our num of subarrays. 

numOfSubArrays = 0 -> 1

Step 4 --------------------------

Let's continue


sum = 0 -> 1 -> 3

numOfSubArrays = 0 -> 1

hmap = {
0: 1,
1: 1

}

This is the start where we add 0 to hashmap, so the array is assumed like this with prefix 0
      i
0 [1, 2, 3, -3, 1, 1, 1]
1  1  3

We got to 3, we check 3-3 = 0. 0 is in hmap, and the value of 0 in hmap is 1, so we add that 1 to numOfSubarrays,

and also we add sum 3 to hmap and set its value to 1

hmap = {
0: 1,
1: 1
3: 1
}

continuing....

         i
0 [1, 2, 3, -3, 1, 1, 1]
1  1  3  6

sum = 0 -> 1 -> 3 -> 6

6 - target(3) = 3 -> Exists in the hmap. In hmap, 3's value is 1, so we will add that to numOfSubArrays. At this point 
if you observe and compare numOfSubarrays (which become 2), with actual array we traversed so far, [1, 2, 3] if you observe 
                                                                                                         👆  

at 3, we have 2 sub arrays which add to up to target 3 (1, 2 and then 3 which are 2 subarrays)

numOfSubArrays = 0 -> 1 -> 2

and then we will update the hmap 

hmap = {
0: 1,
1: 1
3: 1 -> 2
}

here the sum - target gives 3 (6 - 3 gives 3). If you observe here, [1,2,3] -> at 2, we get sum 3 (3 - 0) which existed in hmap which became
1 (3:1). Now, at 3, we get (6 - 3) which is again put into hmap. So in simple terms it means that we get 3 twice (once when 3 - 0 and other time when 6 - 3). Both
times we note them up in hmap saying we have 2 subarrays having target and sum difference of 3. This gets us the subarrays properly.


*/

const prefixSumApproach = (arr, k) => {
  let sum = 0,
    numberOfSubarrays = 0;
  const hmap = { 0: 1 };

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];

    const difference = sum - k;

    if (difference in hmap) {
      numberOfSubarrays += hmap[difference];
    }

    hmap[sum] = (hmap[sum] || 0) + 1;
  }
  return numberOfSubarrays;
};

console.log(prefixSumApproach([1, 2, 3, -3, 1, 1, 1], 3)); // expected 6
