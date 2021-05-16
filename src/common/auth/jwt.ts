import jwt from "jsonwebtoken";
import UserRepository from "../../users/user.repository";

export async function generate(user) {
  try {
    const today = new Date();
    const token = jwt.sign(
      {
        data: user,
        exp: new Date(today.setMonth(today.getMonth() + 1)).getTime(),
      },
      process.env.SECRET
    );
    if (!token) {
      return {
        error: true,
        message: "Error generating token, try again.",
      };
    }
    return {
      error: false,
      message: "token generated successfully",
      token,
    };
  } catch (error) {
    return {
      error: true,
      message: error,
    };
  }
}

export async function verify(headers) {
  if (!headers || !headers.authorization)
    return {
      error: true,
      valid: false,
      message: "You must be logged in to access this endpoint",
    };

  try {
    const token = headers.authorization.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.SECRET);
    if (!decoded)
      return {
        error: true,
        valid: false,
        message: "Invalid token",
      };

    const now = new Date().getTime();
    if (now > decoded.exp)
      return {
        error: true,
        valid: false,
        message: "Token expired",
      };
    const user = await new UserRepository().get(decoded.data._id).lean();
    if (!user)
      return {
        error: true,
        valid: false,
        message: "User not found",
      };
    return {
      error: false,
      valid: true,
      message: "Token validated successfully",
      user,
    };
  } catch (err) {
    return {
      error: true,
      valid: false,
      ...err,
    };
  }
}
