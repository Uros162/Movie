<<<<<<< HEAD
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
=======
import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Movie } from "entities/movie.entity";
import { MovieService } from "src/services/movie/movie.service";

@Controller('api/movie')
@Crud({
    model: {
        type: Movie
    },
    params: {
        id: {
            field: 'movieId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            moviePrices: {
                eager: false
            },
            comments: {
                eager: false
            },
        }
    }
})
export class MovieController {
    constructor(public service: MovieService) {}
}
>>>>>>> 5883df7e8acd8e1c0c8c26ed298a7179872f4002
