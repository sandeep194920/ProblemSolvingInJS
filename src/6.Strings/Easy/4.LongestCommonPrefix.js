/* 
14. Longest Common Prefix

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

Example 1:

Input: strs = ["flower","flow","flight"]
Output: "fl"

Example 2:

Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.

Constraints:

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lowercase English letters.
*/

/*
Approach

*/

const longestCommonPrefix = (strs) => {
  let longestStr = strs[0] || "";

  for (let i = 1; i < strs.length; i++) {
    let currentStr = strs[i];
    let currentLongest = "";

    // compare current string with current-longest
    for (let j = 0; j < Math.min(currentStr.length, longestStr.length); j++) {
      if (currentStr[j] === longestStr[j]) {
        currentLongest += currentStr[j];
      } else {
        break;
      }
    }
    if (currentLongest.length < longestStr.length) {
      longestStr = currentLongest;
    }
  }
  return longestStr;
};

/*
strs = ["flower", "flow", "flight"];

longestStr = flower


currentStr = flow


currentLongest = "flow"

*/

const input1 = ["flower", "flow", "flight"];
console.log(
  `For ${input1} the common prefix is ${longestCommonPrefix(input1)}`
);
