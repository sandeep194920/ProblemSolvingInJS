/*
Next Permutation - find next lexicographically greater permutation

Given an array Arr[] of integers, rearrange the numbers of the given array into the lexicographically next greater permutation of numbers.

If such an arrangement is not possible, it must rearrange to the lowest possible order (i.e., sorted in ascending order).

Input format:
 Arr[] = {1,3,2}
Output
: Arr[] = {2,1,3}
Explanation: 
All permutations of {1,2,3} are {{1,2,3} , {1,3,2}, {2,1,3} , {2,3,1} , {3,1,2} , {3,2,1}}. So, the next permutation just after {1,3,2} is {2,1,3}.


Example 2 

arr =    [ 2 1 5 4 3 0 0 ]

output = [ 2 3 0 0 1 4 5 ]
 */

/*
What is next permutation. Simple, if you have 123, then the immediate next combination that is
higher than 123 is 132. That's what you have to find.
*/

// APPROACH 1 - Brute Force using recursion

/*
- We could do this using recursion where we find all the possible permutations. For example
Input = [1,2,3]

- There are 3 numbers in the array so it would be 3! = 6 combinations 

- Combinations arranged in ascending order 

[1, 2, 3]
[1, 3, 2]
[2, 1, 3]
[2, 3, 1]
[3, 1, 2]
[3, 2, 1]

Note: To find these combinations using recursion itself is solved in one of the future problems. Look at any video for this, and not solving here.


- Once we find all the combinations, we return the given input's next combination. In this case we return [1,3,2] which occurs after [1,2,3].

- What if the given input is [3,2,1]. In that case there is no next combination so we return [1,2,3] which occurs at the beginning.
*/

// APPROACH 2 - Optimal

/*

Watch - https://www.youtube.com/watch?v=JDOXKqF60RQ&ab_channel=takeUforward


-------------INTUITION--------------->

Consider this input 

Input   ->  [5 2 0 0 0 0 2 4]

If you carefully observe, the next big number you get is by swapping last 2. 

Next big number ->  [5 2 0 0 0 0 4 2]

But in case, if the input was [5 2 0 0 0 0 4 2] then there is no next big number. 2  4 (increasing order at certain point in input) 
allowed us to swap them to get next big number.


But should we swap the next occurring numbers(consecutive numbers) always? No! Observe this modified input.


Input   ->  [5 2 0 0 0 0 2 0 4]

The next big number is 

Output -> [5 2 0 0 0 0 4 0 2]   -> Notice, 2 0 4 was made 4 0 2 where 2 and 4 was swapped which are not next to each other. 402 is next big number than 204.

<-------------INTUITION---------------


STEPS:

Consider this input 

Index          0  1  2  3  4  5                
Input    ->   [2  1  5  4  3  0 ]

1. Look at the array from the end. When you look at index 5 which is element 0, there is no other element on right of it to compare 
if element 0 is greater or not. So we always have to start at last but 1 index (Index 4, element 3 in this case)



Index          0  1  2  3  4  5                
Input    ->   [2  1  5  4  3  0 ]
                          👆

2. Now compare 3 with 0. Array looks like this [...., 3, 0] which is 30. If you swap 0 and 3, it becomes 03 which is less than 30.
So 3 0 is already higest, so don't do anything. Just continue. Continue until you find an element that is greater than it's left element.

Index          0  1  2  3  4  5                
Input    ->   [2  1  5  4  3  0 ]
                        👆

Same here, 4 > 3, so can't swap. If you take a look, 430 is already highest. The combinations at this point could be
4 3 0 (existing one)
3 4 0 (smaller than 430)
0 3 4 (smaller than 430)
4 0 3 (smaller than 430)
0 4 3 (smaller than 430)
3 0 4 (smaller than 430)

So as I said, the increasing order would not work, we need to find a point where left element must be less than right element.

Let's continue.

Index          0  1  2  3  4  5                
Input    ->   [2  1  5  4  3  0 ]
                     👆

Same!

Index          0  1  2  3  4  5                
Input    ->   [2  1  5  4  3  0 ]
                  👆

3. Found an element less than it's right side. Now among 5 4 3 0, we have 5 4 3 elements greater than 1, and 0 less than 1. So 
think about it. If we swap 1 with 0, the result becomes less than 21543. So we don't do that. I mean

2 1 5 4 3 0
Swapping 1 with 0
2 0 5 4 3 1 -> Less than 2 1 5 4 3 0

So we need to find a number greater than 0 to swap with 1. The possible numbers are 5 4 and 3

Swapping 5 looks like this
2 1 5 4 3 0
2 5 1 4 3 0

Swapping 4 looks like this 
2 1 5 4 3 0
2 4 5 1 3 0

Swapping 3 looks like this
2 1 5 4 3 0
2 3 5 4 1 0

The closest among [2 5 1 4 3 0], [2 4 5 1 3 0], [2 3 5 4 1 0] is 2 3 5 4 1 0 where 3 is swapped. So the key take away is
swap 1 with the element which is higher than 1 but also closest to 1. 3 is such number.

4. To find such number to swap, iterate from right and when you find the first number that is greater than 1, we swap it with 1.
So it becomes this.

                  
Index          0  1  2  3  4  5                
Input    ->   [2  1  5  4  3  0 ]
                  👆

Swapped  ->   [2  3  5  4  1  0 ]

5. Now once you have swapped it, if you carefully look, 2  3  5  4  1  0  is not the immediate highest number. We need to arrange 
right side numbers in ascending order 

Swapped                ->   [2  3  5  4  1  0 ]
                                👆
Rearranged in Ascending ->  [2  3  0  1  4  5]

This is what we need to return. Hope it's clear.



6. Edge case

What if array has all decreasing elements already? Example [5 4 3 2 1 0]

- In this case, we don't find a dip, so there's no number higher than current element. It is the last element in the permutation.
- In that case we can swap the numbers and return that. That would be the first element in permuation. I mean we can return [0 1 2 3 4 5]

SUMMARY OF STEPS:

1. Iterate from last but one element from right side and find a point that dips.
   2. In that point, swap the elements with right side's closest highest number.
   3. Arrange elements in ascending order from the point of swap to its right side.

4. If we don't find the dip then we can just swap all the elements in ascending order and return that.

THATS IT!

*/

const optimalApproach = (arr) => {
  let dipIndex = 0; // first element

  for (let i = arr.length - 2; i >= 0; i--) {
    if (arr[i] < arr[i + 1]) {
      dipIndex = i;
      break;
    }
  }

  // if dip index is not 0, meaning there was a dip
  // find the closest higher element than the dip index element and swap it with dip element

  for (let i = arr.length - 1; i >= dipIndex; i--) {
    // this is the very first element that would be highest and we stop there, because we know it is already closest due to its arrangement in ascending order to the left side.
    if (arr[dipIndex] < arr[i]) {
      [arr[dipIndex], arr[i]] = [arr[i], arr[dipIndex]];
      break;
    }
  }

  // Now that we might have properly swapped dipIndex with closest higer element, let's now sort elements to the right side of dipIndex
  const subArraySorted = arr.slice(dipIndex + 1);
  subArraySorted.sort();

  arr.splice(dipIndex + 1, subArraySorted.length, ...subArraySorted);

  return arr;
};

const input1 = [2, 1, 5, 4, 3, 0];

console.log("[2, 1, 5, 4, 3, 0]", optimalApproach(input1));
