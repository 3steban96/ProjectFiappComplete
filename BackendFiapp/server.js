const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const route = require('./route/route');
const { conn } = require('./ConnectionDB/Db');
const { revertProductPrices, }= require('./controllers/Store/controllerPromotions')
const { deleteExpiredCombos, }= require('./controllers/Store/controllerCombos')
const app = express();
const port = 3000;
const cron = require('node-cron');


app.use(cors({
    origin: [
        'http://localhost:8082','exp://192.168.0.6:8081','http://192.168.0.6:8081','https://192.168.0.6:8081','http://192.168.0.6','https://192.168.0.6',
        'exp://192.168.0.6:8082','http://192.168.0.6:8082','https://192.168.0.6:8082','http://192.168.0.6','https://192.168.0.6'
    ], 
    credentials: 'true',
    methods: 'GET,POST,DELETE,PUT',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, x-auth-token',
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/', route);

cron.schedule('0 0 * * *', deleteExpiredCombos);
cron.schedule('0 0 * * *', revertProductPrices);
// Intentar conectar a la base de datos antes de levantar el servidor
conn.authenticate()
    .then(() => {
        conn.sync({ force: false }).then(() => {
            app.listen(port, () => {
                console.log(`Server listening at ${port}`); // eslint-disable-line no-console
            });
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

