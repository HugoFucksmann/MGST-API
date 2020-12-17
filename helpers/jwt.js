const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
  return new Promise((res, rej) => {
    const payload = {
      uid,
    };

    jwt.sign(
      payload,
      process.env.SECRETJWT,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("no se pudo generar el JWT");
        } else {
          res(token);
        }
      }
    );
  });
};
const verificarJWT = (ctx) => {
    const token = ctx.res.req.headers.token || '';
      try {
        const {uid} = jwt.verify(token, process.env.SECRETJWT);
        return uid
      } catch (err) {
        console.log(err);
        return false;
      }
}
module.exports = {
  generarJWT,
  verificarJWT,
};
