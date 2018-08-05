$(function() {

    // DOM object declaration
	var container = $('#container');
	var bird = $('#bird');
	var pole = $('.pole');
	var pole_1 = $('#pole_1');
	var pole_2 = $('#pole_2');
	var score_span = $('#score');
	var speed_span = $('#speed');
	var restart_btn = $('#restart_btn');

    
    // saving some initial setup
	var container_width = parseInt(container.width());
	var container_height = parseInt(container.height());
	var pole_initial_position = parseInt(pole.css('right'));
	var pole_initial_height = parseInt(pole.css('height'));
	var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.height());
    var speed = 10;
    var score = 0;
    // .css('height') returns the value intact with units intact
    // .height() returns unitless value, preferred for mathematical calculations

	
    // some other declaration
    var go_up = false;
    var score_updated = false;
    var game_over = false;

    // ---------------------------------------------------------------------------------------------------------------------------------------logic of gameplay
	var the_game = setInterval(function(){

		if (collision(bird, pole_1) || collision(bird, pole_2) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) >= container_height - bird_height) {
			stop_the_game();

		}else {

		var pole_current_position = parseInt(pole.css('right'));

		if (pole_current_position > container_width - bird_left) {
			if (score_updated === false) {
				score = score + 1;
                score_span.text(score);
                score_updated = true;
			}			
		}


        // check whether poles went out of the container
        if (pole_current_position > container_width) {
            // change height of poles before apearing again
            var new_height = parseInt(Math.random()*100);
            pole_1.css('height', pole_initial_height + new_height );
            pole_2.css('height', pole_initial_height - new_height);

            // increase speed
            speed = speed + 1;
            speed_span.text(speed);

            score_updated = false;

        	// update the current position to bring poles back
        	pole_current_position = pole_initial_position;
        }

        // move the poles
		pole.css('right', pole_current_position + speed);

			if (go_up === false) {
        		go_down();
        	}
        }

	}, 30);
//---------------------------------------------------------------------------------------------------------------------------------------------------------

    // when we press spacebar, the bird moves up(top decreases) by up function, every 50 ms
	$(document).on('keydown', function(e){
		var key = e.keyCode;
		if (key === 32 && go_up === false && game_over === false) {
			go_up = setInterval(up, 40);
		}
	});
    
    // when we release the spacebar, bird starts moving down again as go_up function is cleared. Also, go_up is reset to false as it was set to true when go_up = setInterval(up, 50); was executed
	$(document).on('keyup', function(e){
		var key = e.keyCode;
		if (key === 32) {
			clearInterval(go_up);
			go_up = false;
		}
	});


	function go_down() {
		bird.css('top', parseInt(bird.css('top')) + 5);
	}

	function up() {
		bird.css('top', parseInt(bird.css('top')) - 10);
	}


	function stop_the_game() {
		clearInterval(the_game);
		game_over = true;
		// Note: slideDown() works on elements hidden with jQuery methods and display:none in CSS (but not visibility:hidden).
		restart_btn.slideDown();
	}

$(document).ready(function(){
	restart_btn.click(function() {
		window.location.reload();
		console.log('reload');
	});
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }


});