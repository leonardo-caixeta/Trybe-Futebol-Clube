type ID = number;

export interface ICRUDModelCreator<T> {
  create(data: Partial<T>): Promise<T>,
}

export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>,
  findById(id: ID): Promise<T | null>,
}

export interface ICRUDModelUpdater<T> {
  update(id: ID, data: Partial<T>): Promise<T | null>,
}

export interface ICRUDModelDeleter {
  delete(id: ID): Promise<number>,
}

export interface ICRUDModelFindByParam<I> {
  findByQuery(query: string): Promise<I[] | null>
}

export interface ICRUDModelLogin<I> {
  login(email: string, password: string): Promise<I | null>
}
