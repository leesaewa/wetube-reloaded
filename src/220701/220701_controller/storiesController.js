export const home = (req, res) => res.send("Home");
export const trending = (req, res) => res.send("Trending");
export const newPage = (req, res) => res.send("New");

export const story = (req, res) => res.send("Story Home");
export const storyId = (req, res) => {
  return res.send(`Story id #${req.params.id}`);
};
export const storyEdit = (req, res) => res.send("Story Edit");
export const storyDelete = (req, res) => res.send("Story Delete");
