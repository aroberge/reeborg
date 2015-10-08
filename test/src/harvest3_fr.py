# solution to Harvest 3
pense(0)

def reseed_one_row():
    for i in range(6):
        while objet_ici("carotte"):
            prend()
        depose()
        avance()
# go to first row
repete(avance, 2)
tourne_a_gauche()
repete(avance, 2)
repete(tourne_a_gauche, 3)
for j in range(3):
    reseed_one_row()
    tourne_a_gauche()
    avance()
    tourne_a_gauche()
    avance()
    reseed_one_row()
    repete(tourne_a_gauche, 3)
    avance()
    repete(tourne_a_gauche, 3)
    avance()

