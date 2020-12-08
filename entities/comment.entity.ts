import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Administrator } from "./administrator.entity";
import { Movie } from "./movie.entity";
import { User } from "./user.entity";

@Index("uq_comment_user_id_movie_id", ["userId", "movieId"], { unique: true })
@Index(
  "fk_comment_moderator_administrator_id",
  ["moderatorAdministratorId"],
  {}
)
@Index("fk_comment_user_id", ["userId"], {})
@Index("fk_comment_movie_id", ["movieId"], {})
@Entity("comment", { schema: "filmoteka" })
export class Comment {
  @PrimaryGeneratedColumn({ type: "int", name: "comment_id", unsigned: true })
  commentId: number;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("int", { name: "movie_id", unsigned: true })
  movieId: number;

  @Column("mediumtext", { name: "original_value" })
  originalValue: string;

  @Column("mediumtext", { name: "moderated_value" })
  moderatedValue: string;

  @Column("tinyint", { name: "rating_value", width: 1 })
  ratingValue: boolean;

  @Column("enum", {
    name: "status",
    enum: ["pending", "approved", "denied"],
    default: () => "'pending'",
  })
  status: "pending" | "approved" | "denied";

  @Column("int", {
    name: "moderator_administrator_id",
    nullable: true,
    unsigned: true,
  })
  moderatorAdministratorId: number | null;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => Administrator, (administrator) => administrator.comments, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    {
      name: "moderator_administrator_id",
      referencedColumnName: "administratorId",
    },
  ])
  moderatorAdministrator: Administrator;

  @ManyToOne(() => Movie, (movie) => movie.comments, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "movie_id", referencedColumnName: "movieId" }])
  movie: Movie;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
