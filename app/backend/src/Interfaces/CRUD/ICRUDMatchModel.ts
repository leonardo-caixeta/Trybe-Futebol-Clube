import { ICRUDModelReader, ICRUDModelFindByParam, ICRUDModelUpdater } from './ICRUDModel';

export interface ICRUDMatchModel<T> extends ICRUDModelReader<T>,
  ICRUDModelFindByParam<T>,
  ICRUDModelUpdater { }
