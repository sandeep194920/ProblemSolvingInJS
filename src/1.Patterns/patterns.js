/*
 *
 *
 *
 *
 */
function oneLineStar(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < 1; j++) {
      console.log("*");
    }
  }
}

console.log("----- One line star -----");
oneLineStar(4);
console.log("---------------------------------");

/*
 *
 * *
 * * *
 * * * *
 */

function rightAngleTriangeStar(n) {
  for (let i = 0; i < n; i++) {
    let singleLineRes = "";

    for (let j = 0; j < i + 1; j++) {
      singleLineRes += "* ";
    }
    console.log(singleLineRes);
  }
}

console.log("----- Right angle triangle -----");
rightAngleTriangeStar(4);
console.log("---------------------------------");

function squareStar(n) {
  for (let row = 0; row < n; row++) {
    let pattern = "";
    for (let col = 0; col < n; col++) {
      pattern += "* ";
    }
    console.log(pattern);
  }
}

console.log("----- Square star -----");
squareStar(5);
console.log("---------------------------------");

function rightAngleNums(n) {
  for (let row = 0; row < n; row++) {
    let res = "";
    for (let col = 0; col < 1 + row; col++) {
      res += `${col + 1} `;
    }
    console.log(res);
  }
}

console.log("----- Right Angled numbers -----");
rightAngleNums(5);
console.log("---------------------------------");

function rightAngleNums2(n) {
  for (let row = 0; row < n; row++) {
    // build and print in a row
    let res = "";
    for (let col = 0; col < 1 + row; col++) {
      res += `${row + 1} `;
    }
    console.log(res);
  }
}

console.log("----- Right Angled numbers -----");
rightAngleNums2(5);
console.log("---------------------------------");

function reverseRightAngle(n) {
  for (let row = 0; row < n; row++) {
    let res = "";
    // for (let col = n - row; col > 0; col--) {
    //   res += `* `;
    // } OR below
    for (let col = 0; col < n - row; col++) {
      res += `* `;
    }
    console.log(res);
  }
}

console.log("----- Reverse Right Angle -----");
reverseRightAngle(5);
console.log("---------------------------------");

function reverseRightAngleNums(n) {
  for (let row = 0; row < n; row++) {
    // build and print
    let res = "";

    for (let col = 0; col < n - row; col++) {
      res += `${col + 1} `;
    }

    console.log(res);
  }
}

console.log("----- Right Angled numbers -----");
reverseRightAngleNums(5);
console.log("---------------------------------");

// TRICKY ONES
/*

N = 2
 *
***

N = 3

  *  
 *** 
***** 


N = 6

     *      - 11 - 10 and Gap - 5
    ***     - 11 - 8  and Gap - 4
   *****    - 11 - 6  and Gap - 3
  *******   - 11 - 4  and Gap - 2
 *********  - 11 - 2  and Gap - 1
*********** - 11 - 0  and Gap - 0

Observation:

On taking a look at last line and if you count it, the last line will be ((N * 2) - 1). 
This is what the number of columns should be
For example, if N = 6, then in last row, num of stars will be 11 which is ((6 * 2) - 1)

*/

function triangleStepStars(n) {
  for (let row = 0; row < n; row++) {
    let res = "";

    for (let col = 0; col < n - 1 - row; col++) {
      res += " ";
    }

    for (let col = 0; col < 2 * row + 1; col++) {
      res += "*";
    }

    for (let col = 0; col < n - 1 - row; col++) {
      res += " ";
    }

    console.log(res);
  }
}

console.log("----- Triangle Step Stars -----");
triangleStepStars(6);
console.log("-------------------------------");

/*
N = 6

*********** - 11 - 0  and Gap - 0
 *********  - 11 - 2  and Gap - 1
  *******   - 11 - 4  and Gap - 2
   *****    - 11 - 6  and Gap - 3
    ***     - 11 - 8  and Gap - 4
     *      - 11 - 10 and Gap - 5
*/

function reverseTriangleStepStars(n) {
  for (let row = 0; row < n; row++) {
    let res = "";
    let toBePrinted = n * 2 - 1 - row * 2;

    for (let gap = 0; gap < row; gap++) {
      res += " ";
    }

    for (let star = 0; star < toBePrinted; star++) {
      res += "*";
    }

    for (let gap = 0; gap < row; gap++) {
      res += " ";
    }
    console.log(res);
  }
}

console.log("----- Reverse Triangle Step Stars -----");
reverseTriangleStepStars(6);
console.log("-------------------------------");

function mirrorTriangleStepStars(n) {
  triangleStepStars(n);
  reverseTriangleStepStars(n);
}

console.log("----- Mirror Triangle Step Stars -----");
mirrorTriangleStepStars(6);
console.log("-------------------------------");

function mirrorRightAngleStepStars(n) {
  rightAngleTriangeStar(n);
  reverseRightAngle(n);
}

console.log("----- Mirror Right angle Step Stars -----");
mirrorRightAngleStepStars(6);
console.log("-------------------------------");

function mirrorRightAngleStepStarsApproach2(n) {
  for (let row = 0; row < n * 2; row++) {
    let res = "";

    let columnCount = 1 + row;
    if (row >= n) {
      // let count = n - (row - n); // both are same
      let count = 2 * n - row;
      columnCount = count;
    }

    for (let col = 0; col < columnCount; col++) {
      res += " * ";
    }

    console.log(res);
  }
}

console.log("----- Mirror Right angle Step Stars -----");
mirrorRightAngleStepStarsApproach2(6);
console.log("-------------------------------");

/*

Input Format: N = 3
Result: 
1
01
101

Input Format: N = 6
Result:   
1
01
101
0101
10101
010101


*/

function binaryStepRightAngle(n) {
  for (let row = 0; row < n; row++) {
    let res = "";
    for (let col = 0; col < 1 + row; col++) {
      if (!res) {
        if (row % 2 === 0) {
          res += 1;
        } else {
          res += 0;
        }
      } else {
        if (res[res.length - 1] === "0") {
          res += 1;
        } else {
          res += 0;
        }
      }
    }
    console.log(res);
  }
}

console.log("----- Binary Right angle Step numbers -----");
binaryStepRightAngle(6);
console.log("-------------------------------");

function binaryStepRightAngleApproach2(n) {
  for (let row = 0; row < n; row++) {
    let start = 0;
    if (row % 2 === 0) start = 1;
    let res = "";

    for (let col = 0; col < row + 1; col++) {
      res += start;
      start = 1 - start; // this would alternate the numbers 1 to 0 and 0 to 1
    }
    console.log(res);
  }
}

console.log("----- Binary Right angle Step numbers Approach 2 -----");
binaryStepRightAngleApproach2(6);
console.log("-------------------------------");

/*
Input Format: N = 3
Result: 
1    1
12  21
123321

Input Format: N = 6
Result:   
1          1
12        21
123      321
1234    4321
12345  54321
123456654321

*/
// DIFFICULT
function mirrorNumbers(n) {
  for (let row = 0; row < n; row++) {
    let resArr = new Array(n * 2).fill(" ");

    for (let col = 0; col < row + 1; col++) {
      resArr[col] = col + 1;
    }

    // from right side

    for (let colRev = n * 2 - 1; colRev >= n * 2 - 1 - row; colRev--) {
      resArr[colRev] = n * 2 - colRev;
    }

    console.log(resArr.join(""));
  }
}

console.log("----- Numbers from right side -----");
mirrorNumbers(6);
console.log("-------------------------------");

/*

Input Format: N = 3
Result: 
1
2 3
4 5 6

Input Format: N = 6
Result:   
1
2  3
4  5  6
7  8  9  10
11  12  13  14  15
16  17  18  19  20  21

*/

function rightContinuosNumbers(n) {
  let count = 1;

  for (let row = 0; row < n; row++) {
    let res = "";

    for (let col = 0; col < row + 1; col++) {
      res += `${count++} `;
    }

    console.log(res);
  }
}

console.log("----- Right angle triangle continuos numbers -----");
rightContinuosNumbers(6);
console.log("-------------------------------");

/*
A 
A B 
A B C 
A B C D 
A B C D E 
A B C D E F 
*/

function rightAngleABC(n) {
  const alph = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

  for (let row = 0; row < n; row++) {
    let res = "";
    for (let col = 0; col <= row; col++) {
      res += `${alph[col]} `;
    }

    console.log(res);
  }
}

console.log("----- Right angle triangle ABC -----");
rightAngleABC(6);
console.log("-------------------------------");

// SECOND WAY
function rightAngleABC2(n) {
  for (let row = 0; row < n; row++) {
    let res = "";
    for (let col = 0; col <= row; col++) {
      res += `${String.fromCharCode(65 + col)} `;
    }

    console.log(res);
  }
}

console.log("----- Right angle triangle ABC -----");
rightAngleABC2(6);
console.log("-------------------------------");

/*
Input Format: N = 3
Result: 
A B C
A B
A

Input Format: N = 6
Result:   
A B C D E F
A B C D E 
A B C D
A B C
A B
A
*/

function reverseRightAngleABC(n) {
  for (let row = 0; row < n; row++) {
    let res = "";

    for (let col = 0; col < n - row; col++) {
      res += `${String.fromCharCode(65 + col)} `;
    }

    console.log(res);
  }
}

console.log("----- Reverse Right angle triangle ABC -----");
reverseRightAngleABC(6);
console.log("-------------------------------");

/*
Input Format: N = 3
Result: 
A
B B
C C C

Input Format: N = 6
Result:   
A 
B B
C C C
D D D D
E E E E E
F F F F F F
*/

function rightAngleAlphabets(n) {
  for (let row = 0; row < n; row++) {
    let res = "";
    for (let col = 0; col <= row; col++) {
      res += `${String.fromCharCode(65 + row)} `;
    }

    console.log(res);
  }
}

console.log("----- Right angle triangle A B C -----");
rightAngleAlphabets(6);
console.log("-------------------------------");

/*
Input Format: N = 3
Result: 
  A  
 ABA 
ABCBA


Input Format: N = 6
Result:   

     A      -  1 - GAP 11 -> 6 * 2 - (row0 + 1)
    ABA     -  3 - GAP  9 -> 6 * 2 - (row1 + 2)
   ABCBA    -  5 - GAP  7 -> 6 * 2 - (row2 + 3)
  ABCDCBA   -  7 - GAP  5 -> 6 * 2 - (row3 + 4) 
 ABCDEDCBA  -  9 - GAP  3
ABCDEFEDCBA - 11 - GAP  1
*/

// function alphaTriangle(n){
//   let count = 0
//   for(let row = 0; row < n; row++){

//     let res = ''
//     const totalGap = (n * 2) - (row + count + 1) // -> 11
//     count++
//     const equalGap = Math.floor(totalGap/2) // -> 5

//     for(let col = 0; col < equalGap; col++){
//       res += ' '
//     }

//     for(let col = 0; col < n * 2 - totalGap; col++){
//       res += '*'
//     }

//     for(let col = 0; col < equalGap; col++){
//       res += ' '
//     }

//     console.log(res);
//   }
// }

function alphaTriangle(n) {
  for (let row = 0; row < n; row++) {
    let res = "";

    for (let col = 0; col < n - 1 - row; col++) {
      res += " ";
    }

    // TO PRINT *
    // for(let col = 0; col < 2 * row + 1 ; col++){
    //   res += '*'
    // }

    // TO PRINT ABC
    let subResArr = new Array(row * 2 + 1).fill(" ");
    let start = 0;
    let end = row * 2;

    while (start <= end) {
      subResArr[start] = `${String.fromCharCode(65 + start)}`;
      subResArr[end] = `${String.fromCharCode(65 + start)}`;
      start++;
      end--;
    }
    res += subResArr.join("");

    for (let col = 0; col < n - 1 - row; col++) {
      res += " ";
    }

    console.log(res);
  }
}

console.log("----- Alphabet triangle A B C -----");
alphaTriangle(6);
console.log("-------------------------------");

function alphaTriangleApproach2(n) {
  for (let row = 0; row < n; row++) {
    let res = "";

    for (let col = 0; col < n - 1 - row; col++) {
      res += " ";
    }

    // TO PRINT *
    // for(let col = 0; col < 2 * row + 1 ; col++){
    //   res += '*'
    // }

    //r=2  A B C(col=2) B A

    //  A B C B

    const alphabetLimit = 2 * row + 1;
    let ch = 64;
    for (let col = 0; col < alphabetLimit; col++) {
      if (col <= row) {
        ch++; //66
      } else {
        ch--;
      }
      res += `${String.fromCharCode(ch)}`;
    }

    for (let col = 0; col < n - 1 - row; col++) {
      res += " ";
    }

    console.log(res);
  }
}

console.log("----- Alphabet triangle A B C -----");
alphaTriangleApproach2(6);
console.log("-------------------------------");

/*
Input Format: N = 3
Result: 
C
B C
A B C

Input Format: N = 6
Result:   
F
E F
D E F
C D E F
B C D E F
A B C D E F
*/

// F -> 71  -> (N + 65) - row + col
// E -> 70
// D -> 69

function reverseAlphabetTriange(n) {
  let charCode = 64 + n; // 71 -> F
  let print = charCode;
  for (let row = 0; row < n; row++) {
    print = charCode; // 70

    let res = "";

    for (let col = 0; col < row + 1; col++) {
      res += String.fromCharCode(print);
      print++;
    }
    charCode--;
    console.log(res);
  }
}

console.log("----- Reverse alphabet triangle -----");
reverseAlphabetTriange(6);
console.log("-------------------------------");

/*
Input Format: N = 3
Result: 
******     0 gap
**  **     2
*    *     4
*    *     4
**  **     2
******     0

Input Format: N = 6
Result:   
************   0  
*****  *****   2
****    ****   4
***      ***   6
**        **   8
*          *   10
*          *   10 
**        **   8
***      ***   6
****    ****   4
*****  *****   2
************   0
*/

function diamondStar(n) {
  function diamondStarReverse() {
    for (let row = 0; row < n; row++) {
      let res = "";

      for (let col = 0; col < n - row; col++) {
        res += "*";
      }

      for (let col = 0; col < row * 2; col++) {
        res += " ";
      }

      for (let col = 0; col < n - row; col++) {
        res += "*";
      }

      console.log(res);
    }
  }

  function diamondStarStraight() {
    for (let row = 0; row < n; row++) {
      let res = "";
      let total = n * 2;
      let gap = total - (row + 1) * 2; // 12 - (1 * 2)

      for (let col = 0; col <= row; col++) {
        res += "*";
      }

      for (let col = 0; col < gap; col++) {
        res += " ";
      }

      for (let col = 0; col <= row; col++) {
        res += "*";
      }

      console.log(res);
    }
  }

  diamondStarReverse();
  diamondStarStraight();
}

console.log("----- Diamond star -----");
diamondStar(6);
console.log("-------------------------------");

/*

Input Format: N = 3
Result: 
*    *
**  **
******
**  **
*    *


Input Format: N = 6
Result:   
*          *
**        **
***      ***
****    ****
*****  *****
************
*****  *****
****    ****
***      ***
**        **
*          *

*/

function diamondStar2(n) {
  function diamondStar2Reverse() {
    for (let row = 1; row < n; row++) {
      let res = "";

      for (let col = 0; col < n - row; col++) {
        res += "*";
      }

      for (let col = 0; col < row * 2; col++) {
        res += " ";
      }

      for (let col = 0; col < n - row; col++) {
        res += "*";
      }

      console.log(res);
    }
  }

  function diamondStar2Straight() {
    for (let row = 0; row < n; row++) {
      let res = "";
      let total = n * 2;
      let gap = total - (row + 1) * 2; // 12 - (1 * 2)

      for (let col = 0; col <= row; col++) {
        res += "*";
      }

      for (let col = 0; col < gap; col++) {
        res += " ";
      }

      for (let col = 0; col <= row; col++) {
        res += "*";
      }

      console.log(res);
    }
  }

  diamondStar2Straight();
  diamondStar2Reverse();
}

console.log("----- Diamond star -----");
diamondStar2(6);
console.log("-------------------------------");

/*
Input Format: N = 3
Result: 
***
* *
***

Input Format: N = 6
Result:   
******
*    *
*    *
*    *
*    *
******
*/

function squareStarGap(n) {
  for (let row = 0; row < n; row++) {
    let res = "";

    for (let col = 0; col < n; col++) {
      if (col === 0 || col === n - 1 || row == 0 || row === n - 1) {
        res += "*";
      } else {
        res += " ";
      }
    }

    console.log(res);
  }
}

console.log("----- Square gap star -----");
squareStarGap(6);
console.log("-------------------------------");

/*
Input Format: N = 3
Result: 
3 3 3 3 3 
3 2 2 2 3 
3 2 1 2 3 
3 2 2 2 3 
3 3 3 3 3

Input Format: N = 6

Result:   

6 6 6 6 6 6 6 6 6 6 6   
6 5 5 5 5 5 5 5 5 5 6 
6 5 4 4 4 4 4 4 4 5 6 
6 5 4 3 3 3 3 3 4 5 6 
6 5 4 3 2 2 2 3 4 5 6 
6 5 4 3 2 1 2 3 4 5 6 
6 5 4 3 2 2 2 3 4 5 6 
6 5 4 3 3 3 3 3 4 5 6 
6 5 4 4 4 4 4 4 4 5 6 
6 5 5 5 5 5 5 5 5 5 6 
6 6 6 6 6 6 6 6 6 6 6
*/

/*
Subtracting n from every comp would give us

0 0 0 0 0
0 1 1 1 0 
0 1 0 1 0 
0 1 1 1 0 
0 0 0 0 0

get the top, left, right, down for every element


top = row  0
left = col 0
right = 2n - 1 - col 4
bottom = 2n - 1 - row 4
*/

function squareDecreasingNumbers(n) {
  for (let row = 0; row < n * 2 - 1; row++) {
    let res = "";
    for (let col = 0; col < n * 2 - 1; col++) {
      const top = row;
      const left = col;
      const right = 2 * n - 2 - col;
      const bottom = 2 * n - 2 - row;

      res += `${n - Math.min(top, left, bottom, right)} `;
    }
    console.log(res);
  }
}

console.log("----- Square Decreasing Numbers -----");
squareDecreasingNumbers(6);
console.log("-------------------------------");
