// General solution to worlds Center 1, Center 2

function seek_along_line() {
    put();
    while (!wall_in_front()) {
        move();
    }
    put();
    turn_left();
    turn_left();
    seek_center();
}

function seek_center() {
    while (true) {
        take();
        if (object_here()) {
            return;
        }
        move();
        if (object_here()) {
            return;
        }
        put();
        move();
        while (!object_here()) {
            move();
        }
        turn_left();
        turn_left();
    }
}

seek_along_line();
while (!is_facing_north()) {
    turn_left();
}
// restart with two tokens in hand
take();
seek_along_line();
