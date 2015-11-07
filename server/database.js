import Mongo from 'mongodb';
import Grid from 'gridfs-stream';

let gfs = null;
let db = null;
const url = process.env.NODE_ENV === 'production' ? process.env.MONGOHQ_URL : 'mongodb://localhost:27017/learncode';

export default {
  connect() {
    Mongo.MongoClient.connect(url, (err, connectedDb) => {
      if (err) {
        console.log('Could not connect to db', err);
        return;
      }
      
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
  upsert(collectionName, data) {
    const collection = db.collection(collectionName);

    return new Promise((resolve, reject) => {
      collection.upsert(data, (err, result) => {
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
  writeFile(filename, req) {
    return new Promise((resolve, reject) => {
      gfs.exist({
        filename: filename
      }, (err, found) => {
        if (err) {
          reject(err);
        } else {
          resolve(found);
        }
      });
    })
    .then((exists) => {
      if (exists) {
        return new Promise((resolve, reject) => {
          gfs.remove({
            filename: filename
          }, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      }
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        const pipe = req.pipe(gfs.createWriteStream({
          filename: filename
        }));
        pipe.on('error', reject);
        pipe.on('close', resolve);
      });
    });
  },
  readFile(filename, res) {
    const readstream = gfs.createReadStream({
      filename: filename
    });
    readstream.pipe(res);
  }
};
