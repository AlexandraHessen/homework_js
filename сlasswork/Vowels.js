'use strict'
let a=[ 5, 7, 
    [ 4, [2], 8, [1,3], 2 ], 
    [ 9, [] ], 
    1, 8
  ];
let sum=0;
function treeSum (arr){
    for (let i=0; i<arr.length; i++){
        if (Array.isArray(arr))
            sum+=treeSum();
        sum+=arr[i]
    }
    return sum;
}
console.log(treeSum(a));



// Просто сумма всех элементов массива
// let arr=[3, 2, 5, 2];
// let sum=0;
// function sumAr (arrF){
//     for (let i=0; i<arrF.length; i++){
//         sum+=arr[i];
//     }
//     return sum;
// }
// console.log(sumAr(arr));