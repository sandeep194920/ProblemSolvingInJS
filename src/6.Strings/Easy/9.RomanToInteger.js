/* 
Example 1:

Input: s = "III"
Output: 3
Explanation: III = 3.
Example 2:

Input: s = "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.
Example 3:

Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
*/

/* 

hmap = {
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

}

  
M    C M    X C      I V

4 + 90 + 900 + 1000

(5 - 1) + (100 - 10 + 1000 - 100 + 1000

res = 5 -> 4 -> 100 -> 90 -> 1090 ->  990 ->  1990          


5 - 1 + 100 - 10


*/
