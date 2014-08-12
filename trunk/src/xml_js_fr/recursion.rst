`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

Récursivité
===========

Si vous faites une recherche sur Internet pour la définition de
récursivité vous verrez **parfois** (et, **très souvent**, pour la
définition du terme anglais *recursion*) quelque chose comme ce qui
suit:

**Récursivité**
    Voir récursivité.

Ceci est une blague ... qui malheureusement peut donner la mauvaise idée
de ce qu'est la récursivité.

Si vous étiez un programme informatique qui tentait d'interpréter la
définition ci-dessus, vous seriez pris dans une boucle infinie. Puisque
vous lisez ce texte, c'est soit que vous avez sauté par-dessus la
définition **ou** que vous ne lisez pas comme un ordinateur.

La récursivité en informatique est parfois décrite comme un concept
difficile à comprendre. Ce n'est pas le cas: si vous comprenez les
boucles, vous pouvez comprendre la récursivité.

La récursivité est une démarche qui fait référence à l'objet de la
démarche. Pour les programmes informatiques, ceci veut dire qu'on répète
des instructions ... un peu comme dans une boucle. Et, comme pour les
boucles, il est important de ne pas répéter *à l'infini*.

Le plus simple exemple qu'on peut donner est celui d'une fonction qui
s'invoque elle-même basé sur une certaine condition.

.. code:: jscode

    function récursive(){
    ...
    if (tâche_pas_terminée()){
        récursive();  // la même fonction est invoquée ...
    }

Prenons un exemple concret. Sélectionnez Maison 1 et exécutez le
programme suivant:

.. code:: jscode

    function va_au_but(){
        avance();
        if (!au_but()) {
            va_au_but();
        }
    }

    // définition complétée; on y va!
    va_au_but();

Lorsque vous aurez exécuté le programme ci-dessus et compris comment il
fonctionne, passez à la leçon suivante où nous verrons un exemple un peu
plus compliqué.

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
