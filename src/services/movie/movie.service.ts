import { ApiResponse } from './../../misc/api.response.class';
import { Body, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Movie } from "entities/movie.entity";
import { AddMovieDTO } from "src/dtos/movie/add.movie.dto";
import { Repository } from "typeorm";
import { MoviePrice } from 'entities/movie-price.entity';

@Injectable()
export class MovieService extends TypeOrmCrudService<Movie> {
    constructor(
        @InjectRepository(Movie)
         private readonly movie: Repository<Movie>,

         @InjectRepository(MoviePrice)
         readonly moviePrice:Repository<MoviePrice>,

        /*  @InjectRepository(Comment) 
         private readonly comment: Repository<Comment> */
         

        ) {  super(movie); }

        async crateFullMovie(data:AddMovieDTO):Promise<Movie | ApiResponse>{
            let newMovie:Movie = new Movie;
            newMovie.name = data.name;
            newMovie.description = data.description;
            newMovie.genre = data.genre;
            newMovie.year = data.year;
            newMovie.rating = data.rating

            let savedMovie = await this.movie.save(newMovie)

            let newMoviePrice:MoviePrice = new MoviePrice();
            newMoviePrice.movieId = savedMovie.movieId;
            newMoviePrice.price = data.price;

            this.moviePrice.save(newMoviePrice)

            return await this.movie.findOne(savedMovie,{
                relations:[
                    "moviePrices"
                ]
            })

        }

       
}