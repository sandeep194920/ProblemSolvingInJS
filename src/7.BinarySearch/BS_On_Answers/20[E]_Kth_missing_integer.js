/* 
1539. Kth Missing Positive Number

Given an array arr of positive integers sorted in a strictly increasing order, and an integer k.

Return the kth positive integer that is missing from this array.

Example 1:

Input: arr = [2,3,4,7,11], k = 5
Output: 9
Explanation: The missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing positive integer is 9.

Example 2:

Input: arr = [1,2,3,4], k = 2
Output: 6
Explanation: The missing positive integers are [5,6,7,...]. The 2nd missing positive integer is 6.
*/

/* 
5th number missing

[2,3,4,7,11]


highest - 11
lowest - 2





Min - 1
Max - 11


[2, 3, 4, 7, 11]

counter = 0 -> 1

1 exists? counter 1
2 exists? 
3 exists? 
4 exists? 
5 exists? counter 2
6 exists? counter 3
8 exists? counter 4
9 exists? counter 5 -> when counter becomes k, then return this


Since we check if a number exists in array everytime, better to keep it in hashmap. This check would then be o(1)

{2: 1, 3: 1, 4: 1, 7:1, 11:1}


Now will take min as 1 and max as highest which is 11.

Apply binary search

1 - 11 -> mid is 5

Check if mid exists -> no, so update the counter to 1

6 to 11 -> mid is 8 -> yes

*/

const input1 = [[2, 3, 4, 7, 11], 5];
const input2 = [[1, 2, 3, 4], 1];
const input3 = [
  [
    1, 3, 5, 6, 7, 8, 11, 13, 14, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 28,
    29, 30, 31, 34, 35, 36, 37, 38, 41, 43, 44, 47, 50, 51, 53, 54, 56, 57, 58,
    59, 60, 62, 63, 65, 67, 68, 69, 70, 71, 72, 73, 74, 76, 78, 80, 81, 83, 84,
    85, 88, 89, 90, 91, 92, 93, 95, 97, 98, 102, 103, 104, 105, 108, 109, 110,
    111, 112, 113, 114, 117, 120, 123, 124, 125, 127, 128, 129, 130, 131, 132,
    133, 135, 136, 137, 138, 139, 141, 142, 145, 146, 148, 149, 150, 151, 153,
    154, 155, 156, 161, 162, 164, 167, 168, 169, 170, 171, 172, 175, 176, 178,
    179, 181, 182, 184, 191, 193, 195, 196, 199, 201, 202, 204, 205, 208, 210,
    214, 215, 217, 219, 221, 222, 224, 226, 228, 229, 230, 231, 232, 234, 235,
    236, 240, 242, 246, 248, 249, 251, 252, 253, 254, 255, 256, 257, 258, 259,
    260, 261, 262, 265, 267, 269, 272, 273, 275, 278, 279, 280, 281, 282, 283,
    284, 285, 286, 287, 289, 291, 292, 293, 296, 297, 298, 299, 303, 305, 306,
    308, 312, 313, 315, 316, 318, 320, 323, 324, 327, 330, 332, 335, 337, 340,
    342, 343, 344, 346, 349, 350, 352, 353, 354, 356, 357, 359, 360, 362, 366,
    367, 369, 370, 374, 375, 376, 377, 378, 379, 382, 384, 386, 390, 392, 393,
    394, 395, 396, 399, 400, 401, 403, 406, 411, 413, 415, 416, 420, 424, 425,
    426, 427, 429, 430, 432, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443,
    444, 446, 447, 448, 449, 452, 455, 456, 458, 459, 460, 461, 462, 463, 464,
    465, 466, 467, 469, 470, 471, 472, 477, 479, 480, 483, 484, 486, 488, 489,
    490, 491, 492, 493, 494, 495, 500, 501, 503, 504, 506, 508, 510, 513, 514,
    515, 516, 517, 527, 531, 533, 534, 535, 536, 542, 543, 546, 547, 548, 549,
    550, 553, 556, 559, 561, 562, 563, 566, 567, 569, 571, 572, 576, 578, 579,
    581, 582, 583, 584, 586, 589, 591, 592, 593, 594, 595, 598, 600, 601, 602,
    603, 605, 606, 607, 609, 611, 612, 613, 614, 616, 617, 621, 622, 624, 625,
    626, 627, 630, 631, 633, 635, 636, 637, 639, 640, 643, 644, 646, 647, 648,
    649, 650, 651, 652, 654, 658, 660, 661, 662, 663, 664, 665, 667, 668, 669,
    672, 673, 678, 679, 683, 685, 686, 687, 689, 690, 691, 692, 693, 695, 696,
    697, 701, 702, 703, 704, 707, 709, 711, 714, 717, 718, 719, 720, 721, 723,
    724, 725, 726, 728, 729, 730, 733, 735, 736, 737, 738, 740, 742, 745, 746,
    747, 750, 754, 755, 757, 759, 761, 763, 765, 768, 771, 773, 774, 775, 776,
    779, 780, 781, 782, 783, 784, 787, 788, 789, 790, 791, 792, 794, 795, 797,
    798, 800, 801, 805, 806, 808, 810, 811, 812, 814, 816, 819, 822, 824, 825,
    826, 828, 831, 833, 835, 838, 841, 842, 844, 845, 846, 847, 849, 853, 854,
    855, 857, 858, 861, 862, 866, 868, 869, 870, 874, 878, 882, 884, 885, 888,
    889, 890, 892, 893, 897, 900, 903, 905, 906, 907, 908, 911, 913, 916, 918,
    920, 921, 922, 924, 925, 926, 928, 929, 930, 932, 933, 934, 936, 937, 938,
    940, 942, 944, 946, 949, 953, 954, 956, 957, 958, 961, 962, 964, 965, 966,
    969, 972, 973, 974, 976, 977, 978, 979, 980, 981, 982, 984, 985, 986, 988,
    993, 996, 997, 999,
  ],
  724,
];
const input4 = [[2, 3, 5, 9, 18], 9];
const input5 = [[2], 1];

// Approach 1 - Bruteforce
const approach1 = (arr, k) => {
  let current = 1, // 9
    counter = 0; // 5

  // 1 2 3 4 5 6 7 8 9 10 11
  while (counter < k) {
    // to avoid arr.includes every time, we could store this in a set/hashmap. Set makes more sense here as we don't need a value.
    // Just the key must be fine. This is done in approach 2
    if (!arr.includes(current)) {
      counter += 1;
    }

    if (counter === k) return current;
    current++;
  }
};
console.log("Approach 1 - Bruteforce");
console.log(approach1(input1[0], input1[1]));
console.log(approach1(input2[0], input2[1]));
console.log(approach1(input3[0], input3[1]));
console.log("----------------------------------------");
// Approach 2 - Bruteforce using set
/* 
k = 1 -> so we need to return 5
[1, 2, 3, 4] 5
[] 1


counter = 0 -> 1
current = 1

*/
const approach2 = (arr, k) => {
  const set = new Set(arr);

  let counter = 0,
    current = 1;

  while (counter <= k) {
    if (!set.has(current)) {
      counter++;
    }
    if (counter === k) {
      return current;
    }
    current++;
  }
};

console.log("Approach 2 - Bruteforce with set - Imrpoved lookup");
console.log(approach2(input1[0], input1[1]));
console.log(approach2(input2[0], input2[1]));
console.log(approach2(input3[0], input3[1]));
console.log(approach2(input4[0], input4[1]));
console.log("----------------------------------------");

// Approach 3 - Binary search

/*
If nothing is missing, array should look like this

0  1  2  3  4
1  2  3  4  5

At any index, the number must be 1 greater than it's index. That indicates there's nothing missing in the array.
For example, if you want to know what's missing at 4. We confirm element 4 is 1 greater than index 3, so we don't have anything missing at el 4.

That's the intuition.


0  1  2  3  4
2  3  5  9  18


Consider index 2, element 5. Ask yourself what should have been the number here if nothing is missing. The number is index + 1 which is 3.
What do we have -> 5. So do 5 - 3 to get missing numbers. So we have 2 missing numbers.

Similarly, consider index 4, we have 18. We should've had 4(ind)+1 = 5. So when we do 18 - 5 we get 13. So we have these 13 missing nums.
Missing numbers at index 4 -> 1 4 6 7 8 10 11 12 13 14 15 16 17


Now, knowing this concept, how do we do Binary Search?

*/

const binarySearchApproach = (arr, k) => {
  let low = 0,
    high = arr.length - 1;

  // check if last misssing is 0. That means nothing is missing in the array. Then we add k to the last number

  if (arr[arr.length - 1] - (arr.length - 1) === 1) {
    // nothing is missing, so the future values that are not in the array are missing. So we will add k to that
    return arr[arr.length - 1] + k;

    // Example of this would be [1,2,3,4] and k is 2. So we add k to last element 4 and the missing number is 6 that way.
  }

  /*

  m    
 [2], k = 1    
  l
h

*/

  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);
    let missing = arr[mid] - (mid + 1);
    if (missing < k) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return low + k;
};

console.log("Binary search approach");
console.log(binarySearchApproach(input1[0], input1[1])); // [[2, 3, 4, 7, 11], 5];  ->  answer 9
console.log(binarySearchApproach(input2[0], input2[1])); // [[1, 2, 3, 4], 1]; ->  answer 5
console.log(binarySearchApproach(input3[0], input3[1])); // answer 1313
console.log(binarySearchApproach(input4[0], input4[1])); // [[2, 3, 5, 9, 18], 9]; ->  answer 13
console.log(binarySearchApproach(input5[0], input5[1])); // [[2], 1]; -> ->  answer 1

/*

Index              0  1  2  3  4
arr             = [2, 3, 5, 9, 18]
missingNumbers    [1, 1, 2, 5, 13]

0 + 1 = 1

arr[mid] - (index + 1)


// Element 9 + x to get the kth(9th) missing number

missingnums 5 + x missing nums = 9(k)

x missing  = 9 - 5 = 4. Add this 4 to main element 9

9 + 4 to 13
arr[high] + (k - missingNumbers[high])

--------
               m
 [1, 1, 2, 5, 13]
               l
           h

OR low + k
    4 + 9 = 13
 

*/
