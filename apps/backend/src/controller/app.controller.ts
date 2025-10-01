import { Request, Response } from "express";

import HttpStatus  from "http-status";
import appService from "../services/app.service";
import { response } from "../utils/responses";
const loggerFunction=(req:Request,res:Response)=>{
    const answer= appService.logger();

    return response(res,HttpStatus.OK,"All Okay",answer);
}

export default{
    loggerFunction
}