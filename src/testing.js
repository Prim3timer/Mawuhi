const arr = [1, 2, 3, 2, 3, 4, 5, 
    5, 6, 1, 1, 4, 5, 7, 8, 8];

    
    function count(arr, element) {
        return arr.reduce((ele, arrayEle) =>
            (arrayEle == element ? ele + 1 : ele), 0);
    };
     
    console.log(count(arr, 1));