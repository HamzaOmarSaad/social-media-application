import { ISucess } from "../types/res";

export const sucessRes = ({
  res,
  message,
  data = {},
  statusCode = 200,
}: ISucess) => {
  return res.status(statusCode).json({
    message,
    statusCode,
    data,
  });
};
