`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Une nouvelle livraison de journaux
==================================

Retournons à l'exemple de la livraison de journaux. Ci-dessous est une
esquisse de solution qui permettra à Reeborg de livrer le journal de
Madame Lovelace, Journal 1, ainsi que celui de Monsieur Babbage,
Journal 2,

.. code:: jscode

    function monte_un_étage() {
        tourne_à_gauche();
        avance();
        tourne_à_droite();
        avance();
        avance();
    }

    function descend_un_étage() {
        avance();
        avance();
        tourne_à_gauche();
        avance();
        tourne_à_droite();
    }

    function prend_argent() {
        while ( ... ) {
          // une seule instruction
        }
    }

    // === Fin des définitions ===

    prend("étoile");
    while ( !jeton_ici() ){
        // une seule instruction
    }
    prend_argent();
    dépose("étoile");
    demi_tour();
    while ( ! ... ){
        // une seule instruction
    }

C'est à vous de compléter le programme. Lorsque vous aurez terminé et
testé votre programme **avec les deux mondes**, comparez avec la
solution de `Autre livraison de journaux <Javascript:void(0);>`__; vous
verrez que cette nouvelle solution, qui fonctionne pour les deux mondes,
est beaucoup plus courte que la précédente qui ne fonctionnait que pour
un seul monde.

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
