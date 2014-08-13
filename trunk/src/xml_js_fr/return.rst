`Précédent <Javascript:void(0);>`__ `Table des
matières <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__

return
======

Comme vous le savez, Reeborg n'est pas parfaitement opérationnel. Il
peut seulement tourner à gauche, il a une fuite d'huile, et il peut voir
s'il y a un mur devant lui ou tout juste à sa droite, mais pas à sa
gauche; de plus, il ne voit les jetons que lorsqu'il est littéralement
au-dessus d'eux. Reeborg a également une boussole qui fonctionne plus ou
moins bien: il peut déterminer s'il fait face au nord ... ou non; pas
moyen d'obtenir d'autre information au sujet de son orientation. Pour
déterminer s'il fait face au nord, vous pouvez demander à Reeborg de
faire le test ``face_au_nord()``. N.B.: Dans le monde de Reeborg, le
nord est vers le haut de l'écran, l'est est vers la droite, l'ouest vers
la gauche et le sud vers le bas de l'écran.

Orientez Reeborg
----------------

Sélectionnez un monde approprié et écrivez un court programme qui fera
en sorte que Reeborg tourne vers la gauche jusqu'à ce qu'il soit face au
nord, quelque soit son orientation de départ.

Obtenir des résultats de fonctions
----------------------------------

Les tests comme ``face_au_nord()`` sont des fonctions Javascript. Ces
fonctions diffèrent des autres fonctions telles que
``tourne_à_gauche()`` ou ``avance()`` car elles ***retournent*** une
valeur, utilisant le mot-clé ``return``. Commençons par un exemple
simple et faites en sorte que Reeborg exécute le programme suivant.

.. code:: jscode

    function interruption() {
        avance();
        return;
        avance();
    }

    interruption();

Puisque le monde de Reeborg utilise jshint pour vérifier le code avant
son exécution, vous verrez l'avertissement *Unreachable 'avance' after
'return'* qui indique que la deuxième instruction ``avance`` ne peut pas
être exécutée après ``return;`` ... ce que vous pourrez constater en
voyant que Reeborg ne fera qu'un pas. On peut "cacher" cet avertissement
en mettant le mot-clé ``return`` à l'intérieur d'un bloc ``if`` .

.. code:: jscode

    function interruption() {
        avance();
        if (true) {
            return;
        }
        avance();
    }

    interruption();

Cette fois, il n'y a plus d'avertissement, mais le second ``avance()``
n'est toujours pas exécuté: l'exécution de la fonction termine lorsque
l'énoncé contenant le mot-clé ``return;`` est exécuté.

Le mot-clé ``return`` peut être accompagné de quelque chose d'autre
comme l'exemple suivant le démontre:

.. code:: jscode

    function nord(){
       return face_au_nord();
    }

    while (!nord()) {
        tourne_à_gauche();
    }

Lorsque vous exécuterez ce programme, vous verrez que la fonction
``nord()`` donne exactement le même résultat que si vous utilisiez
directement ``face_au_nord()``; ceci est le résultat de l'utilisation de
l'énoncé ``return``. Nous pouvons utiliser ce résultat pour permettre à
Reeborg d'identifier d'autres orientations que le nord (et réparer sa
boussole). Tout d'abord, nous savons que si Reeborg tourne 4 fois à
gauche, il reviendra à son orientation de départ: nous voulons garantir
que l'orientation de Reeborg à la fin du test sera la même qu'au début.

Supposons que nous voulons savoir si Reeborg fait face au sud. Nous
pouvons lui demander de tourner à gauche deux fois et noter si son
orientation est face au nord (et donc qu'il était face au sud avant de
tourner) ou non, et de tourner deux fois à gauche de nouveau. Utilisant
le mot-clé ``return``, Reeborg peut indiquer le résultat qu'il avait
noté après deux tours à gauche.

.. code:: jscode

    function face_au_sud(){
        tourne_à_gauche();
        tourne_à_gauche();
        var orientation = face_au_nord();
        tourne_à_gauche();
        tourne_à_gauche();
        return orientation;
    }

    // on oriente Reeborg pour qu'il soit face au sud comme test
    while (!face_au_sud()) {
        tourne_à_gauche();
    }

**Vérifiez que ceci fonctionne!**

Ceci fonctionne ... mais, dépendant de l'orientation initiale de
Reeborg, vous pourriez devenir étourdi à le voir tourner: lorsque son
orientation initiale n'est pas face au sud, pour chaque virage à gauche
qu'il doit faire pour *changer*, il doit en faire 4 pour *déterminer*
son orientation.

Plus tard, en examinant le code source de Reeborg, nous pourrons trouver
une façon beaucoup plus directe, et moins étourdissante, de déterminer
son orientation.

Mini-quiz
---------

Écrivez un programme faisant en sorte que Reeborg soit orienté face à
l'ouest, peu importe son orientation initiale. Vérifiez la validité de
votre programme en commençant par quelques virages à gauche, pour tester
différentes orientations initiales de Reeborg.

Comment penser à return
-----------------------

Supposons que nous ayons le code suivant:

.. code:: jscode

    function fonction_quelconque () {
        ...
        return quelque_chose;
    }

    ... = fonction_quelconque();

Dans ce cas, l'invocation de ``fonction_quelconque()`` à la dernière
ligne sera remplacée par la valeur de ``quelque_chose`` qui est la
variable suivant le mot-clé ``return``. S'il n'y a rien après
``return``, alors le résultat est ``undefined`` (non défini).

`Précédent <Javascript:void(0);>`__ `Suivant <Javascript:void(0);>`__
