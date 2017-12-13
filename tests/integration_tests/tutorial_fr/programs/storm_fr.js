// general Solution to storm worlds
pense(0);
function demi_tour() {
    tourne_a_gauche();
    tourne_a_gauche();
}

function tourne_a_droite() {
    demi_tour();
    tourne_a_gauche();
}

function prend_tout() {
    while (objet_ici()) {
        prend();
    }
}

function etang_ici() {
    return (!rien_devant() && !mur_devant());
}

function go_around_pond() {
    tourne_a_gauche();
    avance();
    tourne_a_droite();
    avance();
    avance();
    tourne_a_droite();
    avance();
    tourne_a_gauche();
}

function nettoie_ligne() {
    prend_tout();
    if (etang_ici()) {
        go_around_pond();
    }
    while (rien_devant()) {
        avance();
        prend_tout();
        if (etang_ici()) {
            go_around_pond();
            prend_tout();
        }
    }
}
        
function go_back() {
    demi_tour();
    while (rien_devant()) {
        avance();
    }
}

function clean_first_two_rows_and_face_north() {
    nettoie_ligne();
    tourne_a_gauche();
    avance();
    tourne_a_gauche();
    nettoie_ligne();
    tourne_a_droite();
}

function clean_two_rows_and_face_north() { // start facing north
    if (!rien_devant()) {  // at top
        return;
    }
    avance();
    tourne_a_gauche();  // special case for third row
    if (rien_devant()) {
        avance();
    }
    demi_tour(); // face east
    nettoie_ligne();
    tourne_a_gauche();
    if (!rien_devant()) {
        tourne_a_gauche();
        while (rien_devant()) {
            avance();
        }
    } else {
        avance();
        tourne_a_gauche();
        nettoie_ligne();
    }
    tourne_a_droite(); // face north
}

clean_first_two_rows_and_face_north();
while (rien_devant()) {
    clean_two_rows_and_face_north();
}

demi_tour();
while (rien_devant()) {
    avance();  // above compost
}
while (transporte()) {
    lance();
}

tourne_a_gauche();
avance();
tourne_a_droite();
avance();
avance();
tourne_a_droite();
avance();
