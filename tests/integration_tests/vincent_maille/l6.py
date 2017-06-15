def tourne_a_droite() :
    repeat 3 :
        tourne_a_gauche()

while not au_but() :
    while not mur_devant() and mur_a_droite() :
        avance()
    if mur_a_droite() :
        tourne_a_gauche()
    else :
        tourne_a_droite()
        avance()