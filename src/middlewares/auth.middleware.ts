import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AdministartorService } from "src/services/administartor/administartor.service";
import * as jwt from 'jsonwebtoken';
import { JwtDataAdministratorDto } from "src/dtos/administrator/jwt.data.administrator.dto";
import { jwtSecret } from "config/jwt.secret";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly administratorService: AdministartorService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        
        if (!req.headers.authorization) {
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
        }

        const token = req.headers.authorization;

        const tokenParts = token.split(' ');
        if (tokenParts.length !== 2) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        const tokenString = tokenParts[1];

        const jwtData: JwtDataAdministratorDto = Object(jwt.verify(tokenString, jwtSecret)) ;
        if (!jwtData) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        if (jwtData.ip !== req.ip.toString()) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        if (jwtData.ua !== req.headers["user-agent"]) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        const administrator = await this.administratorService.getById(jwtData.administratorId);
        if (!administrator) {
            throw new HttpException('Account not found', HttpStatus.UNAUTHORIZED);
        }

        const trenutniTimestamp = new Date().getTime() / 1000.0;
        if (trenutniTimestamp >= jwtData.exp) {
            throw new HttpException('The token has expired', HttpStatus.UNAUTHORIZED);
        }

        next();
    }

}