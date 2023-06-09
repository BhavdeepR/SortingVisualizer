import React from 'react';
import {doInsertionSort, doQuickSort, getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
//const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
//const NUMBER_OF_ARRAY_BARS = 175;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      animationSpeed: 1,
      arraySize: 200,
      isSorting: false,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    if(this.state.isSorting){return};

    const { arraySize } = this.state;
    const array = [];
    for (let i = 0; i < arraySize; i++) {
      array.push(randomIntFromInterval(5, 600));
    }
    this.setState({ array });
  }

  

  mergeSort() {
    //if(this.state.isSorting) return;
    //this.setState({ isSorting: true })
    const { array, animationSpeed } = this.state;
    const animations = getMergeSortAnimations(array);
    // iterate through earch of the two element arrays in animations array
    for (let i = 0; i < animations.length; i++) {
      // these are the array bars that are being displayed
      const arrayBars = document.getElementsByClassName('array-bar');
      // for each comparison, three arrays are push into animations array, the first two are for
      // color changes, the third is two update the index
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        //change the color of the array bars to show comparison and then change them back
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * animationSpeed);
        //change the color and wait the given time to change back
      } else {
        //this code is to change the height of the next array bar with the given height
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * animationSpeed);
      }
    }
    //this.setState({ isSorting: false });
  }

  async quickSort() {
  
    const {array, animationSpeed} = this.state;
    const arrayBars = document.getElementsByClassName('array-bar');

    let animations = doQuickSort(array);
    await animate(animations, animationSpeed, arrayBars)
    console.log(array);
  }
  

  insertionSort() {
    //if(this.state.isSorting) return;
    //this.setState({ isSorting: true });

    const { array, animationSpeed } = this.state;
    const animations = doInsertionSort(array);
    // iterate through earch of the two element arrays in animations array
    for (let i = 0; i < animations.length; i++) {
      // these are the array bars that are being displayed
      const arrayBars = document.getElementsByClassName('array-bar');
      // for each comparison, three arrays are push into animations array, the first two are for
      // color changes, the third is two update the index
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        //change the color of the array bars to show comparison and then change them back
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * animationSpeed);
        //change the color and wait the given time to change back
      } else {
        //this code is to change the height of the next array bar with the given height
        setTimeout(() => {
          const [barOneIdx, barOneHeight, barTwoIdx, barTwoHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.height = `${barOneHeight}px`;
          barTwoStyle.height = `${barTwoHeight}px`;

        }, i * animationSpeed);
      }
    }
    //this.setState({ isSorting: false });
  }

  handleSpeedChange(event) {
    const speed = parseInt(event.target.value);
    this.setState({ animationSpeed: speed });
  }

  handleSizeChange(event) {
    const size = parseInt(event.target.value);
    this.setState({ arraySize: size }, () => {
      this.resetArray();
    });
  }

  render() {
    const {array, isSorting} = this.state;

    return (
      <div className='parent-container'>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}
          ></div>
        ))}
      </div>
      <div className="button-container">
        <button onClick={() => this.resetArray()} disabled={isSorting}>
          Generate New Array
        </button>
        <button onClick={() => this.mergeSort()} disabled={isSorting}>
          Merge Sort
        </button>
        <button onClick={() => this.quickSort()} disabled={isSorting}>
          Quick Sort
        </button>
        <button onClick={() => this.insertionSort()} disabled={isSorting}>
          Insertion Sort
        </button>
        <div>
          <label>Animation Speed:</label>
          <input
            type="range"
            min="1"
            max="100"
            value={this.state.animationSpeed}
            onChange={(event) => this.handleSpeedChange(event)}
          />
        </div>
        <div>
          <label>Array Size:</label>
          <input
            type="range"
            min="10"
            max="250"
            value={this.state.arraySize}
            onChange={(event) => this.handleSizeChange(event)}
          />
        </div>
      </div>
    </div>
    

    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// function arraysAreEqual(arrayOne, arrayTwo) {
//   if (arrayOne.length !== arrayTwo.length) return false;
//   for (let i = 0; i < arrayOne.length; i++) {
//     if (arrayOne[i] !== arrayTwo[i]) {
//       return false;
//     }
//   }
//   return true;
// }

async function animate(animations, animationSpeed, arrayBars){
  for(let animation of animations) {
    const [barOneIdx, barTwoIdx] = animation.indices;
    const barOneStyle = arrayBars[barOneIdx].style;
    const barTwoStyle = arrayBars[barTwoIdx].style;
    switch(animation.type) {
      case "compare":

        const color = barOneStyle.background==='red' ? 'turqoise' : 'red';

        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
        
        break;
      case "swap":
        const [barOneHeight, barTwoHeight] = animation.heights;

        barOneStyle.height = `${barOneHeight}px`;
        barTwoStyle.height = `${barTwoHeight}px`;
        break;
    }
    await sleep(animationSpeed);
  }
  for(let bar of arrayBars){
    bar.style.backgroundColor = 'lime';
    await sleep(2);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

