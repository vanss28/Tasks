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



// DELETE request to remove a word by its unique ID
app.delete('/deleteWord/:id', async (req, res) => {
    const wordId = req.params.id;
    
    try {
      const deletedWord = await Word.findByIdAndDelete(wordId);
      
      if (!deletedWord) {
        return res.status(404).json({ error: 'Word not found' });
      }
  
      const remainingWords = await Word.find();
      res.json({ message: 'Word deleted', remainingWords });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting data' });
    }
  });
  
  // PUT request to update a word's meanings by its unique ID
  app.put('/updateWord/:id', async (req, res) => {
    const wordId = req.params.id;
    const { meanings } = req.body;
    
    try {
      const updatedWord = await Word.findByIdAndUpdate(wordId, { meanings }, { new: true });
      
      if (!updatedWord) {
        return res.status(404).json({ error: 'Word not found' });
      }
  
      res.json({ message: 'Word updated', updatedWord });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating data' });
    }
  });
  
  app.get('/getAllMeanings', async (req, res) => {

    try{
      const allMeanings = await Word.find({})
      res.status(200).json(allMeanings)  }
      catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while storing data' });
      }
  })
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
   
