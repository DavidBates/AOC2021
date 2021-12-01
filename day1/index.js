const fs = require('fs');
const readline = require('readline');
let inputArr = [];
let windowsArr = [];
let increased_ct = 0;
async function processLineByLine() {
  const fileStream = fs.createReadStream('input_part1.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    const depth = parseInt(line);
    if (inputArr.length > 0 && depth > inputArr[inputArr.length - 1]) {
      increased_ct += 1;
    }
    inputArr.push(depth);
    // console.log(increased_ct);
  }
}
function toWindows(inputArray, size) {
  return inputArray.reduce((acc, _, index, arr) => {
    if (index + size > arr.length) {
      //we've reached the maximum number of windows, so don't add any more
      return acc;
    }

    //add a new window of [currentItem, maxWindowSizeItem)
    return acc.concat(
      //wrap in extra array, otherwise .concat flattens it
      [arr.slice(index, index + size)]
    );
  }, []);
}

function window_sum(windows) {
  return windows.map((i) => {
    return i.reduce((x, a) => {
      return a + x;
    });
  });
}

let increasedWindowCT = 0;
function sumIncreased(windows) {
  windows.forEach((x, i) => {
    if (i > 0 && x > windows[i - 1]) {
      increasedWindowCT += 1;
    }
  });
}

async function begin() {
  await processLineByLine();
  windowsArr = toWindows(inputArr, 3);
  sumIncreased(window_sum(windowsArr));
  console.log(increased_ct);
  console.log(increasedWindowCT);
}

begin();
