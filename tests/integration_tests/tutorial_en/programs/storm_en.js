// general Solution to storm worlds
think(0);
function turn_around() {
    turn_left();
    turn_left();
}

function turn_right() {
    turn_around();
    turn_left();
}

function take_all() {
    while (object_here()) {
        take();
    }
}

function pond_here() {
    return (!front_is_clear() && !wall_in_front());
}

function go_around_pond() {
    turn_left();
    move();
    turn_right();
    move();
    move();
    turn_right();
    move();
    turn_left();
}

function clean_row() {
    take_all();
    if (pond_here()) {
        go_around_pond();
    }
    while (front_is_clear()) {
        move();
        take_all();
        if (pond_here()) {
            go_around_pond();
            take_all();
        }
    }
}
        
function go_back() {
    turn_around();
    while (front_is_clear()) {
        move();
    }
}

function clean_first_two_rows_and_face_north() {
    clean_row();
    turn_left();
    move();
    turn_left();
    clean_row();
    turn_right();
}

function clean_two_rows_and_face_north() { // start facing north
    if (!front_is_clear()) {  // at top
        return;
    }
    move();
    turn_left();  // special case for third row
    if (front_is_clear()) {
        move();
    }
    turn_around(); // face east
    clean_row();
    turn_left();
    if (!front_is_clear()) {
        turn_left();
        while (front_is_clear()) {
            move();
        }
    } else {
        move();
        turn_left();
        clean_row();
    }
    turn_right(); // face north
}

clean_first_two_rows_and_face_north();
while (front_is_clear()) {
    clean_two_rows_and_face_north();
}

turn_around();
while (front_is_clear()) {
    move();  // above compost
}
while (carries_object()) {
    toss();
}

turn_left();
move();
turn_right();
move();
move();
turn_right();
move();
