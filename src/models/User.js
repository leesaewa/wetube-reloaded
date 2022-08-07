import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  word: { type: String, maxLength: 200 },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
  comments: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
  ],

  //소유주는 여러 개의 비디오를 가질 수 있어서 배열(array)을 사용
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

// userSchema.static("changePathFormula", (urlPath) => {
//   return urlPath.replace(/\\/g, "/");
// });

const User = mongoose.model("User", userSchema);
export default User;
