// Given arr [1, 2, 3], find all the permutations

/*
It will be 3! which is 6 permutations

123
213
312
132
231
321
*/

// Approach 1

const ans = [];
function findPermutations(ind, ds, frequency, inputArr) {
  //BC
  if (ind === inputArr.length) {
    ans.push([...ds]);
    return;
  }

  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i] in frequency) continue;

    ds.push(inputArr[i]);
    frequency[inputArr[i]] = (frequency[inputArr[i]] || 0) + 1;
    findPermutations(ind + 1, ds, frequency, inputArr);
    frequency[inputArr[i]] -= 1;
    if (frequency[inputArr[i]] === 0) {
      delete frequency[inputArr[i]];
    }
    ds.pop();
  }
}

// findPermutations(0, [], {}, [1, 2, 3]);

// console.log(ans);

// ------------------------------------------------------------------------------------------------------------

/*
In the above approach (Approach 1)

Time Comp - O(n! x n)
   
  - n! for recursion of n elements (more recursive calls happen than n! (often due to backtracking steps), but the unique 
   results produced still correspond to n! )
 
Space Comp - O(n) + O(n) + O(n) = O(n)

O(n) for auxiliary array
O(n) for frequency hashmap

O(n) for recursion stack
O(n!) for returning the answer

In the below approach, let's reduce auxiliary array and frequency hashmap by using inplace swapping

*/

// Approach 2 - In-place swapping - The intuition is, every element should be at every position. Hence we swap

const array = [1, 2, 3];
const answer = [];

function permutationsInPlaceSwap(ind) {
  if (ind === array.length) {
    answer.push([...array]);
    return;
  }

  for (let i = ind; i < array.length; i++) {
    [array[ind], array[i]] = [array[i], array[ind]];
    permutationsInPlaceSwap(ind + 1);
    [array[ind], array[i]] = [array[i], array[ind]];
  }
}
permutationsInPlaceSwap(0);
console.log(answer);

/*
Approach 2 complexities

Time comp - O(n! x n) -> Similar to above approach where
 O(n!) is to generate number of recursions
 n is to loop for each position in array 

 So everytime, we did n! permutations at each index


Space comp - O(n) + O(n!)

This time, there's no extra space used for any data structure like aux array and hmap.

We just use O(n) for recursive call stack which every problem mostly has in recursion, plus n! space to return the answer like



n! space below is shown which is 3! for array [1,2,3]
[[ 1, 2, 3 ],
  [ 1, 3, 2 ],
  [ 2, 1, 3 ],
  [ 2, 3, 1 ],
  [ 3, 2, 1 ],
  [ 3, 1, 2 ]]


*/
