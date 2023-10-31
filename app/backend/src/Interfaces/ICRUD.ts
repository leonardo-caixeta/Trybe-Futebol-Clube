// import { ITeams } from './teams/ITeams';

type ID = number;

// export interface ICRUDModelCreator<T> {
//   create(data: Partial<T>): Promise<T>,
// }

export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>,
  findById(id: ID): Promise<T | null>,
}

// export interface ICRUDModelUpdater<T> {
//   update(id: ID, data: Partial<T>): Promise<T | null>,
// }

// export interface ICRUDModelDeleter {
//   delete(id: ID): Promise<number>,
// }

// export interface ICRUDModelFindByParam {
//   findByQuery(query: string): Promise<ITeams[] | null>
// }

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICRUDModel<T> extends ICRUDModelReader<T> { }
