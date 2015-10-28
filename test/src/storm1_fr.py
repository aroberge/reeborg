pense(0)
while rien_devant():
    avance()
    while objet_ici("feuille"):
        prend("feuille")

tourne_a_gauche()
tourne_a_gauche()
while not mur_devant():
    avance()
repeat 3:
    tourne_a_gauche()

avance()
while transporte("feuille"):
    depose("feuille")
tourne_a_gauche()
tourne_a_gauche()
avance()
tourne_a_gauche()
tourne_a_gauche()
construit_un_mur()
termine()
