import { Request, Response } from "express";
import * as UserService from "../services/user.service";
import { Role } from "@prisma/client";


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({success:false,message:"faild to fetch user"})
  }
};
