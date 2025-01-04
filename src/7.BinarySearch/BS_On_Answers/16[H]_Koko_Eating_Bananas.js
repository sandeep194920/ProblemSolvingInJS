/* 
Koko Eating Bananas


Problem Statement: A monkey is given ‘n’ piles of bananas, whereas the 'ith' pile has ‘a[i]’ bananas. An integer ‘h’ is also given,
which denotes the time (in hours) for all the bananas to be eaten.

Each hour, the monkey chooses a non-empty pile of bananas and eats ‘k’ bananas. If the pile contains less than ‘k’ bananas, then the
monkey consumes all the bananas and won’t eat any more bananas in that hour.

Find the minimum number of bananas ‘k’ to eat per hour so that the monkey can eat all the bananas within ‘h’ hours.

---------------

Example 1: Input Format: N = 4, a[] = {7, 15, 6, 3}, h = 8 

Result: 5 Explanation: If Koko eats 5 bananas/hr, he will take 2, 3, 2, and 1 hour to eat the piles accordingly. 

So, he will take 8 hours to complete all the piles.  

---------------

Example 2: Input Format: N = 5, a[] = {25, 12, 8, 14, 19}, h = 5 

Result: 25 Explanation: If Koko eats 25 bananas/hr, he will take 1,
1, 1, 1, and 1 hour to eat the piles accordingly. 

So, he will take 5 hours to complete all the piles.

---------------

Example 3:

Input: piles = [3,6,7,11], h = 8
Output: 4

---------------

Example 4:

Input: piles = [30,11,23,4,20], h = 5
Output: 30

---------------

Example 5:

Input: piles = [30,11,23,4,20], h = 6
Output: 23

---------------

Before moving on to the solution, let’s understand how Koko will eat the bananas. Assume, the given array is {3, 6, 7, 11} and the
given time i.e. h is 8. 

First of all, Koko cannot eat bananas from different piles. He should complete the pile he has chosen and then he can go for another
pile. Now, Koko decides to eat 2 bananas/hour. So, in order to complete the first he will take 3 / 2 = 2 hours. Though
mathematically, he should take 1.5 hrs but it is clearly stated in the question that after completing a pile Koko will not consume
more bananas in that hour. So, for the first pile, Koko will eat 2 bananas in the first hour and then he will consume 1 banana in
another hour. From here we can conclude that we have to take ceil of (3/2). Similarly, we will calculate the times for other piles.

1st pile: ceil(3/2) = 2 hrs 2nd pile: ceil(6/2) = 3 hrs 3rd pile: ceil(7/2) = 4 hrs 4th pile: ceil(11/2) = 6 hrs Koko will take 15
hrs in total to consume all the bananas from all the piles. 

Observation: Upon observation, it becomes evident that the maximum number of bananas (represented by 'k') that Koko can consume in
an hour is obtained from the pile that contains the largest quantity of bananas. Therefore, the maximum value of 'k' corresponds to
the maximum element present in the given array.

So, our answer i.e. the minimum value of ‘k’ lies between 1 and the maximum element in the array i.e. max(a[]).

Now, let’s move on to the solution.

*/

/* 

Example 1:

Input: piles = [3,6,7,11], h = 8
Output: 4


Max is 11, min is 3. 

If we follow linear approach then we check from 3 to 11.

For 3, we get 1 + 2 + 3 + 4 -> 10 This is more hours, so let's increase and see
For 4, we get 1 + 2 + 2 + 3 -> 8 This gives us right answer. But here linear search is best, but it's better to implement this using 
binary search.


?Binary search

First we find the mid b/w 3 and 11, we get 7. We check for 7

For 7 bananas -> 1 + 1 + 1 + 2 -> 5 hours taken

This is less hours taken, so let's reduce the banana count to increase hours. Now the low is 3 and high is 7. So the mid is 5

For 5 bananas -> 1 + 2 + 2 + 3 -> 8 hours taken. This gives us the right answer, so let's record 5 bananas, but continue further to check if we can get
lesser banana count than this


3(low) + 5(high) = 8 -> mid is 4

For 4 bananas -> 1 + 2 + 2 + 3 -> we get right answer, so since this is less than 5 hours(previous answer), we update it and continue to check 
further.

3(low) + 4(high) = 7 -> mid is 3

For 3 banans-> 1 + 2 + 2 + 4 -> 9 hours. Since this is more hours, and also after this the low crosses high we stop here and return 4.

Traverse the same for other examples and check.

---------------

Example 2:

Input: piles = [30,11,23,4,20], h = 5
Output: 30

---------------

Example 3:

Input: piles = [30,11,23,4,20], h = 6
Output: 23

*/

const helpKoko = (piles, hoursOfGuard) => {
  if (!piles.length) return 0;

  // first find the min and max from the piles
  let minNumOfBananas = 1, // [30, 11, 23, 4, 20] we get 4
    maxNumOfBananas = -Infinity; // [30, 11, 23, 4, 20] we get 30

  for (let pile of piles) {
    if (pile > maxNumOfBananas) maxNumOfBananas = pile;
  }

  // binary search to find number of bananas

  while (minNumOfBananas <= maxNumOfBananas) {
    let hourseTakenToEat = 0;

    let numberOfBananas =
      minNumOfBananas + Math.floor((maxNumOfBananas - minNumOfBananas) / 2);

    for (let i = 0; i < piles.length; i++) {
      hourseTakenToEat += Math.ceil(piles[i] / numberOfBananas);
    }
    if (hourseTakenToEat <= hoursOfGuard) {
      maxNumOfBananas = numberOfBananas - 1;
    } else {
      minNumOfBananas = numberOfBananas + 1;
    }
  }
  return minNumOfBananas;
};
console.log(helpKoko([3, 6, 7, 11], 8));
console.log("---------");
console.log(helpKoko([30, 11, 23, 4, 20], 8)); // 2 + 1 + 2 + 1 + 2
console.log(
  helpKoko(
    [
      332484035, 524908576, 855865114, 632922376, 222257295, 690155293,
      112677673, 679580077, 337406589, 290818316, 877337160, 901728858,
      679284947, 688210097, 692137887, 718203285, 629455728, 941802184,
    ],

    823855818
  )
);
/*
23748860 + 37493470 

TRACE





TRACE










[30, 11, 23, 4, 20] -> 15 = 2+1+2+1+2 (right answer)    14 = 3 + 1 + 2 + 1 + 2        16 = 2+1+2+1+2
[300, 121, 213, 411, 223, 30, 60, 54, 43] -> 300 = 1 + 1+1+1+1+1+1+1+1 = 9  ->


minNumOfBananas = 30, maxNumOfBananas = 300

numOfBananas = 165


hoursReqtoEat = 300/165 + 121/165 + .......

= 2 + 1 + 2 + 3 + 2 + 1 + 1+ 1+ 1 = 14 hours. This is > than 10 hours. So let's maximize our bananas eating count.


minNumOfBananas = 166, maxNumOfBananas = 300
numOfBananas = 233

hoursToEat = 2 + 1 + 1 + 2 + 1 + 1 + 1+ 1+ 1 = 11 hours. This is > 10 so let's maximize bananas

minNumOfBananas = 234, maxNumOfBananas = 300
numOfBananas = 267

hoursToEat = 2 + 1 + 1 + 2 + 1 + 1 + 1+ 1+ 1 = 11 hours. This is > 10 so let's maximize bananas

Like this, when we go on, we get 300 as the answer
*/

/*

[3, 6, 7, 11]

Taking ceil for simplicity here (for understanding)

nB = (3 + 11)/2 = 7 banans -> in 5 hours     -> This is very soon. So we decrease bananas to increase hours
nB = (3 + 6)/2 = 5 b -> in 8 hours -> This is exact time. But let's decrease bananas further to see if hours remain same.
nB = (3 + 4)/2 = 4 b -> in 8 hours -> This is perfect. If we reduce banans further we increase hours than guard hours.

So the point is, we keep recording the answer when banans are decreasing, in other words when hoursTaken < guardHours

*/
