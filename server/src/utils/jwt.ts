import jwt from "jsonwebtoken";
export const generateAccesstoken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN as string, {
    expiresIn: "7d",
  });
};

export const generateRefreshtoken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN as string, {
    expiresIn: "7d",
  });
};
