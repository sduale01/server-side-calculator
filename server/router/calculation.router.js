const express = require('express');
const router = express.Router();

let mathProblems = [];

router.get('/', (req, res) => {
    // send the problem back to the user
    res.send(mathProblems);
})

// get math problem from server
router.post('/', (req, res) => {
    console.log(req.body);
    mathProblems.push(req.body);

    let mathSolution = 0;
    let numOne = req.body.firstNum;
    let numTwo = req.body.secondNum;
    let operation = req.body.theOperator;

    // checking to see if its the correct values
    console.log('first value is:', numOne);
    console.log('second value is:', numTwo);
    console.log('operator is:', operation);



    // doing logic to compute answer
    if (operation == '/') {
        mathSolution = parseInt(numOne) / parseInt(numTwo);
    } else if (operation == '*') {
        mathSolution = parseInt(numOne) * parseInt(numTwo);
    } else if (operation == '+') {
        mathSolution = parseInt(numOne) + parseInt(numTwo);
    } else if (operation == '-') {
        mathSolution = parseInt(numOne) - parseInt(numTwo);
    }

    console.log('the answer is:', mathSolution);
    // sends just the answer.
    res.send({
        solution: mathSolution
    });
})

// send math problem with answer back to client
router.get('/', (req, res) => {
    console.log('the solution is:', mathSolution);

    res.send(mathSolution);
})


module.exports = router;