const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

const getListFiles = (req, res) => {
  const directoryPath = __dirname + "/images";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let imageFiles = [];

    files.forEach((file) => {
      imageFiles.push({
        name: file,
        url: `http://localhost:${port}/image/` + file,
      });
    });

    res.status(200).send(imageFiles);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __dirname + "/images/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

app.use(cors())

app.get("/image", getListFiles);
app.get("/image/:name", download);
app.post('/image', upload.single('file'), function (req, res) {
  res.json({})
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})