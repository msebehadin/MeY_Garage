export const authMIddleware = async (req: any, res: any, next: any) => {
  const session = req.session;
  if (!session?.user) {
    return res.status(401).json({ message: "unauthorized" });
  }
  req.user = session.user;
  next();
};
