const User = require("../models/user");
const { ctrlWrapper, HttpError } = require("../helpers");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../", "public", "avatars")

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { subscription });

  res.json({
    mesage: 'Subscription updated successfully'
  })
}

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, 'File is missed');
  }
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`
  const resultUpload = path.join(avatarDir, filename);

  Jimp.read(tempUpload, (err, image) => {
    if (err) throw err;
    image
      .resize(250, 250)
      .quality(90)
      .write(tempUpload, () => {
        fs.rename(tempUpload, resultUpload);
      });
  });
  const avatarURL = path.join("avatars", filename)
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL
  })
}

module.exports = {
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
}