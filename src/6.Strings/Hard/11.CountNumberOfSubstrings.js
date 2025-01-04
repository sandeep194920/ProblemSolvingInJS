const substrCount = (s, k) => {
  let n = s.length;
  let res = 0;

  // Iterate over each starting point of the substring
  for (let i = 0; i < n; i++) {
    let dist_count = 0;
    let cnt = Array(26).fill(0); // Array to store character frequency

    // Iterate for each substring starting at i
    for (let j = i; j < n; j++) {
      let charIndex = s[j].charCodeAt(0) - "a".charCodeAt(0); // Get index of the character

      // If the current character hasn't been encountered in this substring
      if (cnt[charIndex] === 0) {
        dist_count++;
      }

      cnt[charIndex]++; // Increment frequency of current character

      // If the distinct character count becomes k, increment result
      if (dist_count === k) {
        res++;
      }
      // If distinct character count exceeds k, break the loop
      if (dist_count > k) {
        break;
      }
    }
  }

  return res;
};

// Example usage:
// console.log(substrCount("abcbaa", 2)); // Example input
console.log(substrCount("aac", 1)); // Example input

/* 

S = "abaaca", K = 1

      a  b  c  d  e  f  g  h  i  j  k  l  m  n  o  p  q  
cnt = 1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0    

distinct_char_count = 1

res = 0 -> 1 -> 2 -> 3 -> 4

     i
 a a c 
     j





      a  b  c  d  e  f  g  h  i  j  k  l  m  n  o  p  q  
cnt = 1  0  1  0  0  0  0  0  0  0  0  0  0  0  0  0  0    

distinct_char_count = 2

res = 0 -> 1 -> 2 -> 3 -> 4




*/
