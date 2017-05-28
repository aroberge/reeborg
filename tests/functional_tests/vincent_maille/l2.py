x = 1
while not mur_devant() :
    avance()
    x = x + 1
tourne_a_gauche()
y = 1
while not mur_devant() :
    avance()
    y = y + 1
tourne_a_gauche()
x = x // 2
while x > 0 :
    avance()
    x = x - 1
tourne_a_gauche()
y = y // 2
while y > 0 :
    avance()
    y = y - 1
depose()