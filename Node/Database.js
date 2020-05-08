const fs = require('fs');

class Database {
    constructor(filename) {
        this.filename = filename;
        this.data = {};
    }

    save(cb) {
        fs.writeFile(this.filename, JSON.stringify(this.data), cb);
    }

    set(key, value) {
        this.data[key] = value;
    }

    get(key) {
        return this.data[key]
    }
}


module.exports = Database