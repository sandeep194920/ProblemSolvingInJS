/* 
Aggressive Cows 

Problem Statement: You are given an array 'arr' of size 'n' which denotes the position of stalls. You are also given an integer 'k'
which denotes the number of aggressive cows. You are given the task of assigning stalls to 'k' cows such that the minimum distance
between any two of them is the maximum possible. Find the maximum possible minimum distance.


Example 1: Input Format: N = 6, k = 4, arr[] = {0,3,4,7,10,9} 

Result: 3 

*/

/* 
Understand the question

We have some stalls (assume sweet stalls). Say there's a field with boxes containing position numbers like 1, 2, 3 and so on. 
The first sweet stall will be placed in position 1, second in position 2, third in position 4, fourth in 8 and 5th in 9 like this

1 2 4 8 9

Now, we need to place cows near this stall. Will see the details later, but consider this setup. We will have 3 cows and if someone 
asks you to place 3 cow near 3 stalls, and asks you the distance between cows, we can do something like this as an example.


1        2       4       8         9
cow1   cow2    cow3

Now I can calculate the distance between cows. Dist b/w cow1 and 2 will be position 1 (position 2 - position 1). The dist b/w 
cow2 and cow3 will be 4 - 2 which is 2 positions.


Now, why did I explain this simple concept in this great detail? The reason is, I want you to notice that the array must be sorted.
I mean if we assume this setup, the position 2 cannot have 4th stall and position 4 can't have 2nd stall. Why?

1        4       2       8         9
cow1   cow2    cow3

The reason that it can't be unsorted is because, now when you calculate the distance between them now, dist b/w cow1 and cow2 is
position4 - position1 which is 4-1 = 3 which is wrong.

---------------
That's the reason the positions of stalls (array) needs to be sorted
---------------

What does the question demands?

You are given the task of assigning stalls to 'k' cows such that the minimum distance
between any two of them is the maximum possible. Find the maximum possible minimum distance.


In simple words, 
- First place the cows near stalls
- Calculate the distance between each cow
- You have to make sure that the placement of cows will be in such a way that, the min dist b/w them is the maximum possible 
 (so that they won't get furious by seeing very closely placed next cow).
- So basically place cows, calculate distance between each cow. Get the minimum of them. Do such calculations for various placements
and get the maximum of all.

Example

- If I place the cows like this

Distance b/w cows     1      2
Positions         1      2       4       8         9
                  c1     c2      c3 

The distance is 1 and 2 respectively. Minimum between them is 1. -------------> Min is 1

----

- If we place the cows like this


Distance b/w cows        3               5
Positions         1      2       4       8         9
                  c1            c2                c3 

The distance is 3 and 5. The minimum is 3.         -------------> Min is 3

----

- If we place the cows like this


Distance b/w cows             7               1
Positions         1      2       4       8         9
                  c1                     c2        c3 

The distance is 7 and 1. The minimum is 1.   -------------> Min is 3

So far these are the answers we have got (maybe others are also possible, but just for understanding sake consider these 3).

The maximum of the above 3 distances is 3.

-----------------------------------------

So how to approach this?

- One way is to bruteforce all positions like this, and calculate minimums for all. Then return max of all mins.

1      2       4       8        9
c1     c2      c3                         -> Get minimum of this
c1              c2     c3                 -> Get minimum of this
c1                     c2      c3         -> Get minimum of this
       c1      c2      c3 
       c1      c2              c3 
               c1      c2      c3 


Once you find minimum of all this, return maximum of those minimums.

So the meat of this problem is to place the cows like this, and then optimize that using binary search.


For bruteforce, it will be like using isPlacementPossible function with all numbers from min 1 to max arr[last]- first element.

For binary search, we use the same min 1 to max arr[last]- first  but reduce by half each time as the stalls would be sorted.

*/

const isPlacementPossible = (stalls, k, myChosenDistance) => {
  // let first cow be at index 0 which is at first position
  let currentCow = stalls[0],
    cowsPlaced = 1;

  for (let stall = 1; stall < stalls.length; stall++) {
    // check if I can place all the cows at my chosen distance. Remember, 1st cow is placed already at first position already

    if (stalls[stall] - currentCow >= myChosenDistance) {
      currentCow = stalls[stall];
      cowsPlaced++;
      if (cowsPlaced >= k) {
        return true;
      }
    }
  }
  return false;
};

const aggressiveCows = (stalls, k) => {
  stalls.sort((a, b) => a - b);

  let minmDistance = 1,
    maxDistance = stalls.length - 1 - minmDistance;

  let maxPossibleDistance = 1;

  while (minmDistance <= maxDistance) {
    let myChosenDistance =
      minmDistance + Math.floor((maxDistance - minmDistance) / 2);

    if (isPlacementPossible(stalls, k, myChosenDistance)) {
      maxPossibleDistance = myChosenDistance;
      minmDistance = myChosenDistance + 1;
    } else {
      maxDistance = myChosenDistance - 1;
    }
  }
  return maxPossibleDistance;
};

/*
console.log(isPlacementPossible([1, 2, 4, 8, 9], 3, 1)); // This should give us true
console.log(isPlacementPossible([1, 2, 4, 8, 9], 3, 2)); // This should give us true
console.log(isPlacementPossible([1, 2, 4, 8, 9], 3, 3)); // This should give us true
console.log(isPlacementPossible([1, 2, 4, 8, 9], 3, 4)); // This should give us false
console.log(isPlacementPossible([1, 2, 4, 8, 9], 3, 5)); // This should give us false
*/
console.log(aggressiveCows([1, 2, 4, 8, 9], 3));
console.log(aggressiveCows([0, 3, 4, 7, 10, 9], 4));
