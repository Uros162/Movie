import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviePrice } from 'entities/movie-price.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Repository } from 'typeorm';
@Injectable()
export class MoviePriceService extends TypeOrmCrudService<MoviePrice> {
    constructor(@InjectRepository(MoviePrice)readonly moviePrice:Repository<MoviePrice>){
            super(moviePrice)
        }
    }