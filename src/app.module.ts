import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviePrice } from 'src/entities/movie-price.entity';
import { DatabaseConfiguration } from '../config/database';
import { Administrator } from './entities/administrator.entity';
import { Cart } from './entities/cart.entity';
import { Comment } from './entities/comment.entity';
import { Movie } from './entities/movie.entity';
import { Order } from './entities/order.entity';
import { User } from './entities/user.entity';
import { AdministratorController } from './controllers/api/administrator.controller';
import { AuthController } from './controllers/api/auth.controller';
import { MoviePriceController } from './controllers/api/movie-price.controller';
import { MovieController } from './controllers/api/movie.controller';
import { AppController } from './controllers/app.controller';
import { AdministartorService } from './services/administartor/administartor.service';
import { CommentService } from './services/comment/comment.service';
import { MoviePriceService } from './services/movie-price/movie-price.service';
import { CommentController } from './controllers/api/comment.controller';

import { AuthMiddleware } from './midllewares/auth.midleware';
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
    MovieController,
    CommentController,
    AuthController
  ],
  providers: [
    AdministartorService,
    MovieService,
    MoviePriceService,
    CommentService,
  ],
  exports: [
    AdministartorService,
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('auth/*') // skip sve sto pocinje sa auth
    .forRoutes('api/'); // a jesu api
  }
  
}
