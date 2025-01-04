/* 
Allocate Minimum Number of Pages

Problem Statement: Given an array ‘arr of integer numbers, ‘ar[i]’ represents the number of pages in the ‘i-th’ book. There are a
‘m’ number of students, and the task is to allocate all the books to the students. Allocate books in such a way that:

Each student gets at least one book. Each book should be allocated to only one student. Book allocation should be in a contiguous
manner. You have to allocate the book to ‘m’ students such that the maximum number of pages assigned to a student is minimum. If the
allocation of books is not possible. return -1



Example 1: Input Format: n = 4, m = 2, arr[] = {12, 34, 67, 90} 

Result: 113 Explanation: The allocation of books will be 12, 34, 67 | 90. One student will get the first 3 books and the other will 
get the last one.

Refer here for more examples - https://takeuforward.org/data-structure/allocate-minimum-number-of-pages/
*/

/* 


books = [12, 34, 67, 90]

2 students

S1 -> 12     
S2 -> 34 + 67 + 90 = 191

        Diff -> 191 - 12

S1 -> 12 + 34 = 46
S2 -> 67 + 90 = 157

        Diff -> 157 - 46

S1 -> 12 + 34 + 67 = 113 Pages
S2 -> 90 Pages

        Diff -> 113 - 90 



Max possible pages per student -> Addition of all pages
Min possible pages per student -> 

[12, 34, 67, 90]

S1   S2


Min number of pages a student should read -> Highest book in arr
Max number of pages a student should read -> Sum of all books




books = [12, 34, 67, 90, 10, 13, 5, 4, 9]
students = 5 


MIN -> 90 pages per student
MAX -> addition of all books


Students are given to us -> 5
-------
                                               m
Number of pages - 90 91 92 93 94   100  120   150    160   180   200   220   240   244

150 pages we take as currentNumberOfPages

How many students are required to read 244 pages, if I take 150 pages as bare minmum per student?

1st student -> 150
2nd student -> 94



200 pages we take as currentNumberOfPages

How many students are required to read 244 pages, if I take 200 pages as bare minmum per student?

1st student -> 200
2nd student -> 44


------

*/

//12 is not possible as minimum because, it's like saying - "I don’t want any student to get more than 12 pages."
// For 90 pages, it works in [12, 34, 67, 90] - "I don’t want any student to get more than 12 pages." makes sense.
// 90 pages is the smallest possible upper bound

/* 
Code explanation

What's the right number of pages to get the given number of students


*/

const getNumberOfStudentsForGivenPages = (books, currentNumberOfPages) => {
  let numberOfStudentsRequired = 1;
  let pages = books[0]; // 12+34

  /* [12, 34, 67, 90]
                S    
    
    */
  for (let book = 1; book < books.length; book++) {
    if (books[book] + pages <= currentNumberOfPages) {
      pages += books[book];
    } else {
      numberOfStudentsRequired++;
      pages = books[book];
    }
  }

  return numberOfStudentsRequired;
};

const bookAllocationBruteForce = (books, numOfGivenStudents) => {
  let minimumPages = Math.max(...books),
    maximumPages = books.reduce(
      (totalPages, currentPages) => totalPages + currentPages
    );

  for (let pages = minimumPages; pages <= maximumPages; pages++) {
    if (getNumberOfStudentsForGivenPages(books, pages) === numOfGivenStudents) {
      return pages;
    }
  }

  return minimumPages;
};

const bookAllocationBinarySearch = (books, numOfGivenStudents) => {
  let minimumPages = Math.max(...books),
    maximumPages = books.reduce(
      (totalPages, currentPages) => totalPages + currentPages
    ),
    minimumAllocationOfPages = minimumPages;

  while (minimumPages <= maximumPages) {
    let currentNumberOfPages =
      minimumPages + Math.floor((maximumPages - minimumPages) / 2);

    if (
      getNumberOfStudentsForGivenPages(books, currentNumberOfPages) >
      numOfGivenStudents
    ) {
      minimumPages = currentNumberOfPages + 1;
    } else {
      minimumAllocationOfPages = currentNumberOfPages;
      maximumPages = currentNumberOfPages - 1;
    }
  }
  /*

                    [12, 34, 67, 90]

                                                   m 
                    90 95 100 104 105 106 112 113 114 115 116 117 118 119 120 145 150 180 203
                                                   l
                                                   h


*/

  //   return minimumPages; // or minimumAllocationOfPages
  return minimumPages;
};

// console.log(getNumberOfStudentsForGivenPages([12, 34, 67, 90], 113));
console.log(bookAllocationBinarySearch([12, 34, 67, 90], 2));
