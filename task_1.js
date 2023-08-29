function countOccurrences(words) {
  // const Occurences = ( words ) =>{}
  const wordCounts = {};
  
  for (let word of words) {
    if (wordCounts.hasOwnProperty(word)) {
      wordCounts[word] += 1;
    } else {
      wordCounts[word] = 1;
    }
  }
  
  const sortedWordCounts = Object.entries(wordCounts).sort(
    (a, b) => b[1] - a[1]
  );
  
  for (const [word, count] of sortedWordCounts) {
    console.log(`${word}: ${count}`);
  }
  
  console.log(Object.values(wordCounts).length);
  
  return Object.values(wordCounts);
}

const words = ["green", "red", "yellow", "red"];
let count = countOccurrences(words);
console.log(count);