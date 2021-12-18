const app = require('./src/app');
const sequelizeInstance = require('./config/database');

sequelizeInstance.sync();

app.listen(3000, () => console.log('app is running'));
