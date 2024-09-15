/*

            i
   0  1  2  3  4  a.len
  [2, 3, 5, 1, 9]
                  j

sum = 0 -> 2 -> 5 -> 10 -> 11 -? 9 -> 18 -? 15 -? 10

ws = 0 -> 3 -> 2

mws = 0 -> 3  
*/

const a = [2, 3, 5, 1, 9];

let i = 0,
  j = 0,
  sum = 0,
  k = 10,
  ws = 0,
  mws = 0;

while (j < a.length) {
  sum += a[j];

  if (sum < k) {
    j++;
  } else if (sum === k) {
    mws = Math.max(j - i + 1, mws);
    j++;
  }
  // sum > k
  else {
    while (sum > k) {
      sum -= a[i];
      i++;
    }
    if (sum === k) {
      mws = Math.max(j - i + 1, mws);
    }
    j++;
  }
}
console.log(mws);
