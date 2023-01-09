"use strict";
const mongoose = require("mongoose");
const schema = mongoose.Schema({
    answer: { type: String },
});
module.exports = mongoose.model("Post", schema);
