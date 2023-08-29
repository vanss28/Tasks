const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get("/vanshika", async (req, res) => {
  res.send('byeworld');
});

// Endpoint to fetch word meanings
app.get('/getMeaning/:input', async (req, res) => {
  const word = req.params.input;

  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    console.log(response);

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
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//const axios = require('axios');
// async function wordMeaning(word){
//     console.log(word)


// try {
//     const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
//     console.log(response.data.meanings)
// } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while fetching data' });
//   }

// }
// wordMeaning('apple')
