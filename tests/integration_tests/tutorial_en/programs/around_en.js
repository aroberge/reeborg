// overkill - single program for Around 1, 2, 3, 4
function right() {
    turn_left();
    turn_left();
    turn_left();
}

function follow_wall () {
    if (right_is_clear()) {
        right();
        move();
    } else if (front_is_clear()) {
        move();
    } else {
        turn_left();
    }
}

put();
while(!front_is_clear()) {
    turn_left();
}
move();

while (!object_here()) {
    follow_wall();
}
