// General solution to worlds Center 1, Center 2

function seek_along_line() {
    depose();
    while (!mur_devant()) {
        avance();
    }
    depose();
    tourne_a_gauche();
    tourne_a_gauche();
    seek_center();
}

function seek_center() {
    while (true){
        prend();
        if (objet_ici().length!==0) {
            return;
        }
        avance();
        if (objet_ici().length!==0) {
            return;
        }
        depose();
        avance();
        while (objet_ici().length===0) {
            avance();
        }
        tourne_a_gauche();
        tourne_a_gauche();
    }
}

seek_along_line();
while (!est_face_au_nord()) {
    tourne_a_gauche();
}
// restart with two tokens in hand
prend();
seek_along_line();
