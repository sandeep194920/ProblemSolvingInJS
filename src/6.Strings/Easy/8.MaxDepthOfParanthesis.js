/*
1614. Maximum Nesting Depth of the Parentheses

Given a valid parentheses string s, return the nesting depth of s. The nesting depth is the maximum number of nested parentheses.

Example 1:

Input: s = "(1+(2*3)+((8)/4))+1"

Output: 3

Explanation:

Digit 8 is inside of 3 nested parentheses in the string.

Example 2:

Input: s = "(1)+((2))+(((3)))"

Output: 3

Explanation:

Digit 3 is inside of 3 nested parentheses in the string.

Example 3:

Input: s = "()(())((()()))"

Output: 3 

*/

/* 

( 1 + ( 2 * 3 ) + ( ( 8 ) / 4 ) ) + 1
                                    i

currentDepth = 0 -> 1 -> 2 -> 1 -> 2 -> 3 -> 2 -> 1 -> 0 
maxDepth = 0 -> 2 -> 3

for(let i = 0; i < arr.len; i++){

    if(i === '(') {
    
    currentDepth++
    
    }else if(i === ')'){

    maxDepth = currentDepth
    currentDepth--

    
    }

}

*/
