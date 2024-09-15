/*
 Input:
 nums = [2,0,2,1,1,0]
Output : [0,0,1,1,2,2]

Input:
 nums = [2,0,1]
Output:
 [0,1,2]

Input:
 nums = [0]
Output:
*/

// APPROACH 1 - Sorting - Time O(N Log N), Space O(N)

// We can use merge sort to get O(N log N) time, but for now, let's use built-in sort function

console.log("Approach 1 - Sorting - Time O(N LogN) Space O(N)  ");

const sortingApproach = (arr) => {
  return arr.sort();
};

const sortedUsingSort = sortingApproach([0, 1, 0, 2, 0, 2, 1, 0]);
console.log(sortedUsingSort);

console.log("----------------------------------------------------");

// Approach 2 - Better approach using hashmap

console.log(
  "Approach 2 - Using hashmap - Time O(2N), Space O(1)-> as we do replace elemenets in same array"
);

const hashmapApproach = (arr) => {
  const frequency = {};
  // Time taken here is O(N)
  for (let ch of arr) {
    frequency[ch] = (frequency[ch] || 0) + 1;
  }

  const resultArray = [];
  // Time taken here is O(N*3) or O(N+N+N) which is O(N) -> Explained below
  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j < frequency[i]; j++) {
      resultArray.push(i);
    }
  }

  // Overall time comp - O(N + N) = O(2N)
  return resultArray;
};

const sortedUsingHash = hashmapApproach([0, 1, 0, 2, 0, 2, 1, 0]);
console.log(sortedUsingHash);

/*
Time complexity here would not be O(N^2) as we are using nested for-loop. Rather, it would be O(N) because it is O(N * 3). Meaning 
we are running for loop for 0, 1, and 2 that's all. We could have manually done it like this instead of nested for loop

for(let i = 0; i < frequency[0]; i++){} // Gives you O(N)
for(let i = 0; i < frequency[1]; i++){} // Gives you O(N)
for(let i = 0; i < frequency[2]; i++){} // Gives you O(N)

So overall, it is O(N+N+N) or O(N * 3) which is O(N)

This is what we are doing where we simplify it by doing 
for (let i = 0; i <= 2; i++) {
    for (let j = 0; j < frequency[i]; j++) {
        resultArray.push(i);
    }
}

*/
console.log("----------------------------------------------------");

// Approach 3 - Dutch National Flag Algorithm
// BEST Video for this - https://www.youtube.com/watch?v=6sMssUHgaBs

console.log("Approach 3 - Dutch National Flag Algorithm");

/*
Say we have 3 people (guards) who wants to put all the people in line into correct position. Let's think of these people in array 
are short people (lilliputs). They can be of height 0, 1 and 2 centimeters. 

The 3 guards are tall and gigantic, and their goal is to throw these lilliputs into right position.

z -> Guard standing at start where he takes care of zero height people. His goal is to get all the zero people near him.
o -> Guard standing at start as well where he takes care of 1 height people. His goal is to help zeroth guard get all 0 people to left so that 1 height can go to center
t - Guard standing at end or 2's position where he takes care of 2 height. His goal is to get all the 2 height people near him.


 o           
[2,  0,  2,  1,  1,  0,  1,  0,  1,  0]
 z                                   t


Once you imaging the above scenario, let's proceed.


 o           
[2,  0,  2,  1,  1,  0,  1,  0,  1,  0]
 z                                   t

 - When a zero guard (z) see's 2, his job is to throw that 2 to the right end, and get whatever element is present in last place at end pointer to z's location.
  After doing this, t will now have the 2 which is given by z pointer. So the right-end element should be good, so we will move right pointer t to left one position. 
  It now looks like this
 
 o           
[0,  0,  2,  1,  1,  0,  1,  0,  1,  2]
 z                               t

- Again check if left element, z is 0. Our motive is to get left pointer, z as 0 and then only move it to right. 
If we get a 2 at z, we swap it with last element and move last element t to left, as we did it above. 
If we get a 1 at z, we leave the z there itself but move the o pointer further.

- Now in our example, the z is 0 so lets move that to right which means that, the left most element/s (lesser than z) are sorted.
Along with z, we move o as well, as we know that o is not near 1 which it is looking for. 

     o           
[0,  0,  2,  1,  1,  0,  1,  0,  1,  2]
     z                           t

- Let's continue this further. We again check if left (z) has 0 and if it does we just move it to right further along with o.

         o           
[0,  0,  2,  1,  1,  0,  1,  0,  1,  2]
         z                       t

- Now we got a 2 at z. Let's swap it with t

         o           
[0,  0,  1,  1,  1,  0,  1,  0,  2,  2]
         z                       t

- Now we can move t to left. Also, since z has not got a 0 yet it remains there itself. Notice that o is at 1, so we just move 
o further until we find a 0 or 1. If we find a 0, we swap it with z and then move z to 1 right. If we find a 2 then we swap it with 
right t and move t to one left. It looks like this now


             o           
[0,  0,  1,  1,  1,  0,  1,  0,  2,  2]
         z                       t


                 o           
[0,  0,  1,  1,  1,  0,  1,  0,  2,  2]
         z                       t


                     o           
[0,  0,  1,  1,  1,  0,  1,  0,  2,  2]
         z                       t


Now at o we have a 0, so let's swap that with z and move z to 1 right.


                     o           
[0,  0,  0,  1,  1,  1,  1,  0,  2,  2]
             z                   t


Kind of we are getting an idea now. Let's continue.... We will now have to move o to right as it is on 1.

                         o           
[0,  0,  0,  1,  1,  1,  1,  0,  2,  2]
             z                   t


                             o           
[0,  0,  0,  1,  1,  1,  1,  0,  2,  2]
             z                   t
             

- Now o is at 0, so we have to swap it with left z and move z to 1 right

                             o           
[0,  0,  0,  0,  1,  1,  1,  1,  2,  2]
                 z               t
             
- We move o to right as it is on 1

                                 o           
[0,  0,  0,  0,  1,  1,  1,  1,  2,  2]
                 z               t
            
- Now look, o and t are both at same location. If they both are at same location or crossed each other, that indicates we have
successfully swapped all the elements and all elements are at the right position, so we exit the loop. 


-------------------------------
Example 2

- Take another example where 2 comes in the path when we are moving o to right, so let's make sure if it changes anything.

Step 1 - Move pointers as we did above

 o           
[2,  0,  2,  1,  2,  0,  1,  0,  1,  0]
 z                                   t

It will look like these traversals at some point.

         o           
[0,  0,  1,  1,  2,  0,  1,  0,  2,  2]
         z                       t

             o           
[0,  0,  1,  1,  2,  0,  1,  0,  2,  2]
         z                       t

                 o           
[0,  0,  1,  1,  2,  0,  1,  0,  2,  2]
         z                       t

Step 2 

This is the point where I had to explain. In previous example, at this point o was pointing to 0 where we swapped it with left
element z and moved z to right. In here, we now do the opposite with a slight change. Since we found a 2 at o, we swap it with t - 1 element and move 
t to left

So this 
                 o           
[0,  0,  1,  1,  2,  0,  1,  0,  2,  2]
         z                       t

becomes 

                 o           👇 
[0,  0,  1,  1,  0,  0,  1,  2,  2,  2]
         z                   t

Now o is at 0, we swap it with z and move z to right

                 o           
[0,  0,  0,  1,  1,  0,  1,  2,  2,  2]
             z               t

                     o            
[0,  0,  1,  1,  1,  0,  1,  2,  2,  2]
         z                   t

                             o -> Exit here           
[0,  0,  0,  1,  1,  1,  1,  2,  2,  2]
             z               t

Let's code this now

*/

const dutchNationalFlagApproach = (arr) => {
  let z = 0,
    o = 0,
    t = arr.length - 1;

  // while(o < t || arr[z] !== 0){

  // }

  while (o < t || arr[z] > arr[o]) {
    if (arr[z] === 0) {
      z++;
      o++;
    } else if (arr[z] === 1) {
      if (arr[o] === 1) {
        o++;
      }

      if (arr[o] === 0) {
        [arr[o], arr[z]] = [arr[z], arr[o]];
        z++;
      }

      if (arr[o] === 2) {
        [arr[o], arr[t]] = [arr[t], arr[o]];
        t--;
      }
    } // or just else should be fine
    else if (arr[z] === 2) {
      [arr[z], arr[t]] = [arr[t], arr[z]];
      t--;
    }
  }
  return arr;
};

// Example 1 - On the way of o, we get 0
const example1 = dutchNationalFlagApproach([2, 0, 2, 1, 1, 0, 1, 0, 1, 0]);
console.log("Example 1", example1);

// Example 2 - On the way of o, we get 2
const example2 = dutchNationalFlagApproach([2, 0, 2, 1, 2, 0, 1, 0, 1, 0]);
console.log("Example 2", example2);

// Edge case - Case where we should get into the loop even when i === j.
// This is the reason I added second condition, arr[z]>arr[o] in the while loop
const example3 = dutchNationalFlagApproach([1, 2, 0]);
console.log("Example 3", example3);

const example4 = dutchNationalFlagApproach([1, 2]);
console.log("Example 4", example4);

/*
DRY RUN

Example 1 -  0 in the path of o
 o
[2, 0, 2, 1, 1, 0, 1, 0, 1, 0]
 z
                            t

                         o
[0, 0, 0, 0, 1, 1, 1, 1, 2, 2]
             z
                      t



? Example 2 - 2 in the path of o


 o
[2, 0, 2, 1, 2, 0, 1, 0, 1, 0]
 z
                            t

                o
[0, 0, 0, 0, 1, 1, 1, 2, 2, 2]
          z
                      t


Edge cases

Case 1
 o
[1,  2,  0]
 z
         t



     o
[1,  0,  2]
     z
     t


Case 2

[1, 2]

    o
[1, 2]
 z
    t
*/

// BETTER dutchNationalFlagApproach
console.log("-----------------------------------------");
console.log("Approach 4.1 - Better Code - Dutch National Flag Algorithm");

// Above is my code. I saw Striver's code and realized my code is bad. Below is his code.
// His approach is better because he references mid which is o and not z (low) as I did before.

/*


 o
[2, 0, 2, 1, 2, 0, 1, 0, 1, 0]
 z
                            t
                            

                   o
[0, 0, 0, 0, 1, 1, 1, 2, 2, 2]
          z
                   t

*/

const dutchNationalFlagBetterCode = (arr) => {
  let z = 0,
    o = 0,
    t = arr.length - 1;
  while (o <= t) {
    if (arr[o] === 0) {
      [arr[o], arr[z]] = [arr[z], arr[o]];
      z++;
      o++;
    } else if (arr[o] === 1) {
      o++;
    } else {
      [arr[o], arr[t]] = [arr[t], arr[o]];
      t--;
    }
  }
  return arr;
};

// Example 1 - On the way of o, we get 0
console.log(
  "Example 1",
  dutchNationalFlagBetterCode([2, 0, 2, 1, 1, 0, 1, 0, 1, 0])
);

// Example 2 - On the way of o, we get 2

console.log(
  "Example 2",
  dutchNationalFlagBetterCode([2, 0, 2, 1, 2, 0, 1, 0, 1, 0])
);

// Edge case - Case where we should get into the loop even when i === j.
// This is the reason I added second condition, arr[z]>arr[o] in the while loop
console.log("Example 3", dutchNationalFlagBetterCode([1, 2, 0]));

console.log("Example 4", dutchNationalFlagBetterCode([1, 2]));
