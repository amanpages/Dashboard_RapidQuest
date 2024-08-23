const Customer = require('../models/customerModel');

exports.getNewCustomers = async (req, res) => {
    try {
      const customers = await Customer.aggregate([
        {
          $match: {
            created_at: { $type: "date" }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      res.json(customers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.getCustomerDistribution = async (req, res) => {
  try {
    const distribution = await Customer.aggregate([
      {
        $group: {
          _id: "$default_address.city",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);
    res.json(distribution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
