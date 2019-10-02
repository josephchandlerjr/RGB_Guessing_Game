let numSquares = 6;
let selectedColor;

// DOM elements
let squares = document.querySelectorAll(".square");
let colorDisplay = document.querySelector("#selectedColor");
let messageDisplay = document.querySelector("#message");
let difficultyButtons = document.querySelectorAll(".difficulty");
let h1 = document.querySelector("h1");
let newColorsButton = document.querySelector("#newColors");

	
//functions
let random255 = () => Math.floor(Math.random() * 256);
let randomRGBValue = () => `rgb(${random255()}, ${random255()}, ${random255()})`; // string like 'rgb(255, 0, 255)'

function init() {
	let colors = [];
	h1.style.backgroundColor = "#567bb7";
	for(let i=0; i < numSquares; i++) colors.push(randomRGBValue());
	let result = colors[Math.floor(Math.random()*numSquares)];
	for (let i=0; i < squares.length; i++) {
		if(i < numSquares){
			squares[i].style.backgroundColor = colors.pop();
			squares[i].classList.remove("hidden"); // make sure doesn't have hidden class
		} else {
			squares[i].classList.add("hidden"); // give hidden class
		}
	}
	selectedColor = result;
	colorDisplay.textContent = selectedColor;
	messageDisplay.textContent = "";
	newColorsButton.textContent = "NEW COLORS";
}

// add listeners

for (button of difficultyButtons){
	button.addEventListener("click", function(){ 
		numSquares = this.getAttribute("data-squares");  // set numSquares
		for (b of difficultyButtons){					//give selected class to only this element
			if(b == this){
				b.classList.add("selected");
			} else {
				b.classList.remove("selected");
			}
		}
		init();
	});
}

newColorsButton.addEventListener("click", init);

for (let square of squares) {
	square.addEventListener("click", function(evt) {  
		if (this.classList.contains("hidden")) return; // if has hidden class ignore click
		if(this.style.backgroundColor == selectedColor){
			messageDisplay.textContent = "Correct!";
			h1.style.backgroundColor = selectedColor;
			newColors.textContent = "PLAY AGAIN?";
			for (let i=0; i < numSquares; i++) {
				squares[i].style.backgroundColor = selectedColor; 
				squares[i].classList.remove("hidden");
			}
		}else{
			this.classList.add("hidden");
			messageDisplay.textContent = "Try Again";
		}
	}
	);
}
// get started
init();


