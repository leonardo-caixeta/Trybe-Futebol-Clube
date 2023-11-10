type ID = number;

export type matchUpdateData = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};

// export interface ICRUDModelCreator<T> {
//   create(data: Partial<T>): Promise<T>,
// }

export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>,
  findById?(id: ID): Promise<T | null>,
}

export interface ICRUDModelUpdater {
  finishUpdate(id: ID): Promise<number>,
  matchesUpdate(id: ID, data: matchUpdateData): Promise<number>
}

// export interface ICRUDModelDeleter {
//   delete(id: ID): Promise<number>,
// }

export interface ICRUDModelFindByParam<I> {
  findByQuery(query: string): Promise<I[]>
}

export interface ICRUDModelLogin<I> {
  findByEmail(email: string): Promise<I | null>
}
