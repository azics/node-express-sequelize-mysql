const { Subscribers, sequelize } = require('../models');

// Export a subscribers
exports.subscriberBulk = async (req, res) => {
  try {
    const subscriber = await Subscribers.bulkCreate(req.body);
    res.status(201).json(subscriber);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//sequelize.query(customQuery, { type: Sequelize.QueryTypes.SELECT });
exports.getAllSubscribersGrouped = async (req, res) => {
    try {
        // Custom SQL query
        const customQuery = `SELECT COALESCE(region, 'Grand Total') as region, SUM(item) as item, SUM(units) as units, SUM(subscribers) as subscribers FROM Subscribers GROUP BY region WITH ROLLUP`;

        const subscribers = await sequelize.query(customQuery, { type: sequelize.QueryTypes.SELECT });
        res.status(200).json(subscribers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Create a subscriber
exports.createSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscribers.create(req.body);
    res.status(201).json(subscriber);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all subscribers
exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscribers.findAll();
    res.status(200).json(subscribers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get subscriber by ID
exports.getSubscriberById = async (req, res) => {
  const { id } = req.params;
  try {
    const subscriber = await Subscribers.findByPk(id);
    if (!subscriber) {
      res.status(404).json({ error: 'Subscriber not found' });
    } else {
      res.status(200).json(subscriber);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update subscriber
exports.updateSubscriber = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await Subscribers.update(req.body, {
      where: { id },
    });
    if (updatedRows === 0) {
      res.status(404).json({ error: 'Subscriber not found' });
    } else {
      res.status(200).json({ message: 'Subscriber updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete subscriber
exports.deleteSubscriber = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await Subscribers.destroy({
      where: { id },
    });
    if (deletedRows === 0) {
      res.status(404).json({ error: 'Subscriber not found' });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
