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

    //const email = req.params.email;

    const {type, date, monthfilter} = req.query;

    // let newDate;

    // let year;
    // let month;
    // let day;
    // let nextDay;

    let query = {};

    query.email = req.params.email;

    if (type) {
        query.type = type;
    }

    if (date) {
        const newDate = new Date(date);

        const year = newDate.getFullYear();
        const month = newDate.getMonth();
        const day = newDate.getDate();
        const nextDay = day + 1;
        query.date = { $gte: new Date(year, month, day), $lt: new Date(year, month, nextDay) };
    }

    if (monthfilter) {
        const year = Number(monthfilter.split('-')[1]);
        const month = Number(monthfilter.split('-')[0]);

        // const newDate = new Date();

        // newDate.setFullYear(year);
        // newDate.setMonth(month - 1);
        // newDate.setDate(1);

        // const lastDate = new Date();
        // lastDate.setFullYear(year);
        // lastDate.setMonth(month);
        // lastDate.setDate(0);

        // //newDate.setDate(10);

        // console.log(newDate);
        // console.log(lastDate);

        query.date = { $gte: new Date(year, month - 1, 1), $lt: new Date(year, month, 0) };
    }

    console.log(query);
    
    // Log.find({ email })
    //     .then(logs => {
            
    //         const { totalIncome, totalExpense, budget } = getTotals(logs);

    //         res.json({ totalIncome, totalExpense, budget, logs });
    //     })
    //     .catch(err => res.status(400).json({ msg: 'Error'}))


        

    
    Log.find( query )
        .then(logs => {
            
            const { totalIncome, totalExpense, budget } = getTotals(logs);

            res.json({ totalIncome, totalExpense, budget, logs, isLoading: false });
        })
        .catch(err => res.status(400).json({ msg: 'Error'}))
});

router.get('/find', (req, res) => {
    const { type, date } = req.query;
    res.json(type);
})


router.get(`/find/log/:id`, (req, res) => {
    Log.findById(req.params.id)
        .then(log => {
            console.log(typeof log.date);
            res.json({log})
        })
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