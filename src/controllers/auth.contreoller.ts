import { jwtSecret } from './../../config/jwt.secret';


import { ApiResponse } from './../misc/api.response.class';
import { LoginAdministratorDto } from './../dtos/administrator/login.administrator.dto';
import { Body, Controller, Post, Req} from "@nestjs/common";
import { AdministartorService } from "src/services/administartor/administartor.service";
import  * as crypto from 'crypto'
import * as jwt from 'jsonwebtoken'
import { JwtDataAdministratorDto } from 'src/dtos/jwt.data.dto';
import{Request} from 'express'
import { LoginInfoAdministratorDto } from 'src/dtos/administrator/login.info.administrator.dto';
@Controller('auth')
export class AuthController {
    constructor(
        public administratorService: AdministartorService
    ) {

    }
    @Post('login')
      async  doLogin(@Body()data:LoginAdministratorDto,@Req() req:Request):Promise<ApiResponse | LoginInfoAdministratorDto >{
            const administrator =await  this.administratorService.getByUsername(data.username);

            if(!administrator){
                return new Promise(resolve =>{
                    resolve(new ApiResponse('error',-3001))
                })
            }
            const passwordHash = crypto.createHash('sha512');
            passwordHash.update(data.password);
            const passwordHashString = passwordHash.digest('hex').toUpperCase();

            if(administrator.passwordHash !== passwordHashString){
                return new Promise(resolve =>{
                    resolve(new ApiResponse('error',-3002))
                })
            }
            const jwtData = new JwtDataAdministratorDto();
            jwtData.administratorId = administrator.administratorId;
            jwtData.username = administrator.username;
            let sada = new Date();
            sada.setDate(sada.getDate()+14)
            const istekTimeStamp = sada.getTime() / 1000;
            jwtData.ext = istekTimeStamp;
            jwtData.ip = req.ip.toString()
            jwtData.ua = req.headers["user-agent"]

            let token:string = jwt.sign(jwtData.toPlainObject(),jwtSecret);
            const responseObject = new LoginInfoAdministratorDto(
                administrator.administratorId,
                administrator.username,
                token

            ) 
            return new Promise(resolve =>resolve(responseObject));
        }

        
    }