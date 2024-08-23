const Order = require('../models/orderModel');

exports.getTotalSalesOverTime = async (req, res) => {
  try {
    const sales = await Order.aggregate([
      {
        $addFields: {
          created_at_date: {
            $cond: {
              if: { $eq: [{ $type: "$created_at" }, "string"] },
              then: { $dateFromString: { dateString: "$created_at" } },
              else: "$created_at",
            },
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$created_at_date" },
          },
          totalSales: { $sum: { $toDouble: "$total_price" } },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getSalesGrowthRate = async (req, res) => {
  try {
    const salesGrowth = await Order.aggregate([
      {
        $addFields: {
          created_at_date: {
            $cond: {
              if: { $eq: [{ $type: "$created_at" }, "string"] },
              then: { $dateFromString: { dateString: "$created_at" } },
              else: "$created_at",
            },
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$created_at_date" },
            month: { $month: "$created_at_date" },
          },
          totalSales: { $sum: { $toDouble: "$total_price" } },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      {
        $setWindowFields: {
          partitionBy: null,
          sortBy: { "_id.year": 1, "_id.month": 1 },
          output: {
            previousTotalSales: {
              $shift: {
                output: "$totalSales",
                by: -1,
              },
            },
          },
        },
      },
      {
        $addFields: {
          growthRate: {
            $cond: {
              if: { $eq: ["$previousTotalSales", 0] },
              then: null,
              else: {
                $divide: [
                  { $subtract: ["$totalSales", "$previousTotalSales"] },
                  "$previousTotalSales",
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          year: "$_id.year",
          month: "$_id.month",
          growthRate: { $multiply: ["$growthRate", 100] }, // Convert to percentage
        },
      },
    ]);

    res.json(salesGrowth);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRepeatCustomers = async (req, res) => {
  try {
    const repeatCustomers = await Order.aggregate([
      {
        $addFields: {
          created_at_date: {
            $cond: {
              if: { $eq: [{ $type: "$created_at" }, "string"] },
              then: { $dateFromString: { dateString: "$created_at" } },
              else: "$created_at",
            },
          },
        },
      },
      {
        $group: {
          _id: "$customer.id",
          firstOrderDate: { $min: "$created_at_date" },
          orderCount: { $sum: 1 },
        },
      },
      {
        $match: {
          orderCount: { $gt: 1 }, // Repeat customers have more than 1 order
        },
      },
      {
        $project: {
          _id: 0,
          customerId: "$_id",
          firstOrderDate: 1,
          orderCount: 1,
        },
      },
    ]);

    res.json(repeatCustomers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomerLifetimeValue = async (req, res) => {
  try {
    const customerLifetimeValue = await Order.aggregate([
      {
        $addFields: {
          created_at_date: {
            $cond: {
              if: { $eq: [{ $type: "$created_at" }, "string"] },
              then: { $dateFromString: { dateString: "$created_at" } },
              else: "$created_at",
            },
          },
        },
      },
      {
        $group: {
          _id: {
            customerId: "$customer.id",
            cohort: { $dateToString: { format: "%Y-%m", date: "$created_at_date" } },
          },
          totalSpent: { $sum: { $toDouble: "$total_price" } },
          firstOrderDate: { $min: "$created_at_date" },
        },
      },
      {
        $sort: { "firstOrderDate": 1 }
      },
      {
        $group: {
          _id: "$_id.cohort",
          customers: {
            $push: {
              customerId: "$_id.customerId",
              totalSpent: "$totalSpent"
            }
          },
          cohortTotalValue: { $sum: "$totalSpent" },
          cohortCustomerCount: { $sum: 1 }
        },
      },
      {
        $project: {
          _id: 0,
          cohort: "$_id",
          cohortTotalValue: 1,
          cohortCustomerCount: 1,
          customers: 1
        },
      }
    ]);

    res.json(customerLifetimeValue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
