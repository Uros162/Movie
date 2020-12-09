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
}