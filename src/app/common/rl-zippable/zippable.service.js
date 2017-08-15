export default class Zippable {
  build(collection, key, alias) {
    return this.zippable(collection, key, alias);
  }

  zippable(collection, key, alias) {
    let index = {};

    collection = collection.map((value) => {
      let entry = {};
      entry[alias] = value;
      if (!value.hasOwnProperty(key)) {
        throw new Error('Zippable: Your input collection \'' + alias + '\' is missing keys \'' + key + '\'');
      }
      if (index[value[key]]) {
        throw new Error('Zippable: Your input collection \'' + alias + '\' has duplicate keys \'' + key + '\' (key: ' + value[key] + ')');
      }
      index[value[key]] = entry;
      return entry;
    });

    collection.alias = alias;

    collection.byKey = (wantedKey) => {
      return index[wantedKey];
    };
    collection.zip = (other, altKey) => {
      if (!angular.isFunction(other.byKey)) {
        throw new Error('Other collection is not a Zippable');
      }
      // you can use the key from the original zip, or you can use a different key
      let useKey = altKey || key;
      // change the collection to include other
      collection.forEach((rowLeft) => {
        let thisKey = this.getOwnPropertyDeep(rowLeft[alias], useKey);
        let otherRow = other.byKey(thisKey) || null;
        rowLeft[other.alias] = otherRow ? otherRow[other.alias] : null;
      });
      return collection;
    };
    return collection;
  }

  getOwnPropertyDeep(obj, key) {
    return key.split('.').reduce(function (o, x) {
      try {
        return o[x];
      }
      catch (e) {
        return o;
      }
    }, obj);
  }
}
