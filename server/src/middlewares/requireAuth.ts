import { verifyAuthToken } from "../utils/jwt";

const getCookieValue = (cookieHeader: string | undefined, key: string) => {
  if (!cookieHeader) {
    return undefined;
  }

  const cookie = cookieHeader
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${key}=`));

  return cookie?.slice(key.length + 1);
};

export const authMIddleware = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : undefined;
  const cookieToken = getCookieValue(req.headers.cookie, "auth_token");
  const token = bearerToken || cookieToken;

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const user = verifyAuthToken(token);

  if (!user) {
    return res.status(401).json({ message: "unauthorized" });
  }

  req.user = user;
  next();
};
