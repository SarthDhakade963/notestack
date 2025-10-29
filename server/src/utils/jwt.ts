import jwt from "jsonwebtoken";
export const generateAccesstoken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: "7d",
  });
};

export const generateRefreshtoken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "7d",
  });
};
