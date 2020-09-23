const router = require('express').Router();
const Log = require('../models/logs.model');

const auth = require('../middleware/auth');


// POST LOG

router.post('/add', (req, res) => {
    const { email, description, type, sum } = req.body;

    const date = Date.parse(req.body.date);

    const newLog = new Log({
        email,
        description,
        type,
        sum,
        date
    });

    console.log(newLog);

    newLog.save()
        .then(() => res.json({ msg: 'Log added' }))
        .catch(err => res.status(400).json({ msg: "There was an error" }));

});

const getTotals = array => {
    let totalIncome = 0;
    let totalExpense = 0;

    let budget = 0;

    array.forEach(el => {
        if (el.type === 'income') {
            totalIncome += el.sum;
        } else if (el.type === 'expense') {
            totalExpense += el.sum
        }
    })

    budget = totalIncome - totalExpense;

    return { totalIncome, totalExpense, budget };
}



router.get('/:email', (req, res) => {
    const email = req.params.email;
    Log.find({ email })
        .then(logs => {
            
            const { totalIncome, totalExpense, budget } = getTotals(logs);

            res.json({ totalIncome, totalExpense, budget, logs });
        })
        .catch(err => res.status(400).json({ msg: 'Error'}))
});


router.get(`/find/:id`, (req, res) => {
    Log.findById(req.params.id)
        .then(log => res.json({log}))
        .catch(err => res.status(400).json({ msg: "This log could not be found"}))
})


router.post('/update/:id', (req, res) => {
    const { description, type, sum, date } = req.body;

    Log.findById(req.params.id)
        .then(log => {
            log.description = description;
            log.type = type;
            log.sum = sum;
            log.date = date;


            log.save()
                .then(() => res.json('Log updated'))
                .catch(err => res.status(400).json({ msg: "Error when trying to update"}))
        })
        .catch(err => res.status(400).json({ msg: "ERROR"}))
});

router.delete('/:id', (req, res) => {
    Log.findByIdAndDelete(req.params.id)
        .then(() => res.json('Log deleted'))
        .catch(err => res.status(400).json({ msg: 'Error when deleting '}))
});



module.exports = router;