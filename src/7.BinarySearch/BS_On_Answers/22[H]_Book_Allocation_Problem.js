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

Max - 203 pages
Min - 12

books[] = [12, 34, 67, 90]

           S1
                   S2
               
[12, 34]
 s1  s2
 

S1     = All the books -> Addition of all pages which is the max              
S1, S2, S3, S4

Possibilities

S1 -> 12         -> Max pages - 12
S2 -> 34, 67, 90 -> Max pages - 191


S1 -> 12, 34   -> Max pages - 46 
S2 -> 67, 90   -> Max pages - 157


S1 -> 12, 34, 67 -> Max Pages - 113
S2 -> 90         -> Max pages - 90   


(Find the maximum num of something) is minimum

                       
How many pages should I assign to x num of students?

min -> 12, max - 203


12 -> I will not assign less than 12 pages per student

12 Pages per student

S1 -> 12
S2 -> 


function canXBeNumberOfPagesPerStudent(xPages, totalPages){
  xPage -> 12
  totalPages -> 203

  students = 0 

  for(let pages = xPages; pages <= totalPages; pages++){
    
    if(pages % 12 === xPages){
        student++
    }
  
  }

 

 

}



Possible/Impossible cases

4 students P
1 student  P 
3 students P
0 students X
5+ students X

*/

const bookAllocation = (books, numOfStudents) => {
  // [12, 34, 67, 90]
  let minPages = Math.max(...books),
    maxPages = books.reduce((acc, page) => acc + page);

  for (
    let currentNumOfPages = minPages;
    currentNumOfPages <= maxPages;
    currentNumOfPages++
  ) {
    if (studentCount(books, currentNumOfPages) === numOfStudents) {
      return currentNumOfPages;
    }
  }
  return minPages;
  let rightAmountOfPages = 0;

  while (minPages <= maxPages) {
    let currentNumOfPages = minPages + Math.floor((maxPages - minPages) / 2);
    if (studentCount(books, currentNumOfPages) > numOfStudents) {
      rightAmountOfPages = currentNumOfPages;
      minPages = currentNumOfPages + 1;
    } else {
      maxPages = currentNumOfPages - 1;
    }
  }
  return rightAmountOfPages;

  /*

minPages = 90
maxPages = 203


                      m     
90         100       103                116      117         120    144   145    150      200      203
l
                                         h
                                                        
                                                        




*/
};

function studentCount(books, currentNumOfPages) {
  let numOfStudents = 1;
  let pagesForCurrentStudent = books[0];
  for (let index = 1; index < books.length; index++) {
    if (pagesForCurrentStudent + books[index] <= currentNumOfPages) {
      pagesForCurrentStudent += books[index];
    } else {
      numOfStudents++;
      pagesForCurrentStudent = books[index];
    }
  }
  return numOfStudents;
}

console.log(bookAllocation([12, 34, 67, 90], 2));
//                               i
