// solution to Harvest 3
think(0);
var i, j;

function reseed_one_row() {
    for(i=0; i<6; i++){
        while (object_here('carrot')) {
            take();
        }
        put();
        move();
    }
}

// go to first row
move();
move();
turn_left();
move();
move();
turn_left();
turn_left();
turn_left();

for (j=0; j<3; j++) {
    reseed_one_row();
    turn_left();
    move();
    turn_left();
    move();
    reseed_one_row();
        turn_left();
        turn_left();
        turn_left();
    move();
        turn_left();
        turn_left();
        turn_left();
    move();
}
