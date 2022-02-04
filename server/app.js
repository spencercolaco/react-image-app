const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const NodeUrl = require('url')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  },
})

const upload = multer({ 
  // Config multer
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
  limits:{
      fileSize: 1024 * 1024
  }
})

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
  const url = new NodeUrl.URL(`http://localhost:${port}`)
  url.pathname = path.join('/image', req.file.filename)
  res.json({
    path: url.toString()
  })
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})