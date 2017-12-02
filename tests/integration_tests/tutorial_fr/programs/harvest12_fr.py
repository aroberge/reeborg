# solution to Harvest 1 and 2
pense(0)

def pick_one_row():
    for i in range(6):
        while objet_ici("carotte"):
            prend("carotte")
        avance()
# go to first row
repeat 2:
    avance()
tourne_a_gauche()
repeat 2:
    avance()
repeat 3:
    tourne_a_gauche()
for j in range(3):
    pick_one_row()
    tourne_a_gauche()
    avance()
    tourne_a_gauche()
    avance()
    pick_one_row()
    repeat 3:
        tourne_a_gauche()
    avance()
    repeat 3:
        tourne_a_gauche()
    avance()

