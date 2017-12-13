// overkill - single program for Around 1, 2, 3, 4
function droite() {
    tourne_a_gauche();
    tourne_à_gauche();  // test accent
    tourne_a_gauche();
}

function suit_le_mur () {
    if (rien_a_droite()) {
        droite();
        avance();
    } else if (rien_devant()) {
        avance();
    } else {
        tourne_a_gauche();
    }
}

depose();
while (!rien_devant()) {
    tourne_a_gauche();
}
avance();

while (!objet_ici()) {
    suit_le_mur();
}
