const express = require('express');
// const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const OSS = require('ali-oss');
// const fs = require('fs');
const multer = require('multer');
const config = require('../utils/config');
const logger = require('../utils/logger');

const router = express.Router();

// const client = new OSS({
//   region: config.bucketRegion,
//   accessKeyId: config.accessKey,
//   accessKeySecret: config.accessSecret,
//   bucket: config.bucketName,
// });

// router.get('/', async (req, res) => {
//   let result = await client.listBuckets();
//   console.log('>>>>', result);
//   res.status(200).send('get api');
// })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/share')
  },
  filename: function (req, file, cb) {
    const filename = uuidv4();
    cb(null, `${filename}.mp4`)
  }
});
const uploadMem = multer({ storage: storage });

router.post('/upload-video', uploadMem.single("file"), (req, res, next) => {
  try {
    console.log(req.file);
    let url = '';
    if (config.env === 'development') {
      url = `https://d80d31b6ca79.ngrok.io/cny2021/${req.file.filename}`;
    } else {
      url = `https://skinceuticalstrasia.cn/cny2021/${req.file.filename}`;
    }
    res.send({ url });
  } catch (e) {
    logger.log('error', e.message);
    res.status(500).send({
      message: 'Internal Error',
      success: false,
    });
  }
})

// router.post('/upload-video', async (req, res, next) => {
//   const form = formidable({ multiples: true });
  
//   try {
//     const formPromise = await new Promise((resolve, reject) => {
//       form.parse(req, (err, fields, files) => {
//         if (err) {
//           reject(err);
//           return;
//         }
//         // console.log('upload video>>>>', fields, files);
//         resolve({
//           fields,
//           files,
//         })
//       });
//     })

//     const {fields, files} = formPromise;
//     const { file } = files;
//     // const { filename } = fields;
    
//     const filename = new Date().getTime();
//     // const filename = file.name;
//     // const fileBuffer = file.path;
//     const fileBuffer = file.buffer;
//     console.log('>>>>>file buffer', file)
//     // console.log('>>>>posting video>>>', filename, fileBuffer)
//     // let result = await client.put(`videos/${filename}`, fileBuffer);
//     // const { requestUrls } = result;
//     fs.writeFile('./' + filename + '.mp4', fileBuffer, function(err) {
//       console.log('>>>>eerr', err)
//     });
//     const requestUrls = `>>>>> ${filename}`;
//     res.status(200).send(requestUrls);
//   } catch (e) {
//     logger.log('error', e.message);
//   }
// });

module.exports = router;
