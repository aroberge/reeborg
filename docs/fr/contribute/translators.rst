Information pour les traducteurs
================================


.. figure:: ../../images/korean.png
   :figwidth: 30%
   :align: right

   *Samsung Korea a conçu des livres et les a distribué gratuitement
   à des étudiants utilisant RUR-PLE (un logiciel précurseur du
   Monde de Reeborg) en Corée du Sud dans le but de leur
   permettre d'apprendre la "pensée informatique".*

Il y a 6 niveaux possible de traduction dans une autre langue.


1. Utilisez la version anglaise ou française du site, et inclure seulement
une traduction des fonctions Python utilisées dans le Monde de Reeborg.

Pour voir un exemple, allez au site français http://reeborg.ca/monde.html,
exécutez le programme suivant:

.. code-block:: python

    from reeborg_en import *

    avance()  # version française "normale"
    move()    # équivalent anglais

Tout ce qui est requis pour une telle traduction est un simple fichier,
dénoté par ``reeborg_xx.py``,
où ``xx`` est le code standard à deux lettres indiquant une langue principale.

Avant de débuter un tel travail, vous devriez vérifier que le Monde de Reeborg
(c'est-à-dire le logiciel Brython) reconnait les caractères (encodées en utf-8)
utilisés par votre langue.  Une façon simple de faire ceci, est de définir
une fonction dans votre propre langue.  Par exemple, j'ai choisi de ne pas
utiliser de lettres accentuées dans le nom de fonctions de base.
Cependant, j'aurais pu le faire comme l'exemple suivant le démontre
(si vous le copiez et l'exécutez dans le site où Reeborg reçoit de tels programmes):

.. code-block:: python

    def tourne_à_droite():       # remarquez l'accent sur le à
        repeat 3:
            tourne_a_gauche()    # pas d'accent ici


Si vous allez sur le site
https://github.com/aroberge/reeborg/tree/master/src/libraries/brython/Lib/site-packages
vous verrez au moins deux fichiers du genre (un pour l'anglais et un pour le français.)
Vous pouvez utiliser soit la version anglaise ou française comme modèle.

2. Traduire les messages fournis par Reeborg.  Il y a deux exemples
de tels fichiers
(translation_en.js et translation_fr.js) situé au site
https://github.com/aroberge/reeborg/tree/master/src/lang.


.. figure:: ../../images/korean2.png
   :figwidth: 30%
   :align: left

3. Faire l'équivalent du niveau 1 ci-dessus, mais pour Javascript
au lieu de Python. Les fichiers pertinents (reeborg_en.js et reeborg_fr.js)
se trouve à
https://github.com/aroberge/reeborg/tree/master/src/lang.

4. Avoir un site (constitué d'une seule page) entièrement dans
une autre langue, et reproduisant le contenu du Monde de Reeborg
proprement dit.  Deux fichiers pertinents, world.html et monde.html,
se trouvent à https://github.com/aroberge/reeborg .

5. Créer un nouveau menu par défaut, incluant les tâches traduites
dans une autre langue.

6. Traduire tout le tutoriel. Je recommanderais plutôt de faire un tutoriel
différent et probablement beaucoup plus court.
