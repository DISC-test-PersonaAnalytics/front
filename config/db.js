const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db', (err) => {
if (err) {
console.log(err.message);
} else {
console.log('Base de datos conectada');
}
});
module.exports = db;