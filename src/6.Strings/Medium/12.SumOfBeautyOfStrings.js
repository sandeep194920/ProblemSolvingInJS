/* 
1781. Sum of Beauty of All Substrings

The beauty of a string is the difference in frequencies between the most frequent and least frequent characters.

For example, the beauty of "abaacc" is 3 - 1 = 2.
Given a string s, return the sum of beauty of all of its substrings.

 

Example 1:

Input: s = "aabcb"
Output: 5
Explanation: The substrings with non-zero beauty are ["aab","aabc","aabcb","abcb","bcb"], each with beauty equal to 1.
Example 2:

Input: s = "aabcbaa"
Output: 17
 

Constraints:

1 <= s.length <= 500
s consists of only lowercase English letters.

*/

/*
Global

result = 0

----
i
hmap = {}

max = -Inf
min = Inf


  i
a a b c b
    j



hmap = {
a:1
}

count = 0

max = -Inf
min = Inf

res = 4

if(count === k){
  for(key in hmap){
   
   max = max(max, hmap[key])
   min = min(max, hmap[key])
  
  }
}

if(diff > 0) {
 res += diff
}


*/

const approach1 = (s) => {
  let res = 0;

  for (let i = 0; i < s.length; i++) {
    const hmap = {};
    let count = 0;
    for (let j = i; j < s.length; j++) {
      let min = Infinity,
        max = -Infinity;
      const curEl = s.charAt(j);
      hmap[curEl] = (hmap[curEl] || 0) + 1;
      if (hmap[curEl] === 1) {
        count++;
      }

      if (count > 1) {
        for (let key in hmap) {
          max = Math.max(max, hmap[key]);
          min = Math.min(min, hmap[key]);
        }
      }

      const diff = max - min;

      if (diff > 0) {
        res += diff;
      }
    }
  }
  return res;
};

console.log("Approach 1- aabcb", approach1("aabcb")); // expected 5
console.log("Approach 1- aabcbaa", approach1("aabcbaa")); // expected 5
