<<<<<<< HEAD
import { ApiResponse } from '../../misc/api.response.class';
=======
/* eslint-disable prefer-const */
>>>>>>> 5883df7e8acd8e1c0c8c26ed298a7179872f4002
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { Administrator } from '../../../entities/administrator.entity';
import { AddAdministratorDto } from '../../dtos/administrator/add.administrator.dto';
import { EditAdministratorDto } from '../../dtos/administrator/edit.administrator.dto';
<<<<<<< HEAD
import { resolve } from 'path';
=======
import { ApiResponse } from '../../misc/api.response.class';
>>>>>>> 5883df7e8acd8e1c0c8c26ed298a7179872f4002

@Injectable()
export class AdministartorService {
constructor(
    @InjectRepository(Administrator)
    private readonly administrator:Repository<Administrator>
){}

    getAll():Promise<Administrator[]>{
        return this.administrator.find();
    }

    getById(id:number):Promise<Administrator>{
        return this.administrator.findOne(id);
    }

    // add 
    add(data: AddAdministratorDto):Promise<Administrator | ApiResponse> {
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();
        let newAdmin: Administrator = new Administrator();
        newAdmin.username = data.username;
        newAdmin.passwordHash = passwordHashString;

<<<<<<< HEAD
        return new Promise((resolve)=>{
        this.administrator.save(newAdmin)
        .then(data => resolve(data))
        .catch(error=>{
            const response:ApiResponse = new ApiResponse("error",-1001);
            resolve(response);
        })
        });
    }
    // ediById
    async editById(id: number, data: EditAdministratorDto):Promise<Administrator|ApiResponse> {
        let admin: Administrator = await this.administrator.findOne(id);
        if(admin === undefined){
            return new Promise((resolve)=>{
                resolve(new ApiResponse("error",-1001))
            })
        }


=======
        return new Promise((resolve) => {
            this.administrator.save(newAdmin)
            .then(data => resolve(data))
            .catch(error => {
                const response: ApiResponse = new ApiResponse("error", -1001);
                resolve(response);
            })
        }) 
    }
    // ediById
    async editById(id: number, data: EditAdministratorDto):Promise<Administrator | ApiResponse> {
        let admin: Administrator = await this.administrator.findOne(id);
        
        if (admin === undefined) {
            return new Promise((resolve) => {
                resolve(new ApiResponse("error", -1002));
            })
        }

>>>>>>> 5883df7e8acd8e1c0c8c26ed298a7179872f4002
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        admin.passwordHash = passwordHashString;

        return this.administrator.save(admin);

    }
   
}
