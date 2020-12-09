import { MovieService } from './services/movie/movie.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviePrice } from 'entities/movie-price.entity';
import { DatabaseConfiguration } from '../config/database';
import { Administrator } from '../entities/administrator.entity';
import { Cart } from '../entities/cart.entity';
import { Comment } from '../entities/comment.entity';
import { Movie } from '../entities/movie.entity';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { AdministratorController } from './controllers/api/administrator.controller';
<<<<<<< HEAD
=======
import { CommentController } from './controllers/api/comment.controller';
import { MoviePriceController } from './controllers/api/movie-price.controller';
>>>>>>> 5883df7e8acd8e1c0c8c26ed298a7179872f4002
import { MovieController } from './controllers/api/movie.controller';
import { AppController } from './controllers/app.controller';
import { AdministartorService } from './services/administartor/administartor.service';
import { CommentService } from './services/comment/comment.service';
import { MoviePriceService } from './services/movie-price/movie-price.service';
import { MovieService } from './services/movie/movie.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306, // 3306 UROS I BRANKA
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities:[
        Administrator,
        User,
        Cart,
        Comment,
        Movie,
        MoviePrice,
        Order,
      ]
    }),
    TypeOrmModule.forFeature([
      Administrator,
      User,
      Cart,
      Comment,
      Movie,
      MoviePrice,
      Order,
    ])
  ],
  controllers: [
    AppController,
    AdministratorController,
<<<<<<< HEAD
    MovieController
  ],
  providers: [AdministartorService,MovieService],
=======
    MovieController,
    MoviePriceController,
    CommentController,
  ],
  providers: [
    AdministartorService,
    MovieService,
    MoviePriceService,
    CommentService,
  ],
>>>>>>> 5883df7e8acd8e1c0c8c26ed298a7179872f4002
})
export class AppModule {}
