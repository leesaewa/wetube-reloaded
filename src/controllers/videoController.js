import User from "../models/User";
import Comment from "../models/Comment";
import Video from "../models/Video";

export const main = (req, res) => {
  return res.render("main", { pageTitle: "MARAUDERS" });
};

export const error = (req, res) => {
  return res.render("404", { pageTitle: "404 Error" });
};

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "MARAUTUBE", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner").populate("comments");
  //const owner = await User.findById(video.owner);
  //console.log(video);

  if (!video) {
    //에러먼저 처리해주는 게 좋음.
    return res.status(404).redirect("/404");
  }
  const comments = await Comment.find({ video: video._id });
  return res.render("watch", { pageTitle: video.title, video, comments });
};

export const getEdit = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
  } = req;

  const video = await Video.findById(id);
  if (!video) {
    //에러먼저 처리해주는 게 좋음.
    return res.status(404).redirect("/404");
  }

  if (String(video.owner) !== String(_id)) {
    req.flash("error", "Not authorized");
    return res.status(403).redirect("/home");
  }
  return res.render("edit", { pageTitle: `Editing ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const {
    params: { id },
    body: { title, description, hashtags },
    session: {
      user: { _id },
    },
  } = req;

  const video = await Video.findById({ _id: id });

  if (!video) {
    return res.status(404).redirect("/404");
  } else if (String(video.owner) !== String(_id)) {
    req.flash("error", "You are not the owner of the video");
    return res.status(403).redirect("/home");
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });

  req.flash("success", "수정했습니다.");
  return res.redirect(`/videos/${id}`);
};

//
// upload
//
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload" });
};
export const postUpload = async (req, res) => {
  const {
    body: { title, description, hashtags },
    files: { video, thumb },
    session: {
      user: { _id },
    },
  } = req;

  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: video[0].location,
      thumbUrl: thumb[0].location,
      createdAt: new Date(),
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });

    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/home");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

//
// recorder
//

export const recorder = (req, res) => {
  return res.render("recorder", { pageTitle: "Video Recorder" });
};

//
//비디오 삭제
//
export const deleteVideo = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
  } = req;

  const video = await Video.findById(id);
  const user = await User.findById(_id);

  if (!video) {
    return res.status(404).redirect("/404");
  }

  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/home");
  }

  await Video.findByIdAndDelete(id);
  user.videos.splice(user.videos.indexOf(id), 1);
  user.save();
  return res.redirect("/home");
};

// search
export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    //search
    videos = await Video.find({
      title: {
        $regex: new RegExp(`^${keyword}`, "i"),
      },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: `'${keyword}' 검색 결과`, videos });
};

//
// view
//
export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

//
// comment
export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;

  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }

  const ownerUser = await User.findById({ _id: user._id });

  const comment = await Comment.create({
    text,
    owner: user._id,
    ownerAvatar: user.avatarUrl,
    ownerName: user.name,
    video: id,
    socialCheck: user.socialOnly,
    createdAt: new Date(),
  });

  ownerUser.comments.push(comment._id);
  video.comments.push(comment._id);
  await video.save();
  await ownerUser.save();

  return res.status(201).json({
    newCommentId: comment._id,
    ownerAvatar: user.avatarUrl,
    ownerName: user.name,
    socialCheck: user.socialOnly,
    owner: user._id,
    createdAt: new Date(),
  });
};

export const deleteComment = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id: userId },
    },
  } = req;

  const comment = await Comment.findById({ _id: id });
  const user = await User.findById({ _id: comment.owner });
  const video = await Video.findById({ _id: comment.video });

  if (!comment) {
    return res.sendStatus(404);
  }

  if (String(comment.owner) !== String(userId)) {
    req.flash("error", "You are not the owner of this comment.");
    return res.sendStatus(404);
  }

  await user.comments.pull(comment._id);
  await user.save();
  await video.comments.pull(comment._id);
  await video.save();
  await Comment.findByIdAndRemove(comment._id);
  return res.sendStatus(200);
};
