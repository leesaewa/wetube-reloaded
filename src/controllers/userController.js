import User from "../models/User";
import fetch from "cross-fetch";
import bcrypt from "bcrypt";

export const getJoin = (req, res) =>
  res.render("users/join", { pageTitle: "Create Account" });
export const postJoin = async (req, res) => {
  const {
    name,
    username,
    email,
    password,
    password2,
    location,
    word,
    avatarUrl,
  } = req.body;
  const { file } = req;
  const pageTitle = "Join";
  if (password !== password2) {
    return res.status(400).render("users/join", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("users/join", {
      pageTitle,
      errorMessage: "This username/email is already taken",
    });
  }

  const isHeroku = process.env.NODE_ENV === "production";

  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
      word,
      avatarUrl: file ? (isHeroku ? file.location : file.path) : avatarUrl,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("users/join", {
      pageTitle: "Create Account",
      errorMessage: error._message,
    });
  }
};

//
// login
//

export const getLogin = (req, res) =>
  res.render("users/login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  //유저가 존재하는지 체크
  const user = await User.findOne({ username, socialOnly: false });
  if (!user) {
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/home");
};

//
// github login
//

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};
export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        avatarUrl: userData.avatar_url,
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/home");
  } else {
    return res.redirect("/login");
  }
};

//
// log out

export const logout = (req, res) => {
  // req.session.user = null;
  // res.locals.loggedInUser = req.session.user;
  req.session.loggedIn = false;
  req.flash("info", "logout sussece");
  return res.redirect("/");
};

//
// edit profile
//
export const getEdit = (req, res) => {
  res.render("edit-profile", { pageTitle: "Edit profile" });
};
export const postEdit = async (req, res) => {
  const pageTitle = "Edit profile";

  //로그인 된 유저 아이디 찾기
  const {
    session: {
      user: {
        _id,
        // username: findUsername,
        email: findEmail,
        socialOnly,
        avatarUrl,
      },
    },
    body: { name, email, location, word },
    file,
  } = req;

  //email 중복체크
  if (email !== findEmail) {
    const checkEmail = await User.findById({ email });
    if (checkEmail) {
      return res.status(400).render("edit-profile", {
        pageTitle,
        errorMessage: "This email is exists.",
      });
    }
  }

  // username 중복체크 -> 바꾸지 못하도록 함
  // if (username !== findUsername) {
  //   const checkUsername = await User.findById({ username });
  //   if (checkUsername) {
  //     return res.status(400).render("edit-profile", {
  //       pageTitle,
  //       errorMessage: "This username is exists.",
  //     });
  //   }
  // }

  // social check
  if (socialOnly && findEmail !== email) {
    return res.status(400).render("edit-profile", {
      pageTitle,
      errorMessage: "This email is can't change.",
    });
  }

  const isHeroku = process.env.NODE_ENV === "production";

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? (isHeroku ? file.location : file.path) : avatarUrl,
      name,
      email,
      location,
      word,
    },
    { new: true }
  );

  req.session.user = updatedUser;
  return res.redirect("/users/edit");
};

//
// change password
//

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    req.flash("error", "Can't change password");
    return res.redirect("/home");
  }
  return res.render("users/change-password", { pageTitle: "Change password" });
};
export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPass, newPass, newPass2 },
  } = req;

  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPass, user.password);
  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change password",
      errorMessage: "The current password is incorrect.",
    });
  }

  if (newPass !== newPass2) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change password",
      errorMessage: "The password does not match the confirmation.",
    });
  }

  //새 비밀번호 hash하기
  user.password = newPass;
  await user.save();
  req.flash("info", "Pashword updated");
  return res.redirect("/users/logout");
};

//
//
//
export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "videos",
    populate: {
      path: "owner",
      model: "User",
    },
  });

  if (!user) {
    return res.status(400).render("404", { pageTitle: "User not found" });
  }

  return res.render("users/profile", {
    pageTitle: `${user.name}의 Profile`,
    user,
  });
};
