let numSquares = 3;
let colors = [];
let pickedColor;
let squares = document.querySelectorAll(".square");
let score = 0;
let won = false;

$("#reset").click(reset);

function randomColor() {
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function generateRandomColors(num) {
	let arr = [];
	for(let i=0; i<num; i++)
		arr.push(randomColor());
	return arr;
}

function pickColor() {
	let random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function setupModeButtons() {
	$(".dropdown-item").on("click", function(){
		$("#mode").text($(this).text());
		$("#mode").text() === "Easy" ? numSquares = 3 : numSquares = 6;
		if($("#mode").text() === "Hard") {

		}
		score = 0;
		$("#score").text(score);
		reset();
	});
}

function setupSquares() {
	$(".square").on("click", function(){
		let clickedColor = this.style.backgroundColor;
		if(clickedColor === pickedColor && won !== true){
			won = true;
			score += 100;
			$(".square").addClass("wrong");
			$("#score").text(score);
			$("#message").text("Correct");
			$("#reset").text("Play Again?");
			$(".square").css("background-color", pickedColor);
			$("#header").css("background-color", pickedColor);
		} else if(won !== true){
			$(this).removeClass("selected");
			$(this).addClass("wrong");
			$(this).css("background-color", "#232323");
			$("#message").text("Try Again");
		}
	});

	$(".square").on("mouseenter", function(){
		if(!$(this).hasClass("wrong"))
			$(this).addClass("selected");
	});
	$(".square").on("mouseout", function(){
		$(this).removeClass("selected");
	});
}

function reset() {
	won = false;
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	$("#reset").text("New Colors");
	$("#message").text("");
	for(let i=0; i<squares.length; i++){
		//add initial colors to squares
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i]
		} else{
			squares[i].style.display = "none";
		}
	}
	$(".square").removeClass("wrong");
	$("#header").css("background-color", "steelblue");
}

function init() {
	setupModeButtons();
	setupSquares();
	reset();
}


init();




