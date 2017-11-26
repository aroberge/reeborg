// overkill - single program for Hurdle 1, 2, 3, 4
function right() {
    turn_left();
    turn_left();
    turn_left();
}

function follow_wall () {
    if (right_is_clear()) {
        right();
        move();
    } else if (front_is_clear() && !wall_in_front()) { // two equivalent tests
        move();
    } else {
        turn_left();
    }
}

while (! at_goal()) {
    follow_wall();
}
