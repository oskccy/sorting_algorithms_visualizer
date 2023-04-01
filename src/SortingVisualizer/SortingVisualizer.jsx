import React from 'react';
import {getMergeSortAnimations, getBubbleSortAnimations, getSelectionSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(Math.floor(Math.random() * (650 - 5 + 1) + 5))
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      if (!(i % 3 !== 2)) {
        setTimeout(function(){
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 2);
      }
    }
  }

  bubbleSort() {
    let animations = getBubbleSortAnimations(this.state.array)
    let arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      for (let j = 0; j < animations[i].length; j++) {
        setTimeout(function(){arrayBars[j].style.height = `${animations[i][j]}px`}, i * 2)
      }
    }
  }

  selectionSort() {
    let animations = getSelectionSortAnimations(this.state.array);
    let arrayBars = document.getElementsByClassName('array-bar')
    for (let i = 0; i < animations.length; i++) {
      for (let j = 0; j < animations[i].length; j++) {
        setTimeout(function(){arrayBars[j].style.height = `${animations[i][j]}px`}, i * 50)
      }
    }
  }

  render() {
    const {array} = this.state;
    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: '#0070f3',
              height: `${value}px`,
            }}></div>
        ))}
        <button class="Button" id="gen" onClick={() => this.resetArray()}><strong>Generate New Array</strong></button>
        <button class="Button" onClick={() => this.mergeSort()}><strong>Merge Sort </strong><small class='small'> On*logn</small> </button>
        <button class="Button" onClick={() => this.bubbleSort()}><strong>Bubble Sort </strong><small class='small'> On-On^2</small></button>
        <button class="Button" onClick={() => this.selectionSort()}><strong>Selection Sort </strong><small class='small'> On^2</small></button>
      </div>
    );
  }
}

function areArraysEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
} 
