x = 1
while not mur_devant() :
    avance()
    x = x + 1
print ("Le monde comporte", x ,"cases en abscisse")
tourne_a_gauche()
y = 1
while not mur_devant() :
    avance()
    y = y + 1
print ("Le monde comporte", y, "cases en ordonnée")
print ("Soit", x*y, "cases au total.")