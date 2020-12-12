import { Body, Controller, Post } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Movie } from "entities/movie.entity";
import { AddMovieDTO } from "src/dtos/movie/add.movie.dto";
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
    constructor(public service: MovieService) {
    }
@Post('createFull')
    creatFullMovie(@Body()data:AddMovieDTO){
     return this.service.crateFullMovie(data);    
    }
}
