const User = require("../models/user");
const { ctrlWrapper } = require("../helpers");

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { subscription });

  res.json({
    mesage: 'Subscription updated successfully'
  })
}

module.exports = {
  updateSubscription: ctrlWrapper(updateSubscription),
}