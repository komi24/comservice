'use strict';

import mongoose from 'mongoose';

var LiveSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Live', LiveSchema);
