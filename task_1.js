function Occurrences(words) {
  //empty object initalize karna to store word counts
  const wordCounts = {};
  //looping thru each word in the array
  for (let word of words) {
    //same property matlab word exists already toh increment the same property as one
    if (wordCounts.hasOwnProperty(word)) {
      wordCounts[word] += 1;
      //create a new property initialising the new word
    } else {
      wordCounts[word] = 1;
    }
  }
  //convrting object into array jaha words=key and counts=values
  const sortedWordCounts = Object.entries(wordCounts).sort(
   function Compare(a,b){
    return b[1] - a[1];
  }
      );
  for (const [word, count] of sortedWordCounts) {
    //word kitni baar occured hai
    console.log(`${word}: ${count}`);
  }
  
 
  return Object.values(wordCounts);
}
//array of words to be counted defined idhar
const words = ["green", "red", "yellow", "red"];
//calling the function Occureces with the word arrays
let count = Occurrences(words);
//log array
console.log(count);
console.log(count.length);//unique words 
