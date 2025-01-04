/*

target = 6

                   m
ind -> 0  1  2  3  4  5  6   7   8
arr = [3, 4, 5, 6, 7, 9, 12, 16, 17]
       l         
                                  h



                                  

*/

const findTarget = (arr, target) => {
  let l = 0,
    h = arr.length - 1;
  while (l <= h) {
    let mid = Math.floor((l + h) / 2);
    if (target === arr[mid]) {
      return mid;
    } else if (target > arr[mid]) {
      l = mid + 1;
    } else {
      h = mid - 1;
    }
  }
  return false;
};

const result = findTarget([3, 4, 5, 6, 7, 9, 12, 16, 17], 6);
console.log(result);
