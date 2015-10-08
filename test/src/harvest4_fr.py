# solution to Harvest 4 a, b, c, d
pense(0)

def pick_one_row(fruit):
    for i in range(6):
        while objet_ici(fruit):
            prend()
        avance()
# go to first row
avance()
fruit = objet_ici()[0]
prend(fruit)
avance()
tourne_a_gauche()
repete(avance, 2)
repete(tourne_a_gauche, 3)
for j in range(3):
    pick_one_row(fruit)
    tourne_a_gauche()
    avance()
    tourne_a_gauche()
    avance()
    pick_one_row(fruit)
    repete(tourne_a_gauche, 3)
    avance()
    repete(tourne_a_gauche, 3)
    avance()

