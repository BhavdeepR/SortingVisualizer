export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }


export function doInsertionSort (array) {
  const animations = [];
  if (array.length <= 1){return array;}
  for (let i = 0; i < array.length; i++){
    for(let j = i; j > 0; j--){
      if(array[j] < array[j-1]){
        animations.push([j, j-1])
        animations.push([j, j-1])
        let temp = array[j-1];
        array[j-1] = array[j];
        array[j] = temp;
        animations.push([j, array[j], j-1, array[j-1]])
      }
    }

  }
  return animations;
}

export function doQuickSort(array){
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}


function quickSortHelper(array, startIdx, endIdx, animations){
  if(endIdx <= startIdx) return;
  let pivotIdx = partition(array, startIdx, endIdx, animations)
  quickSortHelper(array, startIdx, pivotIdx - 1, animations);
  quickSortHelper(array, pivotIdx + 1, endIdx, animations);
  return;
}

function partition(array, startIdx, endIdx, animations){
  let pivotIdx = startIdx;
  let i = startIdx;
  let j = endIdx + 1;
  // const barOneStyle = arrayBars[i].style;
  // const barTwoStyle = arrayBars[--j].style;

  while (true){
    //iterate from left to right side of array as long as value are less than pivot value
    while(array[++i] < array[pivotIdx]){
      animations.push({type: "compare", indices: [i, pivotIdx]});
      animations.push({type: "compare", indices: [i, pivotIdx]});
      if(i === endIdx) break;
      // barOneStyle.backgroundColor = 'red';
      // await sleep(animationSpeed);
      // barOneStyle.backgroundColor = 'turquoise';
    }
    //iterate from right to left side of array as long as values are greater than pivot value
    while(array[--j] > array[pivotIdx]){
      animations.push({type: "compare", indices: [j, pivotIdx]});
      animations.push({type: "compare", indices: [j, pivotIdx]});
      if(j === pivotIdx) break;
      // barTwoStyle.backgroundColor = 'red';
      // await sleep(animationSpeed);
      // barTwoStyle.backgroundColor = 'turquoise';
    }

    if(j <= i) break;
    swap(array, i, j);
    animations.push({type: "swap", indices: [i, j], heights: [array[i], array[j]]})
  }
  swap(array, pivotIdx, j)
  animations.push({type: "swap", indices: [pivotIdx, j], heights: [array[pivotIdx], array[j]]})
  return j;
}

function swap(array, firstIdx, secondIdx){
  let temp = array[firstIdx];
  array[firstIdx] = array[secondIdx];
  // barOneStyle.height = `${array[firstIdx]}px`;
  // await sleep(animationSpeed);
  array[secondIdx] = temp;
  // barTwoStyle.height = `${array[secondIdx]}px`;
  return array;
}

