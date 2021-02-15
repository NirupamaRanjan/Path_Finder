import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db"); //it will connect to this database or create the database if it can't find it

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL ,imageUri TEXT NOT NULL,address TEXT NOT NULL, lat REAL NOT NULL,lng REAL NOT NULL );",
        [], //array of arguments,
        () => {
          resolve();
        }, //success function,
        (_, err) => {
          reject(err);
        } //failure function
      );
    }); //transaction guarantees that your query is always executed as a whole and that if some part of thr query should fail,the entire query is rolled back to prevent any kind of corruted data
  });
  return promise;
}; //initialising database

export const insertPlace = (title, imageUri, adderess, lat, lng) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO places(title,imageUri,address,lat,lng) VALUES(?,?,?,?,?)",
        [title, imageUri, adderess, lat, lng],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
