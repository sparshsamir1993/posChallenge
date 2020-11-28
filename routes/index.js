const passport = require("passport");
const Cashier = require("../models/cashier");

let router = require("express").Router();
const errHandler = (err) => {
  console.log("\n\n  *****  Error  **** :: " + err);
};

router.post("/login", (req, res) => {
  passport.authenticate("login", async (err, users, info) => {
    if (err) {
      console.error(`error ${err}`);
    }
    if (info !== undefined) {
      if (info.message === "bad username") {
        res.status(401).send(info.message);
      } else {
        res.status(403).send(info.message);
      }
    } else {
      req.logIn(users, async () => {
        const user = await Cashier.findOne({
          where: {
            email: req.body.email,
          },
        });
        req.session.user = user;
        res.status(200).send({
          auth: true,
          message: "user found & logged in",
          id: user.id,
          email: user.email,
        });
        console.log(req.session);
      });
    }
  })(req, res);
});

router.post("/register", (req, res) => {
  passport.authenticate("register", (err, user, info) => {
    console.log(err, user, info);
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      res.status(403).send(info.message);
    } else {
      // console.log(user);
      req.logIn(user, (error) => {
        res.status(200).send({ message: "user created", id: user.id });
      });
    }
  })(req, res);
});
router.patch("/setCreditLimit", async (req, res) => {
  console.log(req.session);
  let { id, limit } = req.body;
  let resp = await Cashier.findOne({
    where: { id },
  }).catch(errHandler);

  await resp
    .update({
      creditLimit: limit,
    })
    .catch(errHandler);
  let { creditLimit, email } = resp;
  req.session.user = resp.dataValues;
  req.session.save(function () {
    console.log(req.session);
    res.status(200).send({ id: resp.id, creditLimit, email });
  });
});

router.get("/currentUser", async (req, res) => {
  if (req.session.user) {
    let { id } = req.session.user;
    let user = await Cashier.findOne({ where: { id } });
    let { email, creditLimit } = user;
    return res.status(200).json({ id, email, creditLimit });
  }

  res.status(200).json({ data: "user not found" });
});
router.post("/logout", async (req, res) => {
  req.session.destroy();
  res.clearCookie("user_sid");
  res.status(200).json({ message: "Logged out" });
});

module.exports = router;
