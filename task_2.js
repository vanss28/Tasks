const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;
//endpoint vanshika
app.use(bodyParser.json());
app.get("/vanshika", async (req, res) => {
  res.send('byeworld');
});
//address to find exactly kya chahiye 
app.get('/getMeaning/:input', async (req, res) => {
  const word = req.params.input;

  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    console.log(response);
  //redirected
    if (response.data.length === 0) {
      return res.status(404).json({ error: 'Word not found' });
    }

    const meanings = response.data[0].meanings.map(meaning => {
      return {
        partOfSpeech: meaning.partOfSpeech,
        definitions: meaning.definitions.map(definition => definition.definition)
        
      };
    });

    res.json({ word, meanings });
  } catch (error) {
    console.error(error);//error
    res.status(500).json({ error: 'An error occurred ' });
  }
});

app.get('/getMeaningbody', async (req, res) => {
  const word = req.body.input;

  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    console.log(response);
  //redirected
    if (response.data.length === 0) {
      return res.status(404).json({ error: 'Word not found' });
    }

    const meanings = response.data[0].meanings.map(meaning => {
      return {
        partOfSpeech: meaning.partOfSpeech,
        definitions: meaning.definitions.map(definition => definition.definition)
        
      };
    });

    res.json({ word, meanings });
  } catch (error) {
    console.error(error);//error
    res.status(500).json({ error: 'An error occurred ' });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



