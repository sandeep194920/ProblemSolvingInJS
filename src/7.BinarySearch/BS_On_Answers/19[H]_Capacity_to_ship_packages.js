/* 
Capacity to Ship Packages within D Days

Problem Statement: You are the owner of a Shipment company. You use conveyor belts to ship packages from one port to another. The
packages must be shipped within 'd' days. The weights of the packages are given in an array 'of weights'. The packages are loaded on
the conveyor belts every day in the same order as they appear in the array. The loaded weights must not exceed the maximum weight
capacity of the ship. Find out the least-weight capacity so that you can ship all the packages within 'd' days.

Example 1:
Input Format:
 N = 5, weights[] = {5,4,5,2,3,4,5,6}, d = 5      
Result:
 9
Explanation:
 If the ship capacity is 9, the shipment will be done in the following manner:
Day         Weights            Total
1        -       5, 4          -        9
2        -       5, 2          -        7
3        -       3, 4          -        7
4        -       5              -        5
5        -       6              -        6
So, the least capacity should be 9.

Example 2:
Input Format:
 N = 10, weights[] = {1,2,3,4,5,6,7,8,9,10}, d = 1
Result:
 55
Explanation:
 We have to ship all the goods in a single day. So, the weight capacity should be the summation of all the weights i.e. 55.


Example 3:

weights = [1,2,3,4,5,6,7,8,9,10], days = 5

Output: 15

Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:

1st day: 1, 2, 3, 4, 5
2nd day: 6, 7
3rd day: 8
4th day: 9
5th day: 10

*/

/* 

NOTE Before you start the problem - The minimum capacity of the ship must be the max element in the array. If I take some other element like 8 [1,2,3,4,5,6,7,8,9,10]
as the minimum, then 9kg and 10kg packages can't be shipped. So the minimum the ship can take must be of 10 which is the highest package.


Why is that the minimum weight must be the largest weight?

Key Reason:

Each package must be shipped: The ship must be able to carry at least the heaviest package by itself. 
No matter how many days you have to ship, the ship needs a capacity that can handle the heaviest package in one go, 
because there's no option to break down a package into smaller parts.


[1,2,3,4,5,6,7,8,9,10], days = 5

Total kgs in ship is 55

If I take MINIMUM_POSSIBLE - 10 kg per day 

If I take MAX_POSSIBLE - 55 kg per day 

MID =>  (10 + 55)/2 = 32

It's not enough to find the mid number alone. We also need to see if we can fit this weights that add up to 28kg each day and still be lesser 
than 5 days. Let's see

----BASE/MID 32KG each day--

weigths = [1,2,3,4,5,6,7,8,9,10], days = 5

DAY 1 - 1 2 3 4 5 6 7 
DAY 2 - 8 9 10
 
Possible! With 32 kgs, I can ship it in 2 days. But we need to find least amount of weight, so mark this as answer and reduce the 
weights further to see if we can get a lesser weight.

-------

NOTE: From here I have taken 1 as minimum but it's a mistake. It should have been 10. That's the only change in the explanation.

Let's try to reduce weight further. (1 + 27)/2 -> 14 kg. Let's see if 14 kg is possible

----BASE/MID 14KG each day--

weigths = [1,2,3,4,5,6,7,8,9,10], days = 5

DAY 1 - 1 2 3 4   = 10kg which is less or equal to 14kg
DAY 2 - 5 6       = 11kg which is less or equal to 14kg
DAY 3 - 7         =  7kg which is less or equal to 14kg
DAY 4 - 8         =  8kg which is less or equal to 14kg
DAY 5 - 9         =  9kg which is less or equal to 14kg
DAY 6 - 10        =  10kg which is less or equal to 14kg
 
Not Possible! With 14 kgs, I can't ship it in 5 days. Let's increase the days

-------
Let's try to increase weight further. (15 + 27)/2 -> 21 kg. Let's see if 21 kg is possible

----BASE/MID 21KG each day--

[1,2,3,4,5,6,7,8,9,10], days = 5

Day 1 - 1 2 3 4 5 6
Day 2 - 7 8
Day 3 - 9 10

Possible! With 21 kgs, I can ship it in 3 days. But we need to find least amount of weight, so mark this as answer and reduce the 
weights further to see if we can get a lesser weight.

-------

Let's try to reduce weight further. (15 + 20)/2 -> 17 kg. Let's see if 17 kg is possible

----BASE/MID 17KG each day--

Day 1 - 1 2 3 4 5 
Day 2 - 6 7 
Day 3 - 8 9
Day 4 - 10

Possible! With 17 kgs, I can ship it in 4 days. But we need to find least amount of weight, so mark this as answer and reduce the 
weights further to see if we can get a lesser weight.


-------
Let's try to reduce weight further. (15 + 16)/2 -> 15 kg. Let's see if 15 kg is possible

Day 1 - 1 2 3 4 5 
Day 2 - 6 7 
Day 3 - 8 
Day 4 - 9
Day 5 - 10

Possible! With 15 kgs, I can ship it in 5 days. But we need to find least amount of weight, so mark this as answer and reduce the 
weights further to see if we can get a lesser weight.


After this, the low and high crosses each other like this.

        ans
   1    15 16      55
        l   h

After this iteration, it will become,

          ans
   1  14  15      55
       h   l  

So either we can return low, or recorded answer. Recorded answer was formed every time when high was reduced.
        
*/

const shipWithinDays = (weights, days) => {
  let minimumWeight = Math.max(...weights);

  // maximum weight that I can ship is addition of all weights in the ship
  //   let maximumWeigth = 0;
  //   for (let weight of weights) {
  //     maximumWeigth += weight;
  //   }

  // you could also do
  let maximumWeigth = weights.reduce((acc, weight) => acc + weight, 0);

  let leastWeight = maximumWeigth;

  while (minimumWeight <= maximumWeigth) {
    // let baseWeight =
    //   minimumWeight + Math.floor((maximumWeigth - minimumWeight) / 2);

    let baseWeight = Math.floor((maximumWeigth + minimumWeight) / 2);

    // For this base weigth, see how many days are possible
    let numOfDays = 1,
      accumulatedWeigth = 0;
    // [1, 2, 3, 1, 1]
    for (let day = 0; day < weights.length; day++) {
      if (accumulatedWeigth + weights[day] > baseWeight) {
        numOfDays += 1;
        accumulatedWeigth = weights[day];
      } else {
        accumulatedWeigth += weights[day];
      }
    }

    if (numOfDays <= days) {
      // record the answer, and reduce the weights to see if something lower is possible
      leastWeight = baseWeight;
      maximumWeigth = baseWeight - 1;
    } else {
      minimumWeight = baseWeight + 1;
    }
  }
  return minimumWeight;
};

console.log(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)); // 15 kg
// console.log(shipWithinDays([5, 4, 5, 2, 3, 4, 5, 6], 5)); //9 kg
// console.log(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1)); //55 kg
console.log(shipWithinDays([1, 2, 3, 1, 1], 4));
