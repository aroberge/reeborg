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
repeat 2:
    avance()
repeat 3:
    tourne_a_gauche()
for j in range(3):
    pick_one_row(fruit)
    tourne_a_gauche()
    avance()
    tourne_a_gauche()
    avance()
    pick_one_row(fruit)
    repeat 3:
        tourne_a_gauche()
    avance()
    repeat 3:
        tourne_a_gauche()
    avance()

