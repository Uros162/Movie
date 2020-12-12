import { AdministartorService } from 'src/services/administartor/administartor.service';
import { jwtSecret } from './../../config/jwt.secret';
import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction,Request,Response } from "express";
import * as jwt from 'jsonwebtoken'
import { JwtDataAdministratorDto } from "src/dtos/jwt.data.dto";

@Injectable()
export class AuthMiddleware implements NestMiddleware{

    constructor(private readonly administratorService: AdministartorService){}
   async  use(req:Request,res:Response,next:NextFunction){

        if(!req.headers.authorization){
            throw new HttpException("token not found",HttpStatus.UNAUTHORIZED);

        }

        const token = req.headers.authorization;

        const tokenParts = token.split(' ');

        console.log(tokenParts.length);

        if(tokenParts.length !== 2){
            throw new HttpException('Bad token 0'+tokenParts.length,HttpStatus.UNAUTHORIZED);

        }
        const tokenString = tokenParts[1];

        const jwtData:JwtDataAdministratorDto = jwt.verify(tokenString,jwtSecret);

        if(!jwtData){
            throw new HttpException('Bad token 1',HttpStatus.UNAUTHORIZED);

        }

        if(jwtData.ip !== req.ip.toString()){
            throw new HttpException('Bad token 2',HttpStatus.UNAUTHORIZED);

        }

        if(jwtData.ua !== req.headers['user-agent']){
            throw new HttpException('Bad token 3',HttpStatus.UNAUTHORIZED);

        }
        const administrator  = await this.administratorService.getById(jwtData.administratorId);

        if(!administrator){
            throw new HttpException('Account not found',HttpStatus.UNAUTHORIZED);

        }

        const trenutniTimeStamp = new Date().getTime()/100;

        if(trenutniTimeStamp >= jwtData.ext){
            throw new HttpException('The token has expired',HttpStatus.UNAUTHORIZED);
        }

        next();
    }
}