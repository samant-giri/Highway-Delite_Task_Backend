import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/features.js";


export const userRegistration = async (req : Request, res : Response, next : NextFunction) => {

    try {
        const { firstName, lastName, email, password } = req.body;

        console.log(firstName, lastName);

        const user = await User.findOne({ email });

        if (user) return next(new ErrorHandler("User already exists", 400));

        await User.create({
          firstName,
          lastName,
          email,
          password,
        });

        res.status(201).json({
          success: true,
            message: `User created successfully`,
          name: `${firstName} ${lastName}`,
        });
    } catch (error) {
        console.log(error);
    }

}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user)
          return next(new ErrorHandler("Please Signup, User not registered", 404));

        const isPasswordMatched = user.password === password;

        if (!isPasswordMatched)
          return next(new ErrorHandler("Invalid email or password", 400));

        res.status(200).json({
          success: true,
          message: `Welcome back ${user.firstName} ${user.lastName}`,
          name: `${user.firstName} ${user.lastName}`,
        });
    } catch (error) {
        console.log(error);
    }
}