import joi from "joi";

const signupValidations = joi.object(
  {                         // sanitation               // validation
    username: joi.string().trim().lowercase().required().max(30).alphanum(),
    password: joi.string().trim().required().min(6).max(30),
    email: joi.string().trim().required().email()
  } );

// sanitization of data, before storing it in the db---------- username, password, email: trim   username---lowercase
// *** ( apply these same transformations (lowercasing and trimming) when you're comparing the username during login)

const loginValidations = joi.object(
  {
    username: joi.string().required().trim().lowercase(),
    password: joi.string().required().trim()
  }
);

const chatValidations = joi.object(
  {
    content: joi.string().required()
  }
);
  
  
  

// user validation middlewares
function signupValidator(req, res, next) {
  let result = signupValidations.validate(req.body);
  if(!result.error) {
    req.body = result.value;    // sanitized data
    next();
  } else {
    res.status(202).send(result.error.message);
  }
}

function loginValidator(req, res, next) {
  let result = loginValidations.validate(req.body);
  if(!result.error) {
    req.body = result.value;
    next();
  } else {
    res.status(202).send(result.error.message);
  }
}

// chat validation middlewares

function newChatValidator(req, res, next) {
  let result = chatValidations.validate(req.body);
  if(!result.error) {
    next();
  } else {
    res.status(202).send("Writing a Message is Mandatory.");
  }
}

export {signupValidator, loginValidator, newChatValidator};

