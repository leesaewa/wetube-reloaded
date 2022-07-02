export const join = (req, res) => res.send("join");
export const login = (req, res) => res.send("login");

export const users = (req, res) => res.send("Users");
export const userEdit = (req, res) => res.send("user Edit profile");
export const userId = (req, res) => {
  return res.send(`User id #${req.params.id}`);
};
