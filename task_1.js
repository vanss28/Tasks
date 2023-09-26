function Occurrences(words) {
  const wordCounts = {};
  //looping thru each word in the array
  for (let word of words) {
    if (wordCounts.hasOwnProperty(word)) {
      wordCounts[word] += 1;
      //create a new property initialising the new word
    } else {
      wordCounts[word] = 1;
    }
  }
  
  const sortedWordCounts = Object.entries(wordCounts).sort(
   function Compare(a,b){
    return b[1] - a[1];
  }
      );
  for (const [word, count] of sortedWordCounts) {
  
    console.log(`${word}: ${count}`);
  }
  
 
  return Object.values(wordCounts);
}

const words = ["green", "red", "yellow", "red"];
//calling the function Occureces with the word arrays
let count = Occurrences(words);
//log array
console.log(count);
console.log(count.length);//unique words 
