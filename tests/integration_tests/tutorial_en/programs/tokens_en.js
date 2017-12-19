// tokens 1 to 5

function collect_all() { 
    while (object_here()) { 
        take(); 
        move(); 
    }
}

function put_all_down_and_move() { 
    while (carries_object()) { 
        put(); 
    }
    move(); 
}
    
while (!at_goal()) { 
    if (object_here()) { 
        collect_all(); 
    }
    else if (carries_object()) { 
        put_all_down_and_move(); 
    }
    else {
        move(); 
    }
}
