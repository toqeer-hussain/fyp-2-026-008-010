var mongoose = require("mongoose");
var Transcation = new mongoose.Schema(
  {
    price: { type: String, required: true, trim: true },

    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BankDetail",
    },
  },
  { timestamps: true, autoIndex: false }
);
module.exports = mongoose.model("Transaction", Transcation);
