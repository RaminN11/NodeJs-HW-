const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = './users.json';

app.use(express.json());

function readUsersFromFile() {
    if (!fs.existsSync(DATA_FILE)) {
        return [];
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}



function writeUsersToFile(users) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}


app.get('/users', (req, res) => {
    const users = readUsersFromFile();
    res.json(users);
});


app.get('/users/:id', (req, res) => {
    const users = readUsersFromFile();
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});


app.post('/users', (req, res) => {
    const users = readUsersFromFile(); 
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }


    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1, 
        name,
        email,
    };

    users.push(newUser); 
    writeUsersToFile(users); 

    res.status(201).json(newUser); 
});



app.put('/users/:id', (req, res) => {
    const users = readUsersFromFile();
    const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    users[userIndex] = { id: users[userIndex].id, ...req.body };
    writeUsersToFile(users);
    res.json(users[userIndex]);
});


app.delete('/users/:id', (req, res) => {
    const users = readUsersFromFile();
    const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    const deletedUser = users.splice(userIndex, 1);
    writeUsersToFile(users);
    res.json(deletedUser);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
