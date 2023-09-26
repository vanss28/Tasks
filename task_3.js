const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://vanss2808:Jns$2020@cluster0.y86jjmu.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true,
    minlength: 3, // Minimum word length constraint
    maxlength: 50 // Maximum word length constraint
  },
  meanings: String ,
  synonyms: String,
  antonyms: String
});
const Word = mongoose.model('Word', wordSchema);

app.use(bodyParser.json());


//  store a new word meaning ke saath
app.post('/addWord', async (req, res) => {
  const wordEntry = new Word({ ...req.body });
//word:req.body.word
  try {
    await wordEntry.save();
    res.status(201).json(wordEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while storing data' });
  }
});
//getting sab words
app.get('/getAllMeanings', async (req, res) => {
  try {
    const allMeanings = await Word.find({});
    res.status(200).json(allMeanings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while storing data' });
  }
});


// Endpoint to fetch a specific word from the database
app.get('/getWordInput', async (req, res) => {
  const word = req.body.word;

  try {
    const foundWord = await Word.findOne({ word });
    console.log(foundWord);

    if (!foundWord) {
      return res.status(404).json({ error: 'Word not found' });
    }

    res.json(foundWord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


