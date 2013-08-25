$(document).ready(function() {
	//global variables
	var answerRounded;
	var remainder;
	var arraySize;
	var mode;

	//disable check and show buttons when starting new problem
	function disableButtons() {
		$('#checkAnswer').addClass('disabled');
		$('#showAnswer').addClass('disabled');
		$('#checkAnswer').off('click');
		$('#showAnswer').off('click');
	}

	//disable answer fields so there can't be input before new problem is generated
	function disableAnswers() {
		$('.answer').prop('disabled', true);
	}

	//hide extra work rows
	function hideRows() {
		$('#workRow1').hide();
		$('#workRow2').hide();
		$('#workRow3').hide();
		$('#workRow4').hide();
		$('#workRow5').hide();
		$('#workRow6').hide();
	};

	//reset everything
	function resetEverything() {
		$('input').val(null);
		answerRounded = null;
		remainder = null;
		disableButtons();
		disableAnswers();
		hideRows();
		$('.alert-text').text("Try a new problem.");
	}

	//set the mode (easy or hard)
	function setMode(m) {
		if (m == "hard") {
			$('.hardCol').show();
			arraySize = 5;
			mode = "hard";
			$('#hard').hide();
			$('#easy').show();
		} else {
			$('.hardCol').hide();
			arraySize = 4;
			mode = "easy";
			$('#easy').hide();
			$('#hard').show();
		}
		console.log("mode = " + m);
		resetEverything();
	}

	//display answer rows as needed
	$('#myAnswer1').focus(function() {
		$('#workRow1').show();
		$('#workRow2').show();
	});
	$('#myAnswer2').focus(function() {
		$('#workRow3').show();
		$('#workRow4').show();
	});
	$('#myAnswer3').focus(function() {
		$('#workRow5').show();
		$('#workRow6').show();
	});
	
	//after answer has been checked, enable show button in case answer is wrong
	$('input').blur(function() {
		$('#checkAnswer').removeClass('disabled');
		$('#checkAnswer').on('click', checkAnswer);
	});

	//select input when tapped for easier input
	$('input').click(function() {
	   $(this).select();
	});

	//close alert box
	$('.alert button').click(function() {
		$('.alert').fadeOut();
	})

	//call setMode()
	$('.mode').click(function() {
		//console.log($(this.id));
		if ($(this.id).selector == "hard") {
			setMode("hard");
		} else {
			setMode("easy");
		}			
	});

	//create array for dividend and divsors
	var r = new Array();
  
	$('#newProblem').click(function() {
		//clear all the inputs
		$('input').val(null);
		$('.control-group').removeClass('error');
		$('.control-group').removeClass('success');
		//hide the rows
		hideRows();
		//update the alert
		$('.alert-text').text('You can do it!');
		//$('.alert').hide();

		//add random numbers to the array
		for (var i=1; i<arraySize; i++) {
			r[i] = Math.floor(Math.random()*10);
			//don't divide by zero or one
			if ( r[1] == 0 || r[1] == 1) {
				r[1] = 2;
			}
			//don't let first number of dividend be zero
			if ( r[2] == 0) {
				r[2] = 1;
			}
		}

		//fill in the blanks
		$('#divisor').val(r[1]);
		$('#dividend1').val(r[2]);
		$('#dividend2').val(r[3]);
		$('#dividend3').val(r[4]);

		//disable the buttons again
		disableButtons();

		//calculate the answer here so it's ready
		if (mode == "hard") {
			var dividend = r[2]*100 + r[3]*10 + r[4]
		} else {
			var dividend = r[2]*10 + r[3];
		}
		var divisor = r[1];
		var answer = dividend / divisor;
		answerRounded = Math.floor(answer);
		remainder = dividend - (answerRounded * divisor);
		console.log("answerRounded: " + answerRounded);
		console.log("remainder: " + remainder);

		//enable answer inputs
		$('.answer').prop('disabled', false);

		//alert(r[1] + ' ' + r[2] + ' ' + r[3] + ' ' + r[4]);
		//alert(r);
	});

	function checkAnswer() {
		//clear the alert
		$('.alert-text').text('');

		//calculate my answer
		var myAnswer1 = $('#myAnswer1').val();
		console.log(myAnswer1);
		var myAnswer2 = $('#myAnswer2').val();
		console.log(myAnswer2);
		var myAnswer3 = $('#myAnswer3').val();
		console.log(myAnswer3);
		if (mode == "hard") {
			var myAnswer = myAnswer1 + myAnswer2 + myAnswer3;
		} else {
			var myAnswer = myAnswer1 + myAnswer2;
		}
		var myRemainder = $('#remainder').val();
		console.log("my answer: " + myAnswer);
		console.log("my remainder: " + myRemainder);

		if ( myAnswer == answerRounded && myRemainder == remainder ) {
			console.log("correct!");
			$('.alert-text').text("You did it! Try another one.");
			$('.control-group').addClass('success');
		} else {
			console.log("incorrect");
			$('.alert-text').html("Uh oh&hellip; Try again.");
			$('#showAnswer').removeClass('disabled');
			$('#showAnswer').on('click', showAnswer);
			$('.control-group').addClass('error');
		}
	}

	function showAnswer() {
		var answerText = answerRounded.toString();
		console.log(answerText);
		$('.alert-text').html('This is the correct answer.<br>Try another one!');
		$('input.answer').val(null);
		if (mode == "hard") {
			var answer1 = answerText.substring(0, 1);
			var answer2 = answerText.substring(1, 2);
			var answer3 = answerText.substring(2, 3);
			//shift answer to correct position if less than 10 or 100
			if (answerRounded < 10) {
				$('#myAnswer3').val(answer1);
			} else  if (answerRounded < 100) {
				$('#myAnswer2').val(answer1);
				$('#myAnswer3').val(answer2);
			} else {
				$('#myAnswer1').val(answer1);
				$('#myAnswer2').val(answer2);
				$('#myAnswer3').val(answer3);
			}
		} else {
			var answer1 = answerText.substring(0, 1);
			var answer2 = answerText.substring(1, 2);
			//shift answer to correct position if less than 10 or 100
			if (answerRounded < 10) {
				$('#myAnswer2').val(answer1);
			} else {
				$('#myAnswer1').val(answer1);
				$('#myAnswer2').val(answer2);
			}
		}

		//if the remainder is greater than zero, show it
		if ( remainder > 0 ) {
			$('#remainder').val(remainder);
		}
		$('.control-group').removeClass('error');
		$('.control-group').addClass('success');
	}

	resetEverything();
	setMode("easy");
});
