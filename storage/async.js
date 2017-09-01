import { AsyncStorage } from 'react-native';

export const WORKOUT_COLLECTION = 'workout_collection';
export const WORKOUT_PLAN_COLLECTION = 'workout_plan_collection';
export const WORKOUT_ARCHIVE_COLLECTION = 'workout_archive_collection';
export const CURRENT_WORKOUT_COLLECTION = 'current_workout_collection';


export default class Async {
  constructor() {
    if (typeof AsyncStorage !== 'object') {
      throw new Error('No available storage!');
    }
    this.storage = AsyncStorage;
  }

  storageGet(key) {
    return this.storage.getItem(key).then((json) => {
      return this.parse(json);
    });
  }

  storageSet(key, value) {
    return this.storage.setItem(key, this.serialize(value)).then((err) => {
      if (err) {
        return err;
      } else {
        return value;
      }
    });
  }

  parse(val) {
    let value;

    try {
      value = JSON.parse(val);
    } catch(e) {
      value = val;
    }

    return value;
  }

  serialize(val) {
    let value;

    try {
      value = JSON.stringify(val);
    } catch(e) {
      value = val;
    }

    return value;
  }

  storageUpdate(key, value) {
    return this.storage.mergeItem(key, this.serialize(value)).then((err) => {
      if (err) {
        return err;
      } else {
        return value;
      }
    });
  }

  storageDelete(key) {
    return this.storage.remove(key);
  }
}

export class WorkoutCollection {
  constructor() {
    this.storage = new Async();
    this.storage.storageGet(WORKOUT_COLLECTION)
      .then((collection) => {
        this.collection = collection;
        console.log(collection);
      });
  }

  get(key) {
    if (this.collection.hasOwnProperty(key)) {
      return this.collection[key];
    } else {
      return null;
    }
  }

  set(key, value) {
    this.collection[key] = value;
    return this.storage.storageSet(WORKOUT_COLLECTION, this.collection);
  }

  save(collectionData) {
    this.collection[collectionData.name] = collectionData;
    return this.storage.storageSet(WORKOUT_COLLECTION, this.collection);
  }

  delete(key) {
    if (this.collection.hasOwnProperty(key)) {
      delete this.collection[key];
    }
    return this.storage.storageSet(WORKOUT_COLLECTION, this.collection)
  }
}

export class WorkoutPlanCollection {
  constructor(collection, storage) {
    this.storage = new Async();
    this.storage.storageGet(WORKOUT_PLAN_COLLECTION)
      .then((collection) => {
        this.collection = collection;
      });
  }

  get(key) {
    if (this.collection.hasOwnProperty(key)) {
      return this.collection[key];
    } else {
      return null;
    }
  }

  set(key, value) {
    this.collection[key] = value;
    return this.storage.storageSet(WORKOUT_PLAN_COLLECTION, this.collection);
  }

  delete(key) {
    if (this.collection.hasOwnProperty(key)) {
      delete this.collection[key];
    }
    return this.storageSet(WORKOUT_PLAN_COLLECTION, this.collection)
  }
}

export class WorkoutArchiveCollection {
  constructor(collection, storage) {
    this.storage = new Async();
    this.storage.storageGet(WORKOUT_ARCHIVE_COLLECTION)
      .then((collection) => {
        this.collection = collection;
      });
  }

  get(key) {
    if (this.collection.hasOwnProperty(key)) {
      return this.collection[key];
    } else {
      return null;
    }
  }

  set(key, value) {
    this.collection[key] = value;
    return this.storage.storageSet(WORKOUT_ARCHIVE_COLLECTION, this.collection);
  }

  delete(key) {
    if (this.collection.hasOwnProperty(key)) {
      delete this.collection[key];
    }
    return this.storageSet(WORKOUT_ARCHIVE_COLLECTION, this.collection)
  }
}

export class CurrentWorkoutCollection {
  constructor(collection, storage) {
    this.storage = new Async();
    this.storage.storageGet(CURRENT_WORKOUT_COLLECTION)
      .then((collection) => {
        this.collection = collection;
      });
  }

  get(key) {
    if (this.collection.hasOwnProperty(key)) {
      return this.collection[key];
    } else {
      return null;
    }
  }

  set(key, value) {
    this.collection[key] = value;
    return this.storage.storageSet(CURRENT_WORKOUT_COLLECTION, this.collection);
  }

  delete(key) {
    if (this.collection.hasOwnProperty(key)) {
      delete this.collection[key];
    }
    return this.storageSet(CURRENT_WORKOUT_COLLECTION, this.collection)
  }
}