import fs from "node:fs";

const exampleData = `3   4
4   3
2   5
1   3
3   9
3   3`;

const data = fs.readFileSync("./data/day-01.txt", "utf-8");

function parseInput(input) {
  const list1 = [];
  const list2 = [];

  input.split("\n").forEach((line) => {
    const [item1, item2] = line.split("   ");
    list1.push(parseInt(item1));
    list2.push(parseInt(item2));
  });

  list1.sort();
  list2.sort();

  return { list1, list2 };
}

function getTotalDistance({ list1, list2 }) {
  return list1.reduce((acc, cur, idx) => {
    return acc + Math.abs(cur - list2[idx]);
  }, 0);
}

function getSimilarityScore({ list1, list2 }) {
  let score = 0;
  const occurences = new Map(list1.map((item) => [item, 0]));

  list2.forEach((item) => {
    if (occurences.has(item)) {
      occurences.set(item, occurences.get(item) + 1);
    }
  });

  list1.forEach((item) => {
    const value = occurences.has(item) ? occurences.get(item) : 0;
    score += value * item;
  });

  return score;
}

(function () {
  console.log('Example Puzzle One', getTotalDistance(parseInput(exampleData)));
  console.log('Puzzle One', getTotalDistance(parseInput(data)));
  console.log('Example Puzzle Two', getSimilarityScore(parseInput(exampleData)));
  console.log('Puzzle Two', getSimilarityScore(parseInput(data)));
})();
