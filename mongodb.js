// PUT request to update a word's meanings by its unique ID
app.put('/updateWord/:id', async (req, res) => {
    const wordId = req.params.id;
    const { meanings } = req.body;
    
    try {
      const updatedWord = await Word.findByIdAndUpdate(wordId, { meanings }, { new: true });
      
      if (!updatedWord) {
        return res.status(404).json({ error: 'Word not found' });
      }
  
      res.json({ message: 'Word meanings updated', updatedWord });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating data' });
    }
  });
