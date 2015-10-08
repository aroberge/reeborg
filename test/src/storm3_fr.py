pense(0)
from biblio import tourne_a_droite, demi_tour
def clear_row():
    while objet_ici():
        prend()
    while rien_devant():
        avance()
        while objet_ici("feuille"):
            prend()

def go_to_next_row():
    tourne_a_gauche()
    avance()
    tourne_a_gauche()
    while not mur_devant():
        avance()
    demi_tour()

while True:
    clear_row()
    try:
        go_to_next_row()
    except ReeborgError:
        break
demi_tour()
while rien_devant():
    avance()
tourne_a_droite()
while rien_devant():
    avance()
tourne_a_droite()

avance()

while transporte("feuille"):
    depose("feuille")
demi_tour()
avance()
demi_tour()
construit_un_mur()
termine()
