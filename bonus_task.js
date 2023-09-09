const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
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


  
  app.get('/getAllMeanings', async (req, res) => {

    try{
      const allMeanings = await Word.find({})
      res.status(200).json(allMeanings)  }
      catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while storing data' });
      }
  }) 
app.get('/search/:prefix', async (req, res) => {
    const prefix = req.params.prefix.toLowerCase();
    try {
      const matchedWords = await Word.find({ word: { $regex: `^${prefix}` } }).select('word');
      res.json(matchedWords);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
  });
  app.get('/getWordSameMeaning', async (req, res) => {
    const word = req.body.word;
  
    try {
      const foundWord = await Word.findOne({ word });
      console.log(foundWord);
      const wordmeaning = foundWord.meanings
      const allsamewords = await Word.find({meanings : wordmeaning })
    
      if (!foundWord) {
        return res.status(404).json({ error: 'Word not found' });
      }
      res.json(allsamewords);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
