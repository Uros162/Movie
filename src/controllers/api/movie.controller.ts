import { MovieService } from '../../services/movie/movie.service';
import {​​ Controller }​​ from "@nestjs/common";

import {​​ Crud }​​ from "@nestjsx/crud";

import {​​ Movie }​​ from "entities/movie.entity";





@Controller('api/movie')

@Crud({​​

    model: {​​

        type: Movie

    }​​,

    params: {​​

        id: {​​

            field: 'movieId',

            type: 'number',

            primary: true

        }​​

    }​​

}​​)

export class MovieController {​​

    constructor(public service: MovieService) {​​}​​

}​​