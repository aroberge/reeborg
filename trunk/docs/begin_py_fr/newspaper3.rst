Une nouvelle livraison de journaux
==================================

Retournons à l'exemple de la livraison de journaux. Ci-dessous est une
esquisse de solution qui permettra à Reeborg de livrer le journal de
Madame Lovelace, **Journal 1**, ainsi que celui de Monsieur Babbage,
**Journal 2**::

    from biblio import *

    def monte_un_étage():
        tourne_a_gauche()
        avance()
        tourne_a_droite()
        avance()
        avance()

    def descend_un_étage():
        avance()
        avance()
        tourne_a_gauche()
        avance()
        tourne_a_droite()

    def prend_argent():
        while  ...:
          # une seule instruction

    # === Fin des définitions ===

    prend("étoile")
    while not jeton_ici():
        # une seule instruction

    prend_argent()
    depose("étoile")
    demi_tour()
    while not ... :
        # une seule instruction


C'est à vous de compléter le programme. Lorsque vous aurez terminé et
testé votre programme **avec les deux mondes**, comparez avec la
solution de `Autre livraison de journaux  <newspaper2.html>`__; vous
verrez que cette nouvelle solution, qui fonctionne pour les deux mondes,
est beaucoup plus courte que la précédente qui ne fonctionnait que pour
un seul monde.
