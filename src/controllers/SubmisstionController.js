const Answer = require('../models/submission');

// Controller function to insert a list of answers
const insertAnswers = async (req, res) => {
    const answers = req.body;

    try {
        // Insert the list of answers
        const insertedAnswers = await Answer.bulkCreate(answers, {
            returning: true,
        });

        res.status(201).json(insertedAnswers);
    } catch (error) {
        console.error("Error inserting answers:", error);
        res.status(500).json({ error: 'An error occurred while inserting answers.' });
    }
};


module.exports = { insertAnswers };
