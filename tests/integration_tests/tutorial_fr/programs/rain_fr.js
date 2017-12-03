// solution to Rain 0, 1, 2
pense(0);

function demi_tour() {
    tourne_a_gauche();
    tourne_a_gauche();
}

function tourne_a_droite() {
    tourne_a_gauche();
    tourne_a_gauche();
    tourne_a_gauche();
}

function identifie_fenetre() {
    avance();
    if (rien_a_droite()) {
        demi_tour();
        avance();
        tourne_a_gauche();
        avance();
    } else {
        demi_tour();
        avance();
        tourne_a_gauche();
        construit_un_mur();
        tourne_a_gauche();
        avance();
    }
}

while (!au_but()) {
    avance();
}
tourne_a_droite();
avance();
while (!au_but()) {
    if (mur_devant()) {
        tourne_a_gauche();
    } else if (mur_a_droite()) {
        avance();
    } else {
        identifie_fenetre();
    }
}
