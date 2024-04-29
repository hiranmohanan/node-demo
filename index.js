const express = require("express");
require('dotenv').config();
const auth=require('./modules/auth/auth');


const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(express.static('js'));

app.get('/', (req, res) => {
    res.sendFile('/page.html', { root: __dirname });
});
app.use('/', require('./routs/routes'));
// Login endpoint
app.post('/login', async (req, res) => {
    console.log('req.body:', req.body);
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).send('Missing name or password');
    }
    const result = await auth.login(name, password);

    if (result) {
        console.log("Login success");
        res.send('Login successful');
    } else {
        console.log("Login failed");
        res.status(401).send('Login failed');
    }
});



app.listen(8030, () => console.log(`server started on port 8030....`));