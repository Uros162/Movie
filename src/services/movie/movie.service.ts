<<<<<<< HEAD
import { Movie } from '../../../entities/movie.entity';

import { Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from 'typeorm';


@Injectable()
export class MovieService extends TypeOrmCrudService<Movie>{
    constructor(@InjectRepository(Movie)private readonly movie:Repository<Movie>){
        super(movie);
    }
=======
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Movie } from "entities/movie.entity";
import { Repository } from "typeorm";

@Injectable()
export class MovieService extends TypeOrmCrudService<Movie> {
    constructor(
        @InjectRepository(Movie) private readonly movie: Repository<Movie> // evidentiraj u modulu
) {  super(movie); }
>>>>>>> 5883df7e8acd8e1c0c8c26ed298a7179872f4002
}