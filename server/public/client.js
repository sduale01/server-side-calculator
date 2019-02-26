//  packaged data to be sent
 let dataToBeSent = {
     firstNum: '',
     secondNum: '',
     theOperator: '' 
 }

$(document).ready(function(){
    $('.number-button').on('click', numberClicked);
    $('.operation-button').on('click', operatorClicked);
    $('#equals-button').on('click', submitBtnPressed);
    $('#reset-button').on('click', clearEquationBox);

    // delete history
    // $('#delete-history-button').on('click', deleteMathHistory);
});


//  delete the list of previous math problems
// function deleteMathHistory() {
//     $('#previousResults').html('');

//     $.ajax({
//         method: 'DELETE',
//         url: '/deleteList'
//     }).then(function(response){
//         let deletedHistory = response
//         console.log(deletedHistory);
//         // $('#previousResults').html('');
//     })
// }


// only works when number is clicked
function numberClicked() {
    let currentNumber = this.value;
    console.log('the num clicked is:', currentNumber);
    
    if (dataToBeSent.theOperator == '') {
        // += operator allows to operate on multi-digit numbers.
        // otherwise you could only use singe digit numbers.
        dataToBeSent.firstNum += currentNumber
    } else {
        dataToBeSent.secondNum += currentNumber;
    }

    // shows the number selected in the equation input box.
    displayUserInput();
}

// only works when operator is clicked
function operatorClicked() {
    let oper = this.value;
    console.log('the operator clicked is:', oper);
    dataToBeSent.theOperator = oper;

    // shows the operator sign in the equation input box.
    displayUserInput();
    
}

// When this button is clicked the math problem will be sent to the server.
// The serve will do the calculating and send back an answer.
function submitBtnPressed() {
console.log('= button pressed');

// stretch: check if user completed input requirements
if (dataToBeSent.secondNum == '' ) {
    alert('Make sure required input fields are filled');
    // using RETURN makes sure the server only recieves complete input fields
    return;
}

    // send equation to server
    $.ajax({
        method: 'POST',
        url: '/calculation',
        data: dataToBeSent
    }).then(function(response) {
        console.log('the response from the server is: ', response.solution);
        displayUserInput();

        // shows answer besides RESULTS tag
        $('#results').html(`ANSWER: ${response.solution}`);
        getPreviousProblems();
        // deleteMathHistory();
    })
}

function getPreviousProblems() {
    $.ajax({
        method: 'GET',
        url: '/calculation',
        data: dataToBeSent
    }).then(function(response) {
        
        let mathProblems = response
        console.log(mathProblems);

        // to avoid duplicating previous results.
        $('#previousResults').empty();

        for (let mathProblem of mathProblems) {
            $('#previousResults').append(`<li>${mathProblem.firstNum} ${mathProblem.theOperator} ${mathProblem.secondNum} </li>`)
        }
        
        
    })
}

// shows the operation on the calculator input box
function displayUserInput() {
    let inputEquation = $('#mathOperationInput');

    // prevents duplicates on equation input box
    inputEquation.empty();
    inputEquation.append(`${dataToBeSent.firstNum} ${dataToBeSent.theOperator} ${dataToBeSent.secondNum}`)
}

// clears equation box when C button is pressed
function clearEquationBox() {
    $('#mathOperationInput').empty();
    dataToBeSent.firstNum = '';
    dataToBeSent.secondNum = '';
    dataToBeSent.theOperator = '';
}
