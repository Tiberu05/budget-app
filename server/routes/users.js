const router = require('express').Router();
const mongoose = require('mongoose');
let User = require('../models/user.model');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const auth = require('../middleware/auth');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });

const key = process.env.JWT_KEY;



// @route   POST /users
// @desc    Register new user
// @acces   Public
router.post('/add', (req, res) => {
    const { name, email, password } = req.body;

    // Simple Validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }


    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists'});
        
            const newUser = new User({
                name,
                email,
                password,
                preferredCurrency: 'RON'
            });

            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                { id: user.id },
                                process.env.JWT_KEY,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email,
                                            createdAt: user.createdAt,
                                        }
                                    });
                                }
                            )

                            
                        })
                        .catch(err => console.log(err))
                    .then(result => {
                        transport.sendMail({
                            to: newUser.email,
                            from: 'admin@budgtapptest.com',
                            subject: 'Signup',
                            html: '<h1>You have been successfully signed up!<h1>'
                        })
                    })
                    .catch(err => console.log(err))
                })
            })
        })

});


router.post('/resetpassword', (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
        }

        const token = buffer.toString('hex');

        User.findOne({email: req.body.email})
            .then(user => {
                if (!user) {
                    res.status(400).json({ msg: 'No user found'})
                }

                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 3600000;
                return user.save();
            })
            .then(result => {
                transport.sendMail({
                    to: req.body.email,
                    from: 'admin@budgtapptest.com',
                    subject: 'Password reset',
                    html: `
                        <p>You requested a password reset</p>
                        <p>Click this <a href='/localhost:3000/changepassword/${token}/${req.body.email}'>link</a> to set a new password</p>
                    `
                })
            })
            .catch(err => console.log(err))

    })
})

router.post('/changepassword', (req, res) => {
    
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'No such user'});

            if (req.body.token !== user.resetToken) return res.status(400).json({ msg: 'Token is invalid'});

            if (req.body.date > user.resetTokenExpiration) return res.status(400).json({ msg: 'Token has expired'});

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.save()
                        .then(user => {

                            jwt.sign(
                                { id: user.id },
                                process.env.JWT_KEY,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email,
                                            createdAt: user.createdAt,
                                            preferredCurrency: user.preferredCurrency
                                        }
                                    });
                                }
                            )

                            
                        })
                        .catch(err => console.log(err))
                    .then(result => {
                        transport.sendMail({
                            to: req.body.email,
                            from: 'admin@budgtapptest.com',
                            subject: 'Password changed',
                            html: '<h1>You have successfully changed your password!<h1>'
                        })
                    })
                    .catch(err => console.log(err))
                })
            })
        })
})


// @route   POST /users
// @desc    Register new user
// @acces   Public
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Simple Validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }


    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exist'});
        
            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid password'})
                
                    jwt.sign(
                        { id: user.id },
                        process.env.JWT_KEY,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                                    createdAt: user.createdAt,
                                    preferredCurrency: user.preferredCurrency
                                }
                            });
                        }
                    )
                })
            
        })
})



const getTotals = array => {
    let total = 0;
    array.forEach(el => {
        total += el.sum;
    });

    return total;
};


router.put('/update/:id', (req, res) => {



    const { type, description, date } = req.body;
    const sum = Number(req.body.sum);
    const id = mongoose.Types.ObjectId();
    User.findById(req.params.id)
        .then(user => {

            if (type.toString() === 'income') {

                if (req.query.edit) {
                    user.data.incomes.map(el => {
                        if (el.id === req.query.id) {
                            el.type = type;
                            el.description = description;
                            el.date = date;
                        }
                    });
                } else {
                    user.data.incomes.push({id, date, type, description, sum});
                    user.data.total.incomes = getTotals(user.data.incomes);
                }

 
            } else if (type.toString() === 'expense') {

                if (req.query.edit) {
                    user.data.incomes.map(el => {
                        if (el.id === req.query.id) {
                            el.type = type;
                            el.description = description;
                            el.date = date;
                        }
                    });
                } else {

                    user.data.expenses.push({id, date, type, description, sum});
                    user.data.total.expenses = getTotals(user.data.expenses); 
                }
       
            }
            user.data.budget = user.data.total.incomes - user.data.total.expenses;
            user.save()
                .then(() => res.json('User Updated'))
                .catch(err => res.status(400).json({ msg: 'There is an error when trying to save'}))
        })
        .catch(err => res.status(400).json({ msg: 'ERROR' }))
});



// @route   GET /user
// @desc    Get user data
// @acces   Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
})

router.post('/changecurrency', (req, res) => {
    const { email, currency } = req.body;

    User.findOne({ email })
        .then(user => {
            user.preferredCurrency = currency;
            return user.save();
        })
        .then(result => res.status(200).json(result.preferredCurrency))
        .catch(err => console.log(err))
});



module.exports = router;

