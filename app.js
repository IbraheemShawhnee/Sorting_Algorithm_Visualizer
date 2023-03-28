const slideValue = document.querySelector("span");
let slider = document.getElementById("slider");
let barsContainer = document.getElementById("barsContainer");
let minRange = 1;
let maxRange = 30;
let numOfBars = slider.value;
let randomizeArray = document.getElementById("randomize_array_btn");
let unsortedArray = new Array(numOfBars);
let heightFactor = 5;
let sortBtn = document.getElementById("sort_btn");
let selectedAlgorithm = document.getElementById("algo");
let algorithmSelected = "";
let speedFactor = 100;
let array = createRandomArray();

// Animation for range input
const inputSlider = document.querySelector("input");
inputSlider.oninput = () => {
  let value = inputSlider.value;
  slideValue.textContent = value;
  slideValue.style.left = value + "%";
  slideValue.classList.add("show");
};

inputSlider.onblur = () => {
  slideValue.classList.remove("show");
};

slider.addEventListener("input", function () {
  numOfBars = slider.value;
  maxRange = slider.value;
  barsContainer.innerHTML = "";
  unsortedArray = createRandomArray();
  renderBars(unsortedArray);
});

// Create a random array with constant minimum and maximum numbers given
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate bars
function renderBars(array) {
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    barsContainer.appendChild(bar);
    bar.innerHTML = array[i];
    bar.classList.add("bar");
  }
}

// Create a array with random numbers given from randomNum function
function createRandomArray() {
  let array = new Array(numOfBars);
  let bar = document.createElement("div");
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
    bar.innerHTML = array[i];
  }

  return array;
}

randomizeArray.addEventListener("click", function () {
  unsortedArray = createRandomArray();
  barsContainer.innerHTML = "";
  renderBars(unsortedArray);
});

document.addEventListener("DOMContentLoaded", function () {
  unsortedArray = createRandomArray();
  renderBars(unsortedArray);
});

selectedAlgorithm.addEventListener("change", function () {
  algorithmSelected = selectedAlgorithm.value;
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//Bubble Sort
async function bubbleSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = "#bad7e9";
          }
        }
        let temp = array[j];
        let numberInsideBar = bars[j].innerHTML; //
        bars[j].innerHTML = bars[j + 1].innerHTML; //
        array[j] = array[j + 1];
        bars[j + 1].innerHTML = numberInsideBar; //
        array[j + 1] = temp;
        bars[j].style.height = array[j] * heightFactor + "px";
        bars[j].style.backgroundColor = "lightgreen";
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "lightgreen";
        await sleep(speedFactor);
      }
    }
    await sleep(speedFactor);
  }
  return array;
}

// Insertion Sort implementation.
async function InsertionSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      let numberInsideBar = bars[j].innerHTML;
      bars[j].innerHTML = bars[j + 1].innerHTML;
      bars[j + 1].innerHTML = numberInsideBar;
      array[j + 1] = array[j];
      bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
      bars[j + 1].style.backgroundColor = "lightgreen";
      await sleep(speedFactor);
      for (let k = 0; k < bars.length; k++) {
        if (k != j + 1) {
          bars[k].style.backgroundColor = "#bad7e9";
        }
      }
      j = j - 1;
    }
    array[j + 1] = key;
    bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
    bars[j + 1].style.backgroundColor = "lightgreen";
    await sleep(speedFactor);
  }
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "#bad7e9";
  }
  return array;
}

// Heap Sort implementation.
async function HeapSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    await Heapify(array, array.length, i);
  }
  for (let i = array.length - 1; i >= 0; i--) {
    await swap(array, 0, i, bars);
    await Heapify(array, i, 0);
  }
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "#bad7e9";
    await sleep(speedFactor);
  }
  return array;
}

async function Heapify(array, n, i) {
  let bars = document.getElementsByClassName("bar");
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }
  if (largest != i) {
    await swap(array, i, largest, bars);
    await Heapify(array, n, largest);
  }
}

async function swap(array, i, j, bars) {
  let temp = array[i];
  let numberInsideBar = bars[i].innerHTML; //
  bars[i].innerHTML = bars[j].innerHTML; //
  bars[j].innerHTML = numberInsideBar; ///
  array[i] = array[j];
  array[j] = temp;
  bars[i].style.height = array[i] * heightFactor + "px";
  bars[j].style.height = array[j] * heightFactor + "px";
  bars[i].style.backgroundColor = "#bad7e9";
  bars[j].style.backgroundColor = "#bad7e9";
  await sleep(speedFactor);

  for (let k = 0; k < bars.length; k++) {
    if (k != i && k != j) {
      bars[k].style.backgroundColor = "lightgreen";
    }
  }
  return array;
}

// Merge Sort implementation
async function mergeSort(arr) {
  let bars = document.getElementsByClassName("bar");
  if (arr.length < 2) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  let actualHalf = await mergeSort(left);
  await mergeSort(right);
  let i = 0;
  let j = 0;
  let k = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].style.backgroundColor = "#bad7e9";
    if (k + arr.length < bars.length) {
      bars[k + arr.length].style.height = arr[k] * heightFactor + "px";
      bars[k + arr.length].style.backgroundColor = "#bad7e9";
    }
    await sleep(speedFactor);
    k++;
  }
  while (i < left.length) {
    arr[k] = left[i];
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].style.backgroundColor = "lightgreen";
    await sleep(speedFactor);
    i++;
    k++;
  }
  while (j < right.length) {
    arr[k] = right[j];
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].style.backgroundColor = "#bad7e9";
    await sleep(speedFactor);
    j++;
    k++;
  }
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "#bad7e9";
  }
}

// Quick Sort Implementation
async function quickSort(items, left, right) {
  var index;
  let bars = document.getElementsByClassName("bar");
  if (items.length > 1) {
    index = await partition(items, left, right);
    if (left < index - 1) {
      await quickSort(items, left, index - 1);
    }
    if (index < right) {
      await quickSort(items, index, right);
    }
  }

  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "#bad7e9";
  }
  return items;
}

async function partition(items, left, right) {
  let bars = document.getElementsByClassName("bar");
  let pivotIndex = Math.floor((right + left) / 2);
  var pivot = items[pivotIndex]; //middle element
  bars[pivotIndex].style.backgroundColor = "lightgreen";

  for (let i = 0; i < bars.length; i++) {
    if (i != pivotIndex) {
      bars[i].style.backgroundColor = "lightgreen";
    }
  }

  (i = left), //left pointer
    (j = right); //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      await swap(items, i, j, bars); //sawpping two elements
      i++;
      j--;
    }
  }
  return i;
}

sortBtn.addEventListener("click", function () {
  switch (algorithmSelected) {
    case "bubble":
      bubbleSort(unsortedArray);
      break;
    case "merge":
      mergeSort(unsortedArray);
      break;
    case "heap":
      HeapSort(unsortedArray);
      break;
    case "insertion":
      InsertionSort(unsortedArray);
      break;
    case "quick":
      quickSort(unsortedArray, 0, unsortedArray.length - 1);
      break;
    default:
      bubbleSort(unsortedArray);
      break;
  }
});
