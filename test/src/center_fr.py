# General solution to worlds Center 1, Center 2, Center 3

def seek_along_line():
    '''deposes a token at each end of a line,
       turn to face the center and start
       the back and forth process to seek the center.'''
    depose()
    while not mur_devant():
        avance()
    depose()
    tourne_a_gauche()
    tourne_a_gauche()
    seek_center()

def seek_center():
    while True:
        prend()
        if objet_ici():
            return
        avance()
        if objet_ici():
            return
        depose()
        avance()
        while not objet_ici():
            avance()
        tourne_a_gauche()
        tourne_a_gauche()



seek_along_line()
while not est_face_au_nord():
    tourne_a_gauche()
# restart with two tokens in hand
prend()
seek_along_line()
