$(document).ready(function() {
	$('#checkAnswer').addClass('disabled');
	$('#showAnswer').addClass('disabled');
	//$('.alert').hide();

	var r = new Array();
  
	$('#newProblem').click(function() {
		$('input').val(null);
		$('.alert').text('You can do it!');
		//$('.alert').hide();

		for (var i=1; i<4; i++) {
			r[i] = Math.floor(Math.random()*10);
			if ( r[1] == 0 || r[1] == 1) {
				r[1] = 2;
			}
			if ( r[2] == 0) {
				r[2] = 1;
			}
		}
		$('#divisor').val(r[1]);
		$('#dividend100').val(r[2]);
		$('#dividend10').val(r[3]);
		$('#dividend1').val(r[4]);

		$('#checkAnswer').addClass('disabled');
		$('#showAnswer').addClass('disabled');
		//alert(r[1] + ' ' + r[2] + ' ' + r[3] + ' ' + r[4]);
		//alert(r);
	});

	$('input').blur(function() {
		$('#checkAnswer').removeClass('disabled');
	});

	$('input').click(function() {
	   $(this).select();
	});

	$('#checkAnswer').click(function() {
		$('.alert').text('');

		var myAnswer100 = $('#answer100').val();
		var myAnswer10 = $('#answer10').val();
		var myAnswer = myAnswer100 + myAnswer10;
		var myRemainder = $('#remainder').val();

		var dividend = r[2]*10 + r[3];
		var divisor = r[1];
		var answer = dividend / divisor;
		var answerRounded = Math.floor(answer);
		var remainder = dividend - (answerRounded * divisor);

		if ( myAnswer == answerRounded && myRemainder == remainder ) {
			console.log("correct!");
			$('.alert').append("You did it! Try another one.");
			$('.alert').show();
		} else {
			console.log("incorrect");
			$('.alert').append("Uh oh... Try again.");
			$('.alert').show();
			$('#showAnswer').removeClass('disabled');
		}
	})

	$('#showAnswer').click(function() {
		var dividend = r[2]*10 + r[3];
		var divisor = r[1];
		var answer = dividend / divisor;
		var answerRounded = Math.floor(answer);
		var remainder = dividend - (answerRounded * divisor);

		var answerText = answerRounded.toString();
		console.log(answerText);
		var answer100 = answerText.substring(0, 1);
		console.log(answer100);
		console.log(answer10);
		var answer10 = answerText.substring(1, 2);

		if ( answerRounded < 10) {
			$('#answer10').val(answer100);
		} else {
			$('#answer100').val(answer100);
			$('#answer10').val(answer10);
		}
		if ( remainder > 0 ) {
			$('#remainder').val(remainder);
		}
		

		//$('.alert').append(answer);
		//$('.alert').show();
		//alert(answer);
	});

});
