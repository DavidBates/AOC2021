const fs = require('fs');
const readline = require('readline');
let final = {
  depth: 0,
  aim: 0,
  horizontal: 0,
};
async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    let parts = line.split(' ');
    if (parts.length === 2) {
      let val = parseInt(parts[1]);
      switch (parts[0]) {
        case 'up':
          final.aim = final.aim - val;
          break;
        case 'down':
          final.aim = final.aim + val;
          break;
        case 'forward':
          final.horizontal = final.horizontal + val;
          final.depth = final.depth + final.aim * val;
          break;
      }
    }
  }
}

async function begin() {
  await processLineByLine();
  console.log(final);
  console.log(final.depth * final.horizontal);
}

begin();
