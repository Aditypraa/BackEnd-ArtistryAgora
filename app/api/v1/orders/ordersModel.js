const mongoose = require("mongoose");

const orderDetailSchema = new mongoose.Schema({
  ticketCategories: {
    type: {
      type: String,
      required: [true, "Tipe Tiket Harus Diisi"],
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  sumTicket: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    personalDetail: {
      firstName: {
        type: String,
        required: [true, "Nama Depan Harus Diisi"],
        minlength: 3,
        maxlength: 50,
      },
      lastName: {
        type: String,
        required: [true, "Nama Belakang Harus Diisi"],
        minlength: 3,
        maxlength: 50,
      },
      email: {
        type: String,
        required: [true, "Email Harus Diisi"],
      },
      role: {
        type: String,
        default: "Designer",
      },
      status: {
        type: String,
        default: "Pending",
      },
    },
    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    totalPay: {
      type: Number,
      required: true,
    },
    totalOrderTicket: {
      type: Number,
      required: true,
    },
    orderItems: [orderDetailSchema],
    participant: {
      type: mongoose.Types.ObjectId,
      ref: "Participant",
      required: true,
    },
    payment: {
      type: mongoose.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    event: {
      type: mongoose.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    historyEvent: {
      // title: {
      //   type: String,
      //   required: [true, "Judul Event harus diisi"],
      //   minlength: 3,
      //   maxlength: 50,
      // },
      // date: {
      //   type: Date,
      //   required: [true, "Tanggal Event harus diisi"],
      // },
      // about: {
      //   type: String,
      // },
      // tagline: {
      //   type: String,
      //   required: [true, "Tagline Event harus diisi"],
      // },
      // keyPoint: {
      //   type: [String],
      // },
      // venueName: {
      //   type: String,
      //   required: [true, "Tempat Acara harus diisi"],
      // },
      // statusEvent: {
      //   type: String,
      //   enum: ["Draft", "Published"],
      //   default: "Draft",
      // },
      // tickets: {
      //   type: [ticketCategoriesSchema],
      //   required: true,
      // },
      // image: {
      //   type: mongoose.Types.ObjectId,
      //   ref: "Image",
      //   required: true,
      // },
      // category: {
      //   type: mongoose.Types.ObjectId,
      //   ref: "Category",
      //   required: true,
      // },
      // talent: {
      //   type: mongoose.Types.ObjectId,
      //   ref: "Talent",
      //   required: true,
      // },
      organizer: {
        type: mongoose.Types.ObjectId,
        ref: "Organizer",
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
