const express = require('express'),
      router = express.Router(),
      images = require('../helper/image')


router.post('/upload',
  images.multer.single('image'), 
  images.sendUploadToGCS,
  (req, res) => {
    if(req.file){
        res.send({
          status: 200,
          message: 'Your file is successfully uploaded',
          link: req.file.cloudStoragePublicUrl
        })
    }else{
        res.send({
            status: 200,
            message: 'Your dont upload any file',
            link: null
          })

    }
  })

module.exports = router