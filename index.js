const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/chat', (req, res) => {
  const question = req.body.question;

  //  axios.post('https://api.openai.com/v1/engines/davinci/jobs', {
  axios.post('https://api.openai.com/v1/completions', {
    model: "text-davinci-003",
    prompt: question,
    max_tokens: 7, //100,
    temperature: 0 //0.5
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    }
  })
    .then(response => {
      res.send(response.data.choices[0].text);
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
});

app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



