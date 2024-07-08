const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
require('dotenv').config(); // Added this line to load environment variables

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY); 

app.get('/hello', async (req, res) => {
  const { data, error } = await supabase
    .from('messages')
    .select('content')
    .eq('id', 1)
    .single();

  if (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: data.content });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});