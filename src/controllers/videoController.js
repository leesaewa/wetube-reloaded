import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = (req, res) => {
  const { id } = req.params;
  //const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watching ` });
};

//화면에 보여주는 것
export const getEdit = (req, res) => {
  const { id } = req.params;
  //const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Editing` });
};

//변경사항을 저장해줌
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload" });
};
export const postUpload = (req, res) => {
  return res.redirect("/");
};
