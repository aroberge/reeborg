Face au sud
============

La boussole de Reeborg est brisée; il peut seulement l'utiliser
pour déterminer s'il fait face au nord, en utilisant,
``face_au_nord()``, mais c'est tout.

Lorsque nous avons présenté ``return`` dans `une leçon précédente <../variables/return.html>`_
nous avons vu comment nous pouvions définir un test permettant à Reeborg
de déterminer d'il faisait face au sud de la façon suivante::

    def face_au_sud():
        tourne_a_gauche()
        tourne_a_gauche()
        orientation = face_au_nord()
        tourne_a_gauche()
        tourne_a_gauche()
        return orientation


    # on oriente Reeborg pour qu'il soit face au sud comme test
    while not face_au_sud():
        tourne_a_gauche()

.. topic:: À votre tour!

    Définissez une **méthode** ``face_au_sud`` en remplaçant ``pass`` par
    les lignes de code appropriées.

    .. code-block:: py3

        class RobotRéparé(RobotUsage):
            def face_au_sud(self):
                pass

        reeborg = RobotRéparé(3, 3)
        while not reeborg.face_au_sud():
            reeborg.tourne_a_gauche()

    Reeborg ne devrait **pas** tourner à l'écran pendant qu'il détermine
    son orientation.

.. hint::

   Plutôt que de tourner à gauche en utilisant ``reeborg.tourne_a_gauche()``,
   changez plutôt la valeur de l'attribut ``orientation`` avant, et après
   utiliser ``orientation = self.face_au_nord()``

.. topic:: Faites-le d'une autre façon!

   Il y a deux façons permettant à Reeborg de déterminer directement
   son orientation.  Une d'entre elle est mentionnée dans l'indice ci-dessus et
   utilise une variable ``orientation``, suivant le modèle
   d'une `leçon précédente <../variables/return.html>`_.
   Une autre façon, encore plus directe, peut être suggérée en explorant
   le code **Javascript** grâce aux fonctions ``examine()`` et ``voir_source()``.
   Ce que vous avez peut-être besoin de savoir est que les mots français
   nord, sud, est, ouest, sont traduits en anglais par north, south, east, west.



.. topic:: Encore davantage!

    Écrivez et testez les méthodes ``face_a_l_est()`` et ``face_a_l_ouest()``.


Une petite adaptation
---------------------

Si la boussole de Reeborg est réparée, il devrait pouvoir s'orienter rapidement
dans n'importe quelle direction.


.. topic:: Essayez!

    Écrivez le code pour 4 méthodes de plus, une pour chaque orientation,
    en commençant avec ``au_nord()`` qui fera en sorte que Reeborg se tourne
    immédiatement dans l'orientation demandée d'un seul mouvement.
    Assurez-vous d'enregistrer le résultat du mouvement avec
    ``RUR.rec.record_frame()``.
    Ne vous inquiétez pas si la tache d'huile a des apparences bizarres lorsque
    vous utilisez ces méthodes dans un programme (ce que vous allez faire
    bien sûr, n'est-ce pas?)
