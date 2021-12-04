const fs = require('fs');
const readline = require('readline');
let lines = [];
let bits = {};
let gamma = [];
let epsilon = [];

async function processLineByLine() {
  const fileStream = fs.createReadStream('./input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // store the columns of byte as arrays of int {[0,1,0,0], [0,0,0,1], [0,0,0,0]} each column represents a bit position
  // get the mode of each column and then the inverse of the mode
  for await (const line of rl) {
    lines.push(line); // to keep an original copy
    line.split('').forEach((bit, index) => {
      if (!bits[index]) bits[index] = [];
      bits[index].push(parseInt(bit));
    });
  }
}

function getMode(arr, imp_bit = 1) {
  const zero_occurs = arr.filter((x) => x === 0).length;
  const one_occurs = arr.filter((x) => x === 1).length;
  if (zero_occurs === one_occurs) return imp_bit;
  return zero_occurs > one_occurs ? 0 : 1;
}

async function begin() {
  let result = 0;
  await processLineByLine();
  //Part I
  Object.keys(bits).forEach((key) => {
    const _gamma = getMode(bits[key]);
    gamma.push(_gamma);
    epsilon.push(1 - _gamma);
  });
  result = parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2);
  console.log(`Part one: ${result}`);
  //Part II
  // Going through it twice only to KISS
  let _oxArr = JSON.parse(JSON.stringify(lines));
  let _cO2Arr = JSON.parse(JSON.stringify(lines));
  Object.keys(bits).forEach((key) => {
    const _oxCom = getMode(_oxArr.map((x) => parseInt(x[key])));
    if (_oxArr.length > 1) {
      _oxArr = JSON.parse(
        JSON.stringify(
          _oxArr.filter((line, index) => parseInt(line[key]) === _oxCom)
        )
      );
    }
    const _coLeast = getMode(_cO2Arr.map((x) => parseInt(x[key])));
    if (_cO2Arr.length > 1) {
      _cO2Arr = JSON.parse(
        JSON.stringify(
          _cO2Arr.filter((line, index) => parseInt(line[key]) !== _coLeast)
        )
      );
    }
  });
  console.log(`Part Two: ${parseInt(_oxArr[0], 2) * parseInt(_cO2Arr[0], 2)}`);
}
begin();
