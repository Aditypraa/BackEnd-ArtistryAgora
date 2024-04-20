const OrdersModel = require("../../api/v1/orders/ordersModel");

const getAllOrders = async (req) => {
  const { limit = 10, page = 1, startDate, endDate } = req.query;
  let condition = {};

  // let match = {};
  if (req.user.role !== "owner") {
    condition = { ...condition, "historyEvent.organizer": req.user.organizer };
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59);
    condition = {
      ...condition,
      date: {
        $gte: start,
        $lte: end,
      },
    };
  }

  const result = await OrdersModel.find(condition)
    // .populate({ path: "event", match: { organizer: req.user.organizer } })
    .limit(limit)
    .skip(limit * (page - 1));

  const count = await OrdersModel.countDocuments(condition);

  return { data: result, pages: Math.ceil(count / limit), total: count };
};

module.exports = { getAllOrders };
