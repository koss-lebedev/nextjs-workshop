import jwt, { JwtPayload } from "jsonwebtoken";

const jwtAlgorithm = "HS256";
const jwtIssuer = "next-js-workshop";
const secret = "verySecretKey";

const issueJWT = (userEmail: string, expiresIn: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {},
      secret,
      {
        algorithm: jwtAlgorithm,
        issuer: jwtIssuer,
        subject: userEmail,
        expiresIn,
      },
      (err, token) => (err ? reject(err) : resolve(token!))
    );
  });
};

const verifyJWT = (token: string): Promise<JwtPayload | string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      secret,
      {
        algorithms: [jwtAlgorithm],
        issuer: jwtIssuer,
      },
      (err, authToken) => (err ? reject(err) : resolve(authToken!))
    );
  });
};

export { issueJWT, verifyJWT };
