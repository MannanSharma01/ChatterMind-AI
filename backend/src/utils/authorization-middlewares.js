function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.status(202).send("You must be logged-in as a user to perform this action.");
}

function notLoggedIn(req, res, next) {
  if(!req.isAuthenticated()) {
    next();
  } else {
    res.status(202).send("You are already logged-in as a user.");
  }
}

export {isLoggedIn, notLoggedIn};