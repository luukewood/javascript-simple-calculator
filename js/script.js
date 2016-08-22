(function(){

	$(window).on('load', function() {

	    $(".loading").fadeOut();
	    $(".loaderPage").delay(1000).fadeOut("slow");

	});

	"use strict";

	var showOutput = document.querySelector('.show-output');
	var buttonsWithNumber = document.querySelectorAll('.number');
	var buttonsWithOperation = document.querySelectorAll('button[class^="sign"]');
	var buttonEqual = document.querySelector('.equal');
	var buttonClear = document.querySelector('.reset');
	var indicators = document.querySelectorAll('.indicator');
	var currentNumbers = [];
	var number = "";
	var numbersFromArray = "";
	var currentOperation = "";

	function getNumber(clickedButton) {

		currentNumbers.push(clickedButton);
		numbersFromArray = currentNumbers.join('');
		showOutput.textContent = numbersFromArray;
	}

	function showDataNumber(clickedButton) {
		var leftIndicator = document.querySelector('.left-indicator');
		leftIndicator.textContent = clickedButton;
		leftIndicator.classList.add('animation');
	}

	function showDataOperation(thatButton) {
		var rightIndicator = document.querySelector('.right-indicator');
		rightIndicator.textContent = thatButton.textContent;
		rightIndicator.classList.add('animation');
	}

	function makeOperation() {
		currentNumbers = [];
		number = showOutput.textContent;
		numbersFromArray = "";
	}

	function showOutcome() {

		number = parseFloat(number);
		numbersFromArray = parseFloat(numbersFromArray);

		if(currentOperation === "plus-operation") {
			showOutput.textContent = number + numbersFromArray;
		} else if(currentOperation === "divide-operation") {
			showOutput.textContent = number / numbersFromArray;
		} else if(currentOperation === "minus-operation") {
			showOutput.textContent = number - numbersFromArray;
		} else if(currentOperation === "multiple-operation") {
			showOutput.textContent = number * numbersFromArray;
		}
		number = "";
		currentNumbers = [];
	}

	for(var i = 0; i < buttonsWithOperation.length; i++) {
		buttonsWithOperation[i].addEventListener('click', function(){
			currentOperation = this.getAttribute('data-operation');
			var thatButton = this;
			makeOperation();
			showDataOperation(thatButton);
		});
	}

	for(var i = 0; i < buttonsWithNumber.length; i++) {
		buttonsWithNumber[i].addEventListener('click', function(){
			var clickedButton = this.getAttribute('data-number');
			getNumber(clickedButton);
			showDataNumber(clickedButton);
		});
	}

	for(var i = 0; i < indicators.length; i++) {
		indicators[i].addEventListener('animationend', function(){
			this.classList.remove('animation');
			this.textContent = "";
		});
	}

	buttonEqual.addEventListener('click', function(){
		showOutcome();
	});

	buttonClear.addEventListener('click', function(){
		showOutput.textContent = showOutput.getAttribute('data-output');
		number = "";
		currentNumbers = [];
	});
})();
