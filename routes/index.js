const express = require('express');
const fs = require('fs');
const path = require('path');

const logger = require('../utils/logger');

const router = express.Router();

/* GET home page. */
router.get('/:videoId', (req, res, next) => {
  const { videoId } = req.params;
  console.log('>>', videoId)
  try {
    // const filePath = path.join(__dirname, '..', 'public', 'share', `${videoId}.mp4`);
    // fs.readFile(filePath, 'utf8', (err, data) => {
    //   if (err) {
    //     throw err;
    //   }
    //   console.log('>>>>>file>>', data)

    // });
    const filePath = `/cny2021/share/${videoId}.mp4`;
    res.render('index', {
      title: 'Express',
      videoPath: filePath,
    });
  } catch (e) {
    logger.log('error', e.message);
  }
});

module.exports = router;
