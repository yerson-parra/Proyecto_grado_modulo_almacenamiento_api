import app from './app'
import {conncetDB} from'./database.js'
conncetDB();
app.listen(5000);
console.log('server on port', 5000)