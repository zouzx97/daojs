import storage from './storage';

export * from './analysis';
export * from './collection';
export * from './growth';
export * from './lang';
export * from './math';
export * from './object';

export const read = id => storage.read(id);
export const write = data => storage.write(data);
export const remove = id => storage.remove(id);
