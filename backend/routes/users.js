const router = require("express").Router(); // we require the express router, since this
// is primarily how the application responds to user input
let User = require('../models/user.model'); //we also require the model, which is the 
// mongoose model that we created

router.route('/').get((req, res) => {
    // User.find() is a mongoose method that is going to return in JSON format, all the 
    // users from the MongoDB atlas database 
    User.find()
    .then(users => res.json(users))
    // if an error occurs, we return an error message
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    // This handles the add request, or adding a user to the database
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;