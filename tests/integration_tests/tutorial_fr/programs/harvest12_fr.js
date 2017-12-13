// solution to Harvest 1 and 2
pense(0);
var i, j;

function pick_one_row(){
    for(i=0; i<6; i++){
        while (objet_ici('carotte')) {
            prend('carotte');
        }
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
    pick_one_row();
    tourne_a_gauche();
    avance();
    tourne_a_gauche();
    avance();
    pick_one_row();
        tourne_a_gauche();
        tourne_a_gauche();
        tourne_a_gauche();
    avance();
        tourne_a_gauche();
        tourne_a_gauche();
        tourne_a_gauche();
    avance();
}
