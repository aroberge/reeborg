def avance_au_max() :
    while not au_but() and not mur_devant() :
        avance()

while not au_but() :
    avance_au_max()
    tourne_a_gauche()
    avance_au_max()
    repeat 3 :
        tourne_a_gauche()