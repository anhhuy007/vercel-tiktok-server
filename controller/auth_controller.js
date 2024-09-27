const postgres = require("../database/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  authenticateToken,
  generateAccessToken,
  generateRefreshToken,
} = require("../token/auth_token");
const saltRounds = 10;
require("dotenv").config();
let refreshTokens = [];

const authController = {
  getAccounts: async (req, res) => {
    await authenticateToken(req, res, async () => {
      try {
        const query = "SELECT * FROM account";
        const { rows } = await postgres.query(query);
        res.json({ msg: "OK", data: rows });
      } catch (error) {
        console.log("Error: ", err);
        res.status(401).json({ msg: error.msg });
      }
    });
  },
  signup: async (req, res) => {
    try {
      const { email, password, username, name } = req.body;

      if (!email || !password || !username || !name)
        return res.status(400).json({ msg: "Please fill in all the fields" });

      // check if account already exists
      const exists = await postgres.query(
        "SELECT * FROM account WHERE email = $1",
        [email]
      );
      if (exists.rows.length > 0)
        return res.status(409).json({ msg: "Account already exists" });

      // check if username already exists
        const exists2 = await postgres.query(
            "SELECT * FROM account WHERE username = $1",
            [username]
        );
        if (exists2.rows.length > 0)
            return res.status(409).json({ msg: "Username already exists" });

      // insert into ACCOUNT table
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const query =
        "INSERT INTO account (username, email, password) VALUES ($1, $2, $3) RETURNING *";
      let { rows } = await postgres.query(query, [
        username,
        email,
        hashedPassword,
      ]);
      const account = rows[0];

      // insert into USER_INFO table
      const handle = "@" + username;
      const defaultAvatar =
        "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png";
      const defaultThumbnail =
        "https://cdn.pixabay.com/photo/2023/02/03/05/11/youtube-background-7764170_1280.jpg";
      const query2 =
        "INSERT INTO user_info (id, handle, name, avatar_url, thumbnail_url) VALUES ($1, $2, $3, $4, $5) RETURNING *";
      await postgres.query(query2, [
        account.id,
        handle,
        name,
        defaultAvatar,
        defaultThumbnail,
      ]);

      // return created account

      res.json({ msg: "Signup successful", data: rows });
    } catch (error) {
      console.log("Error: ", error);
      res.status(400).json({ msg: error.msg });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const query = "SELECT * FROM ACCOUNT WHERE email = $1";
      const { rows } = await postgres.query(query, [email]);

      if (rows.length === 0) {
        res.status(404).json({ msg: "Account not found" });
      } else {
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = generateAccessToken({
            email: user.email,
            username: user.username,
          });
          const refreshToken = generateRefreshToken({
            email: user.email,
            username: user.username,
          });
          refreshTokens.push(refreshToken);

          res.json({
            msg: "Login successfull",
            data: {
              token: token,
              refresh_token: refreshToken,
              user: {
                id: user.id,
                email: user.email,
                username: user.username,
              },
            },
          });
        } else {
          res.status(401).json({ msg: "Invalid password" });
        }
      }
    } catch (error) {
      console.log("Error: ", error);
      res.status(401).json({ msg: error.msg });
    }
  },
  token: async (req, res) => {
    try {
      const refreshToken = req.body.refresh_token;
      if (refreshToken === null) return res.sendStatus(401);
      if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403); // The token is not valid

      jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({
          email: user.email,
          username: user.username,
        });
        res.json({ accessToken });
      });
    } catch (err) {
      console.log("Error: ", err);
      res.sendStatus(401).json({ msg: err.msg });
    }
  },
  logout: async (req, res) => {
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.body.refresh_token
    );
    res.sendStatus(204);
  },
  findEmail: async (req, res) => {
    try {
      const { email } = req.body;
      const query = "SELECT * FROM account WHERE email = $1";
      const { rows } = await postgres.query(query, [email]);
      if (rows.length === 0) {
        res.status(404).json({ msg: "Account not found" });
      } else {
        res.json({ msg: "Account found", data: rows[0] });
      }
    } catch (error) {
      console.log("Error: ", error);
      res.status(401).json({ msg: error.msg });
    }
  },
  findUsername: async (req, res) => {
    try {
      const { username } = req.body;
      const query = "SELECT * FROM account WHERE username = $1";
      const { rows } = await postgres.query(query, [username]);
      if (rows.length === 0) {
        res.status(404).json({ msg: "Account not found" });
      } else {
        res.json({ msg: "Account found", data: rows[0] });
      }
    } catch (error) {
      console.log("Error: ", error);
      res.status(401).json({ msg: error.msg });
    }
  },
};

module.exports = authController;
