`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Améliorations: partie 4
=======================

Comme vous l'avez probablement trouvé, nous avons demandé à Reeborg de
se déplacer trop tôt après avoir marqué sa position de départ. Reeborg
doit d'abord trouver une direction dans laquelle il doit se déplacer
avant de le faire. Voici une solution possible.

.. code:: jscode

    dépose("jeton");
    if ( !rien_devant() ) {
        tourne_à_gauche();
    }
    avance();
    while ( !jeton_ici() ){
        if (right_is_clear()){
            tourne_à_droite();
            avance();
        } else if (rien_devant()){
            avance();
        } else {
            tourne_à_gauche();
        }
    }

Vérifiez que ceci fonctionne correctement. Pouvez-vous imaginer des
situations où ce programme ne permettrait pas à Reeborg de faire le tour
de son monde?

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
