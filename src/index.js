const express = require('express');
const app = express();
const port = 3000;
//const { v4:uuidv4 } = require('uuid');
// Middleware to parse JSON bodies
const { randomUUID } = require('crypto');  
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above
const users=[];


app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if(!user){
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
});

app.post('/users', (req, res) => {
    const { name, email } = req.body || {};
    if(!name || !email){
        return res.status(400).json({ error: 'Name and email are required' });
    }
    const user = { id: randomUUID(), name: name.trim(), email: email.trim() };
    users.push(user);
    res.status(201).json(user);
});


app.put('/users/:id', (req, res) => {
   
    const {name,email} = req.body || {};
    const idx = users.findIndex(u=> u.id === req.params.id);
    if(idx === -1){
        return res.status(404).json({ error: 'User not found' });
    }
    if(!name || !email){
        return res.status(400).json({ error: 'Username and email required' });
    }

    users[idx] = { id:req.params.id, name:name.trim(), email:email.trim() };
    res.status(200).json(users[idx]);

});

app.delete('/users/:id', (req, res) => {
    const idx = users.findIndex(u=> u.id === req.params.id);
    if(idx === -1){
        return res.status(404).json({ error: 'User not found' });
    }
    users.splice(idx,1);
    res.status(204).send();
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing