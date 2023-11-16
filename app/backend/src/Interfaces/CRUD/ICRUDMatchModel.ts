import {
  ICRUDModelReader,
  ICRUDModelFindByParam,
  ICRUDModelUpdater,
  ICRUDModelCreator } from './ICRUDModel';

export interface ICRUDMatchModel<T> extends ICRUDModelReader<T>,
  ICRUDModelFindByParam<T>,
  ICRUDModelCreator<T>,
  ICRUDModelUpdater { }
