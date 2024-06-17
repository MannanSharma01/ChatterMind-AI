import User from "../models/user.js";

async function signup(req, res, next) {
  const {username, email, password} = req.body;
  const newUser = new User({
    email,
    username
  });
  try {
    let user = await User.register(newUser, password);

    req.login(user, async () => {
      user = await User.findOne({username: username});
      req.session.save( () => {
        res.status(200).send(user);
      }); 
    });
    
  } catch(err) {
    res.status(202).send(`A client has already registered as a user, with the same username or email.`)
  } 
}

async function loginDone(req, res) {
  let user = await User.findOne({username: req.body.username});
  res.status(200).send(user);
}

function loginFail(req, res) {
  res.status(202).send("Incorrect username or password");
}

function logout(req, res) {
  req.logout( () => {      // 0 chance of any error here
    req.session.save(() => {
      res.status(200).send("done");
    })
  });
}

async function checkAuthStatus(req, res) {
  if(req.user) {      // i.e, req.isAuthenticated()
    let user = await User.findById(req.user._id);
    return res.send(user);
  }
  res.send("keep the client, logged out as a user.");
}


export { signup, loginDone, loginFail, logout, checkAuthStatus};