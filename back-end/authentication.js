const mysql = require("mysql");
const sha256 = require("sha256");
const auth = require("basic-auth");
const jwt = require('jsonwebtoken');
const randomString = require('randomstring');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-926171.okta.com/oauth2/aus261jt4waqRdGWf4x6',
});

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "nsoric_login"
  });

// const pool = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "nsoric_login"
//   });

// function dbConnect() {
//     db.connect(err => { 
//         if (err) { 
//           throw err; 
//         } else { 
//           console.log("MySql Connected"); 
//         }
//         });
        
const basicAuth = (req, res, next) => {
  let user = auth(req);
  let userLogin = user.name;
  let passSha256 = sha256(user.pass);
  // let userLogin = req.body.email;
  // let passSha256 = sha256(req.body.password);

  pool.query("SELECT password from users WHERE login = ?", [userLogin], (err, result) => {
        // if (err || result.length == 0 )
        if (err) {
          res.status(500).json({ message: "Internal server error" });
        } else if (result.length == 0 || result[0].password !== passSha256) {
          res.status(401).json({ message: "Unauthorized" });
        } else if (result[0].password === passSha256) {
          next();
        }
  });
};

const jwtAuth = (req, res, next) => {
    let token  = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
    res.status(401).send({ message: "Unauthorized" });
    } else {
    let payload = jwt.verify(token, 'secureKey');
    if (!payload) {
     res.status(401).send({ message: "Unauthorized" });
    } else {
      next();
    }
  }
}

const apiKeyGen = (userName, res) => {
  let apiKey = randomString.generate(6) + sha256(userName) + randomString.generate(6);
  let sqlString = "UPDATE users SET apikey = ? WHERE login = ?";
  userName.unshift(apiKey);

  pool.query(sqlString, userName, (err, result) => {
    if (err) {
      res.status(500).send({ message: "Server error"});
    } else if (result.affectedRows === 0) {
      res.status(400).send({ message: "Incomplete source information" });
    } else {
      res.status(200).send({apiKey});
    }
  });

}

const apiKeyAuth = (req, res, next) => {
  let apiKey  = req.headers.authorization.split(' ')[1];
  let sqlString = "SELECT apikey from users WHERE apikey = ?";
 
  pool.query(sqlString, apiKey, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Internal server error" });
    } else if (result.length !== 0 ) {
      next();
    } else {
    res.status(401).json({ message: "Unauthorized" });
    }
  });
}

const apiKeyLogOut = (req, res) => {
  let apiKey  = req.headers.authorization.split(' ')[1];
  let sqlString = "UPDATE users SET apikey = null WHERE apikey = ?";
  // console.log(req.body.apikey);

  pool.query(sqlString, apiKey, (err, result) => {
    if (err) {
      res.status(500).send({ message: "Server error"});
    } else if (result.affectedRows === 0) {
      res.status(400).send({ message: "Incomplete source information" });
    } else {
      res.status(200).send(true);
    }
  });
}

const oAuth2 = async (req, res, next) => {
   let token = req.headers.authorization.split(' ')[1];
   let token2 = token.substring(31);
   const oAuth = token2.split('"')[0];
 
  try {
    await oktaJwtVerifier.verifyAccessToken(oAuth);
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

const tableData = (req, res) => {
  let sqlString = "SELECT * from apps";
 
  pool.query(sqlString, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Internal server error" });
    } else if (result.length !== 0 ) {
      res.status(200).send(result);
    } else {
    res.status(401).json({ message: "Unauthorized" });
    }
  });
}

exports.basicAuth = basicAuth;
exports.pool = pool; 
exports.jwtAuth = jwtAuth;
exports.apiKeyAuth = apiKeyAuth;
exports.apiKeyGen = apiKeyGen;
exports.apiKeyLogOut = apiKeyLogOut;
exports.tableData = tableData;
exports.oAuth2 = oAuth2;
