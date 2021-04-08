const app = require('./server/app');

const PORT = process.env.PORT || 8989;

app.listen(PORT, () => {
  console.log('Server open and listening on port', PORT);
});
