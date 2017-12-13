// solution to Harvest 3
pense(0);
var i, j;

function reseed_one_row() {
    for(i=0; i<6; i++){
        while (objet_ici('carotte')) {
            prend();
        }
        depose();
        avance();
    }
}

// go to first row
avance();
avance();
tourne_a_gauche();
avance();
avance();
tourne_a_gauche();
tourne_a_gauche();
tourne_a_gauche();

for (j=0; j<3; j++) {
    reseed_one_row();
    tourne_a_gauche();
    avance();
    tourne_a_gauche();
    avance();
    reseed_one_row();
        tourne_a_gauche();
        tourne_a_gauche();
        tourne_a_gauche();
    avance();
        tourne_a_gauche();
        tourne_a_gauche();
        tourne_a_gauche();
    avance();
}
