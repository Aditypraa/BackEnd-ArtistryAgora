const { StatusCodes } = require('http-status-codes');
const { getAllOrders, processUpdateOrder } = require('../../../services/mongoose/ordersMongoose');

const index = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);
    res.status(StatusCodes.OK).json({ data: { order: result.data, pages: result.pages, total: result.total } });
  } catch (err) {
    next(err);
  }
};

const processInvoiceWebhook = async (req, res, next) => {
  try {
    const result = await processUpdateOrder(req);
    res.status(StatusCodes.OK).json();
  } catch (err) {
    next(err);
  }
};

module.exports = { index, processInvoiceWebhook };
