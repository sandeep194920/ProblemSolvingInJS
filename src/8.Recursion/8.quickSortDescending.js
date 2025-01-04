/* Take pivot and place it in right place. While doing this, all elements smaller than pivot will automatically 
come to pivot's left and greater than pivot will come to right.

Repeat this for left and right using recursion

*/

/*

[1, 3, 2]
pvt = 1
left = 1
right = 2

*/

/*

 l
    lf
[4, 3, 2, 1, 7, 9, 5, 6];
                      rt  
                      h
*/

function placePivotAndGetIndex(arr, low, high) {
  const pvt = arr[high];
  let left = low,
    right = high - 1;
  while (left <= right) {
    while (arr[left] > pvt && left <= high) {
      left++;
    }
    while (arr[right] <= pvt && right >= low) {
      right--;
    }

    if (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
    }
  }
  [arr[high], arr[left]] = [arr[left], arr[high]];
  return right;
}

const arr = [4, 6, 2, 5, 7, 9, 1, 3];

function quickSort(arr, l, h) {
  if (l >= h) {
    return;
  }
  const pvtIndex = placePivotAndGetIndex(arr, l, h);
  quickSort(arr, l, pvtIndex - 1);
  quickSort(arr, pvtIndex + 1, h);
}

quickSort(arr, 0, arr.length - 1);
console.log(arr);
