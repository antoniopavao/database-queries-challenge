import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const containsWithTitle = await this.repository
      .createQueryBuilder("games")
      .where("games.title ILIKE :param", { param: `%${param}%` })
      .getMany();
    return containsWithTitle;
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const allGames = await this.repository.query("SELECT count(*) FROM games");
    return allGames; // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const user = await this.repository
      .createQueryBuilder("games")
      .where("game.id = :id", { id })
      .relation(Game, "users")
      .of(id)
      .loadMany();
    return user;
    // Complete usando query builder
  }
}
