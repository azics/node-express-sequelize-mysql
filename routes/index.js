// routes/index.js

const express = require('express');
const router = express.Router();
const multerMW = require('../midleware/multer.mw');
const subscribersController = require('../controllers/subscribersController');
const fileUploadController = require('../controllers/fileUploadController');

// CRUD Routes

router.get('/', (req, res) => {
    try {
        res.status(201).send('<h1>Test REST API on Node Express Sequelize Mysql</h1>');
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});
router.post('/subscribers', subscribersController.createSubscriber);
router.get('/subscribers', subscribersController.getAllSubscribers);
router.get('/subscribers/:id', subscribersController.getSubscriberById);
router.put('/subscribers/:id', subscribersController.updateSubscriber);
router.delete('/subscribers/:id', subscribersController.deleteSubscriber);

router.post('/subscriberBulk', subscribersController.subscriberBulk); // exporting
router.get('/subscribersGrouped', subscribersController.getAllSubscribersGrouped); // groupingByRegion

router.post('/upload', multerMW.single('file'), fileUploadController.fileUpload);

module.exports = router;