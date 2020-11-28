const passport = require("passport");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Cashier = require("../models/cashier");
const Op = Sequelize.Op;
const BCRYPT_SALT_ROUNDS = 12;

const LocalStrategy = require("passport-local").Strategy;

const errHandler = (err) => {
  console.log("Error :: " + err);
};

passport.serializeUser((user, done) => {
  done(null, user.ID);
});

passport.deserializeUser((id, done) => {
  User.findOne({ where: { ID: id } }).then((user) => {
    done(null, user);
  });
});

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
      session: false,
    },
    async (req, email, password, done) => {
      try {
        console.log(Cashier);
        const user = await Cashier.findOne({
          where: {
            [Op.or]: [
              {
                email,
              },
              { email: req.body.email },
            ],
          },
        });
        if (user != null) {
          console.log("username or email already taken");
          return done(null, false, {
            message: "username or email already taken",
          });
        }
        bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
          Cashier.create({
            email,
            password: hashedPassword,
          }).then((user) => {
            console.log("Cashier created");
            return done(null, user);
          });
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await Cashier.findOne({
          where: {
            email,
          },
        });
        if (user === null) {
          return done(null, false, { message: "bad username" });
        }
        const response = await bcrypt.compare(password, user.password);
        if (response !== true) {
          console.log("passwords do not match");
          return done(null, false, { message: "passwords do not match" });
        }
        console.log("Cashier found & authenticated");
        return done(null, user);
      } catch (err) {
        console.log(err);
      }
    }
  )
);
