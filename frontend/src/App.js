import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('hello-world');
        if (error) throw error;
        setMessage(data.message);
      } catch (error) {
        console.error('Error fetching message:', error);
        setMessage('Error fetching message');
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default App;