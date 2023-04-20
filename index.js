const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./routes/user');
const Auth = require('./routes/auth');
const Profiles = require('./routes/profiles');
const  mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://admin:password@localhost:27017/user-registration', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource:"admin"
}).then(() => console.log('Connected to DB!'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(cors());
app.use('/api/user', User);
app.use('/api/auth', Auth);
app.use('/api/profiles', Profiles);

const Port = process.env.PORT || 5001
app.listen(Port, () => {
    console.log(`App running at port: ${Port}`)
})