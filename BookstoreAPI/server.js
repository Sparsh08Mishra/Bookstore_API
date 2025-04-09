const dotenv = require('dotenv');
dotenv.config();

const app = require('./src/app');

const PORT80 = process.env.PORT || 3000;

app.listen(PORT80, () => {
  console.log(`Server running on port ${PORT80}`);
});