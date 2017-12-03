// solution to Rain 0, 1, 2
think(0);

function turn_around(){
    turn_left();
    turn_left();
}

function turn_right(){
    turn_left();
    turn_left();
    turn_left();
}

function identify_window(){
    move();
    if (right_is_clear()) {
        turn_around();
        move();
        turn_left();
        move();
    } else {
        turn_around();
        move();
        turn_left();
        build_wall();
        turn_left();
        move();
    }
}

while (!at_goal()) {
    move();
}
turn_right();

move();

while (!at_goal()) {
    if (wall_in_front()) {
        turn_left();
    } else  if (wall_on_right()) {
        move();
    } else {
        identify_window();
    }
}
