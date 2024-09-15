const { unionOfTwoSortedArrays } = require("./8.UnionOf2SortedArrays"); // Import your function

describe("unionOfTwoSortedArrays", () => {
  test("should return the union of two sorted arrays without duplicates", () => {
    const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const arr2 = [2, 3, 4, 4, 5, 11, 12];
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const result = unionOfTwoSortedArrays(arr1, arr2);
    console.log("The result is", result, "expected is", expected);
    expect(result).toEqual(expected);
  });

  test("should return an empty array when both arrays are empty", () => {
    const arr1 = [];
    const arr2 = [];
    const expected = [];
    const result = unionOfTwoSortedArrays(arr1, arr2);
    expect(result).toEqual(expected);
  });

  test("should return the non-empty array when one array is empty", () => {
    const arr1 = [1, 3, 5, 7];
    const arr2 = [];
    const expected = [1, 3, 5, 7];
    const result = unionOfTwoSortedArrays(arr1, arr2);
    expect(result).toEqual(expected);
  });

  test("should return the non-empty array when the other array is empty", () => {
    const arr1 = [];
    const arr2 = [2, 4, 6, 8];
    const expected = [2, 4, 6, 8];
    const result = unionOfTwoSortedArrays(arr1, arr2);
    expect(result).toEqual(expected);
  });

  test("should handle arrays with all unique elements", () => {
    const arr1 = [1, 3, 5];
    const arr2 = [2, 4, 6];
    const expected = [1, 2, 3, 4, 5, 6];
    const result = unionOfTwoSortedArrays(arr1, arr2);
    expect(result).toEqual(expected);
  });

  test("should handle arrays with some overlapping elements", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [2, 3, 4, 5];
    const expected = [1, 2, 3, 4, 5];
    const result = unionOfTwoSortedArrays(arr1, arr2);
    expect(result).toEqual(expected);
  });

  test("should handle arrays where one array is a subset of the other", () => {
    const arr1 = [1, 2, 3, 4, 5];
    const arr2 = [2, 3];
    const expected = [1, 2, 3, 4, 5];
    const result = unionOfTwoSortedArrays(arr1, arr2);
    expect(result).toEqual(expected);
  });
});
