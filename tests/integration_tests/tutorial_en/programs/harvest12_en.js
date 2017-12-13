// solution to Harvest 1 and 2
think(0);
var i, j;

function pick_one_row(){
    for(i=0; i<6; i++){
        while (object_here('carrot')) {
            take('carrot');
        }
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
    pick_one_row();
    turn_left();
    move();
    turn_left();
    move();
    pick_one_row();
        turn_left();
        turn_left();
        turn_left();
    move();
        turn_left();
        turn_left();
        turn_left();
    move();
}
