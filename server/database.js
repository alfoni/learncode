import Mongo from 'mongodb';
import Grid from 'gridfs-stream';

let gfs = null;
let db = null;
const url = 'mongodb://localhost:27017/learncode';

export default {
  connect() {
    Mongo.MongoClient.connect(url, (err, connectedDb) => {
      db = connectedDb;
      gfs = Grid(db, Mongo);
      console.log('Database is connected');
    });
  },
  findOne(collectionName, query, projection = {}) {
    const collection = db.collection(collectionName);

    return new Promise((resolve, reject) => {
      collection.findOne(query, projection, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  find(collectionName, query) {
    const collection = db.collection(collectionName);

    return new Promise((resolve, reject) => {
      collection.find(query).toArray((err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  insert(collectionName, data) {
    const collection = db.collection(collectionName);

    return new Promise((resolve, reject) => {
      collection.insert(data, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  update(collectionName, query, data) {
    const collection = db.collection(collectionName);

    return new Promise((resolve, reject) => {
      collection.update(query, data, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  stream(req, filename) {
    return new Promise((resolve, reject) => {
      const pipe = req.pipe(gfs.createWriteStream({
        filename: filename
      }));
      pipe.on('error', reject);
      pipe.on('finish', resolve);
    });
  }
};