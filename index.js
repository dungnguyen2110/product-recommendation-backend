const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const app = express();
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
var cors = require('cors')
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

app.use(fileUpload());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let sampleFile = req.files.file;
  const uploadPath = path.join(__dirname, 'public/images', sampleFile.name);

  sampleFile.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
    res.send({ url: `/images/${sampleFile.name}` });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
