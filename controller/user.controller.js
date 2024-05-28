import UserModal from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createUser(req, res) {
  const { firstname, lastname, phone, email, password, confirmPassword } =
    req.body;
  if (
    !firstname ||
    !lastname ||
    !phone ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    return res.status(400).json({ error: "Please add all the fields" });
  }

  const passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}/;

  if (
    password !== confirmPassword ||
    firstname.length < 3 ||firstname.length > 40 || lastname.length > 40 || 
    lastname.length < 2 ||
    phone.length !== 10 ||
    password.length > 25 ||
    !(passwordPattern.test(password))
  ) {
    return res.status(400).json({ error: "Fields are not valid" });
  }

  try {
    await UserModal.create({ email, firstname, lastname, phone, password });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log("[ERROR::CREATEUSER]", error);
    return res.status(500).json({ success: false });
  }
}

export async function validatePassword({ email, password }) {
  try {
    const user = await UserModal.findOne({ email });

    if (!user) return false;

    const match = await bcrypt.compare(password, user.password);

    if (!match) return false;

    return user;
  } catch (error) {
    console.log("[ERROR::VALIDATEPASSWORD]", error);
    return false;
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(404)
      .json({ message: "email and password both are required!" });
  }

  try {
    const user = await validatePassword({ email, password });

    if (!user) return res.status(401).send("Invalid email or password.");

    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "lax",
      secure: true,
      domain: process.env.NODE_ENV==="production" ? "presidio-backend-ucbp.onrender.com" :  "localhost",

    });

    return res.status(200).json({ message: "login successfully" });
  } catch (error) {
    console.log("[ERROR::LOGINUSER]", error);
    return res.sendStatus(500);
  }
}

export async function getCurrentUser(req, res) {
  const userId = res.locals.userId;

  try {
    const user = await UserModal.findOne({ _id: userId })
      .select("-password")
      .lean();

    if (!user) return res.status(404).json({ message: "user not found!" });
    return res.send(user);
  } catch (error) {
    console.log("[ERROR::GETCURRENTUSER]", error);
    return res.sendStatus(500);
  }
}


// logout

export async function logoutHandler(req,res){
    res.clearCookie("jwt");
    return res.sendStatus(200);
}