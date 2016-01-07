"""Ce module contient les fonctions, classes et exceptions qui peuvent être
utilisées dans un programme Python pour le Monde de Reeborg.
"""

# When generating documentation using sphinx, these modules are both
# unavailable and not needed
try:
    from browser import window
    RUR = window.RUR
except ImportError:
    from collections import defaultdict
    window = defaultdict(str)
    print("\n --> Skipping importing from browser for sphinx.\n")


# All functions from Javascript used below should have names of the form
# RUR._xyz_ and be defined in commands.js; functions and methods should appear
# in the same order as they appear in the English version.


def au_but():  #py:at_goal
    """Indique si Reeborg a atteint la position demandée.

    Returns:
        True si Reeborg a atteint son but, False autrement.
    """
    return RUR._at_goal_()


def observer(expr):  #py:add_watch
    """Ajoute une expression Python valide (donnée comme une chaîne)
       à la liste des variables à observer.
    """
    RUR.add_watch(expr)


def construit_un_mur():  #py:build_wall
    """Indique à Reeborg de construire un mur devant sa position."""
    RUR._build_wall_()


def transporte(obj=None):  #py:carries_object
    """ Indique si Reeborg transporte un ou des objets.

    Args:
        obj: paramètre optionnel qui est le nom d'un objet sous forme de
            chaîne de caractères.

    Returns:
        une liste d'objets retrouvés.  Si Reeborg ne transporte aucun objet,
        ou si un objet spécifié comme paramètre n'est pas présent,
        le résultat est une liste vide.

    Exemples possibles:

        >>> transporte()
        ["jeton", "pomme"]
        >>> transporte("jeton")
        ["jeton"]
        >>> transporte("fraise")
        []
    """
    if obj is not None:
        ans = RUR._carries_object_(obj)
    else:
        ans = RUR._carries_object_()
    return list(ans)


def efface_print():  #py:clear_print
    """Efface le texte précédemment écrit avec des fonctions print()."""
    RUR._clear_print_()


def robot_par_defaut():  #py:default_robot
    """Retourne un robot recréé pour correspondre au robot par défaut."""
    class Robot(RobotUsage):
        def __init__(self):
            self.body = RUR._default_robot_()
    return Robot()


def dir_js(obj):  #py:dir_js
    """Liste les attributs et méthodes d'un objet Javascript."""
    RUR._dir_js_(obj)


def dir_py(obj):  #py:dir_py
    """Lists attributes and methods of a Python object, excluding
       those whose name start with a double underscore and are
       considered to be private.
    """
    attrs = []
    for attr in dir(obj):
        if attr.startswith("__"):
            continue
        if callable(getattr(obj, attr)):
            attr += "()"
        attrs.append(attr)
    print_html(str("\n".join(attrs)).replace("&", "&amp").replace("<", "&lt;"
                  ).replace(">", "&gt;").replace("\n", "<br>"))


def termine():  #py:done
    """Termine l'exécution d'un programme."""
    RUR._done_()


def rien_devant():  #py:front_is_clear
    """Indique si un obstacle (mur, clôture, eau, mur de brique, etc.)
       bloque le chemin.

    Returns:
       True si le chemin est non bloqué, False autrement."""
    return RUR._front_is_clear_()


def dans_le_sac():  #py:in_the_bag
    return dict(RUR._in_the_bag_())


def est_face_au_nord():  #py:is_facing_north
    """Indique si Reeborg fait face au nord (haut de l'écran) ou non."""
    return RUR._is_facing_north_()

def avance():  #py:move
    """Avance d'une case"""
    RUR._move_()


def pas_de_surlignement():  #py:no_highlight
    """Empêche le surlignement de lignes de code d'être effectué.
       Pour véritablement éliminer tout effet lié au surlignement de
       lignes de code, il peut être nécessaire d'exécuter un programme
       à deux reprises."""
    RUR._no_highlight_()


def objet_ici(obj=None):  #py:object_here
    """ Indique si un ou des types d'objets se trouvent à la position du robot.

    Args:
        obj: paramètre optionnel qui est le nom d'un objet sous forme de
            chaîne de caractères.

    Returns:
        une liste d'objets retrouvés.  Si aucun objet n'est présent
        ou si un objet spécifié comme paramètre n'est pas présent,
        le résultat est une liste vide.

    Exemples possibles:

        >>> objet_ici()
        ["jeton", "pomme"]
        >>> objet_ici("jeton")
        ["jeton"]
        >>> objet_ici("fraise")
        []
    """
    if obj is not None:
        ans = RUR._object_here_(obj)
    else:
        ans = RUR._object_here_()
    return list(ans)  # convert from js list-like object to proper Python list


def pause(ms=None):  #py:pause
    """Pause l'éxecution du programme à l'écran.

       Si un argument (temps, en millisecondes) est fourni, l'exécution
       redémarre automatiquement après que ce temps ait été écoulé.
    """
    if ms is None:
        RUR._pause_()
    else:
        RUR._pause_(ms)


def depose(obj=None):  #py:put
    """Dépose un objet.  Si Reeborg transporte plus d'un type d'objet,
       on doit spécifier lequel sinon ceci causera une exception."""
    if obj is None:
        RUR._put_()
    else:
        RUR._put_(obj)


def enregistrement(bool):  #py:recording
    """Arrête ou redémarre les enregistrement d'actions de Reeborg.

    Args:
        bool: True si on veut avoir des enregistrement, False autrement
    """
    RUR._recording_(bool)


def plus_de_robots():  #py:remove_robots
    """Élimine tous les robots existants"""
    RUR._remove_robots_()


def rien_a_droite():  #py:right_is_clear
    """Indique si un obstacle (mur, clôture, eau, mur de brique, etc.)
       se trouve à la droite immédiate de Reeborg.

    Returns:
       True si un obstacle est à la droite, False autrement."""
    return RUR._right_is_clear_()


def couleur_de_trace(couleur):  #py:set_trace_color
    """Change la couleur de trace du robot.

       Args:
            couleur: quatre formats sont possibles soit les noms de
                     couleur du web (en anglais), les formats rgb et rgba,
                     et la notation hexadécimale.

       Exemples possibles::

            >>> couleur_de_trace("red")  # nom de couleur en anglais
            >>> couleur_de_trace("rgb(125, 0, 0)")
            >>> couleur_de_trace("rgba(125, 0, 0, 0.5)")
            >>> couleur_de_trace("#FF00FF")
    """
    RUR._set_trace_color_(couleur)


def style_de_trace(style="normal"):  #py:set_trace_style
    """Change le style de trace du robot.

       Args:
            style: "épais" ou "epais" (sans accent) pour une trace
                   plus visible, "invisible" pour une trace invisible(!),
                   "normal" ou ne pas spécifier d'argument pour avoir
                   le style normal.

                   Le choix "invisible" est équivalent à
                   couleur_de_trace("rgba(0, 0, 0, 0)") c'est-à-dire
                   une couleur complètement transparente.

                   La trace plus épaisse est centrée et ne permet pas
                   de voir qu'un virage à droite est constitué de trois
                   virages à gauche, ni de distinguer les aller-retours.
    """
    if style in ["épais", "epais"]:
        style = "thick"
    elif style == "normal":
        style = "default"
    elif style == "invisible":
        pass  # leave as is
    else:
        raise ReeborgError("Valeur de style inconnue pour style_de_trace().")
    RUR._set_trace_style_(style)


def son(bool):  #py:sound
    """Active ou désactive les effets sonores."""
    RUR._sound_(bool)


def prend(obj=None):  #py:take
    """Prend un objet.  Si plus d'un type d'objet se trouve à l'endroit où
       Reeborg est, on doit spécifier lequel sinon ceci causera une exception.
    """
    if obj is None:
        RUR._take_()
    else:
        RUR._take_(obj)


def pense(ms):  #py:think
    """Fixe un délai entre les actions de Reeborg à l'écran."""
    RUR._think_(ms)


def tourne_a_gauche():  #py:turn_left
    """Reeborg tourne à sa gauche."""
    RUR._turn_left_()


def voir_source_js(fn):  #py:view_source_js
    """Affiche le code source d'une fonction Javascript."""
    RUR._view_source_js_(fn)


def mur_devant():  #py:wall_in_front
    """Indique si un mur bloque le chemin.

    Returns:
       True si un mur est devant, False autrement."""
    return RUR._wall_in_front_()


def mur_a_droite():  #py:wall_on_right
    """Indique si un mur se trouve immédiatement à la droite de Reeborg.

    Returns:
       True si un mur est à la droite, False autrement."""
    return RUR._wall_on_right_()


def Monde(url, nom=None):  #py:World
    """Permet de sélectioner un monde donné à l'intérieur d'un programme.
       Si le monde présentement utilisé est différent, le résultat de
       l'exécution de cette instruction fera en sorte que le monde spécifié
       par le paramètre `url` sera choisi sans que le reste du programme
       ne soit déjà exécuté. Si le monde spécifié est déjà le monde
       choisi, la fonction `Monde(...)` est ignorée et le reste
       du programme est exécuté.

       Le monde spécifié sera ajouté au sélecteur s'il n'est pas
       déjà présent.

       Args:
            url: deux choix possibles, soit un nom apparaissant dans le
                 sélecteur de monde, ou un lien à un document accessible
                 via Internet.
            nom: paramètre optionnel; si ce paramètre est choisi, le nom
                       apparaissant dans le sélecteur sera nom.

       Exemples:

           >>> Monde("But 1")  # monde inclus par défaut
           >>> Monde("http://reeborg.ca/mon_monde")   # exemple fictif
           # le nom http://reeborg.ca/mon_monde sera ajouté au sélecteur
           >>> Monde("http://reeborg.ca/mon_monde", "Bonjour")
           # le nom Bonjour sera ajouté au sélecteur pour indiquer ce monde.
    """
    if nom is None:
        RUR.file_io.load_world_from_program(url)
    else:
        RUR.file_io.load_world_from_program(url, nom)


def max_nb_instructions(nb):  #py:set_max_nb_instructions
    """Surtout destiné aux créateurs de mondes,
       ceci permet de changer le nombre maximal d'instructions
       exécutées par un robot.
    """
    RUR._set_max_steps_(nb)

def max_nb_robots(nb):  #py:set_max_nb_robots
    """Surtout destiné aux créateurs de mondes,
       ceci permet de limiter le nombre de robots
       permis dans un monde donné.
    """
    RUR._set_max_nb_robots_(nb)


def print_html(html, append=False):  #py:print_html
    """Surtout destiné aux créateurs de monde, la fonction print_html() est
       semblable à print() sauf qu'elle accepte du texte html.
    """
    RUR.output.print_html(html, append)
window['print_html'] = print_html


def nouvelles_images_de_robot(images):  #py:new_robot_images
    """Surtout destiné aux créateurs de mondes, ceci permet de remplacer
    les images utilisées pour le robot par d'autres images.

    Une explication plus détaillée viendra.
    """
    if "est" in images:
        images["east"] = images["est"]
    if "ouest" in images:
        images["west"] = images["ouest"]
    if "nord" in images:
        images["north"] = images["nord"]
    if "sud" in images:
        images["south"] = images["sud"]
    RUR._new_robot_images_(images)

def MenuPersonalise(contenu):  #py:MakeCustomMenu
    """À l'intention des éducateurs.  Permet de créer des menus de monde
       personalisés.  Voir la documentation pour plus de détails."""
    RUR.custom_menu.make(contenu)


class RobotUsage(object):  #py:UR
    def __init__(self, x=1, y=1, orientation='est', jeton=None):  #py:UR.__init__
        """Créé un robot usagé.

           Args:
               x: coordonnée horizontale; un entier supérieur ou égal à 1
               y: coordonnée vertical; un entier supérieur ou égal à 1
               orientation: une des valeurs suivante: "nord", "sud",
                            est", "ouest"
               jeton: nombre initial de jetons à donner au robot;
                      un entier positif, ou la chaîne "inf" pour un
                      nombre infini.
        """
        if jeton is None:
            robot = RUR.robot.create_robot(x, y, orientation)
        else:
            robot = RUR.robot.create_robot(x, y, orientation, jeton)
        self.body = robot
        RUR.world.add_robot(self.body)

    def __str__(self):  #py:UR.__str__
        location = "({}, {})".format(self.body.x, self.body.y)

        if self.body._orientation == RUR.EAST:
            facing = "est face à l'est"
        elif self.body._orientation == RUR.WEST:
            facing = "est face à l'ouest"
        elif self.body._orientation == RUR.NORTH:
            facing = "est face au nord"
        elif self.body._orientation == RUR.SOUTH:
            facing = "est face au sud"

        if 'token' in self.body.objects:
            if self.body.objects['token'] == 'inf':
                carries = "transporte un nombre infini de jetons."
            else:
                carries = 'transporte %s jetons' % self.body.objects['token']
        else:
            carries = 'ne transporte pas de jetons'
        return "RobotUsage situé en {} {} {}.".format(location, facing, carries)  # NOQA

    def avance(self):  #py:UR.move
        """avance d'une case"""
        RUR.control.move(self.body)

    def au_but(self):  #py:UR.at_goal
        """Indique si Reeborg a atteint la position demandée.

        Returns:
            True si Reeborg a atteint son but.
        """
        return RUR.control.at_goal(self.body)

    def construit_un_mur(self):  #py:UR.build_wall
        """Indique à Reeborg de construire un mur devant sa position."""
        RUR.control.build_wall(self.body)

    def rien_devant(self):  #py:UR.front_is_clear
        """Indique si un obstacle (mur, clôture, eau, mur de brique, ) bloque
           le chemin.

        Returns:
           True si le chemin est non bloqué, False autrement."""
        return RUR.control.front_is_clear(self.body)

    def mur_devant(self):  #py:UR.wall_in_front
        """Indique si un mur bloque le chemin.

        Returns:
           True si un mur est devant, False autrement."""
        return RUR.control.wall_in_front(self.body)

    def rien_a_droite(self):  #py:UR.right_is_clear
        """Indique si un obstacle (mur, clôture, eau, mur de brique, etc.)
           se trouve à la droite immédiate de Reeborg.

        Returns:
           True si un obstacle est à la droite, False autrement."""
        return RUR.control.right_is_clear(self.body)

    def mur_a_droite(self):  #py:UR.wall_on_right
        """Indique si un mur se trouve immédiatement à la droite de Reeborg.

        Returns:
           True si un mur est à la droite, False autrement."""
        return RUR.control.wall_on_right(self.body)

    def dans_le_sac(self):  #py:UR.in_the_bag
        return dict(RUR._in_the_bag_(self.body))

    def est_face_au_nord(self):  #py:UR.is_facing_north
        """Indique si Reeborg fait face au nord (haut de l'écran) ou non."""
        return RUR.control.is_facing_north(self.body)

    def depose(self, obj=None):  #py:UR.put
        """Dépose un objet.  Si Reeborg transporte plus d'un type d'objet,
           on doit spécifier lequel sinon ceci causera une exception."""
        if obj is None:
            RUR.control.put(self.body)
        else:
            RUR.control.put(self.body, obj)

    def prend(self, obj=None):  #py:UR.take
        """Prend un objet.  Si plus d'un type d'objet se trouve à l'endroit où
           Reeborg est, on doit spécifier lequel sinon ceci causera une
           exception.
        """
        if obj is None:
            RUR.control.take(self.body)
        else:
            RUR.control.take(self.body, obj)

    def objet_ici(self, obj=None):  #py:UR.object_here
        """ Indique si un ou des types d'objets se trouvent à la position du robot.

        Args:
            obj: paramètre optionnel qui est le nom d'un objet sous forme de
                chaîne de caractères.

        Returns:
            une liste d'objets retrouvés.  Si aucun objet n'est présent
            ou si un objet spécifié comme paramètre n'est pas présent,
            le résultat est une liste vide.

        Exemples possibles:

            >>> reeborg = RobotUsage()
            >>> reeborg.objet_ici()
            ["jeton", "pomme"]
            >>> reeborg.objet_ici("jeton")
            ["jeton"]
            >>> reeborg.objet_ici("fraise")
            []
        """
        if obj is not None:
            return list(RUR.control.object_here(self.body, obj))
        else:
            return list(RUR.control.object_here(self.body))

    def transporte(self, obj=None):  #py:UR.carries_object
        """ Indique si Reeborg transporte un ou des objets.

        Args:
            obj: paramètre optionnel qui est le nom d'un objet sous forme de
                chaîne de caractères.

        Returns:
            une liste d'objets retrouvés.  Si Reeborg ne transporte
            aucun objet, ou si un objet spécifié comme paramètre n'est pas
            présent, le résultat est une liste vide.

        Exemples possibles:

            >>> reeborg = RobotUsage()
            >>> reeborg.transporte()
            ["jeton", "pomme"]
            >>> reeborg.transporte("jeton")
            ["jeton"]
            >>> reeborg.transporte("fraise")
            []
        """
        if obj is not None:
            return list(RUR.control.carries_object(self.body, obj))
        else:
            return list(RUR.control.carries_object(self.body))

    def tourne_a_gauche(self):  #py:UR.turn_left
        RUR.control.turn_left(self.body)

    def modele(self, modele):  #py:UR.set_model
        """Permet de choisir le modèle du robot.

           Args:
              modele: un nombre de 0 à 3.
        """
        RUR.control.set_model(self.body, modele)

    def couleur_de_trace(self, couleur):  #py:UR.set_trace_color
        """Change la couleur de trace du robot.

           Args:
                couleur: quatre formats sont possibles soit les noms de
                         couleur du web (en anglais), les formats rgb et rgba,
                         et la notation hexadécimale.

           Exemples possibles::

                >>> reeborg = RobotUsage()
                >>> reeborg.couleur_de_trace("red")  # nom anglais de couleur
                >>> reeborg.couleur_de_trace("rgb(125, 0, 0)")
                >>> reeborg.couleur_de_trace("rgba(125, 0, 0, 0.5)")
                >>> reeborg.couleur_de_trace("#FF00FF")
        """
        RUR.control.set_trace_color(self.body, couleur)

    def style_de_trace(self, style):  #py:UR.set_trace_style
        """Change le style de trace du robot.

           Args:
                style: "épais" ou "epais" (sans accent) pour une trace
                       plus visible, "invisible" pour une trace invisible(!),
                       "normal" ou ne pas spécifier d'argument pour avoir
                       le style normal.

                       La trace plus épaisse est centrée et ne permet pas
                       de voir qu'un virage à droite est constitué de trois
                       virages à gauche, ni de distinguer les aller-retours.
        """
        if style in ["épais", "epais"]:
            style = "thick"
        elif style == "invisible":
            pass
        elif style == "normal":
            style = "default"
        else:
            raise ReeborgError("Valeur de style inconnue pour style_de_trace().")  # NOQA
        RUR.control.set_trace_style(self.body, style)


class ReeborgError(Exception):  #py:RE
    """Exceptions spécifique au monde de Reeborg.

       Exemples possible::

            def termine():  #py:
                message = "Vous ne devez pas utiliser termine()."
                raise ReeborgError(message)

            #---- ou ------

            try:
                avance()
            except ReeborgError:   # ignore le mur qui bloquait le chemin
                tourne_a_gauche()
    """

    def __init__(self, message):  #py:RE.__init__
        self.reeborg_shouts = message

    def __str__(self):  #py:RE.__str__
        return repr(self.reeborg_shouts)
try:
    window['ReeborgError'] = ReeborgError
except:
    pass


class WallCollisionError(ReeborgError):  #py:WCE
    """Exception spécifique au monde de Reeborg.

       A lieu lorsque Reeborg frappe un mur
    """
    pass
try:
    window['WallCollisionError'] = WallCollisionError
except:
    pass


class InfoSatellite():  #py:SI

    @property
    def carte_du_monde(self):  #py:SI.world_map
        """retourne un dict qui contient l'information au
           sujet du monde.
        """
        import json
        return json.loads(RUR.control.get_world_map())

    def imprime_carte(self):  #py:SI.print_world_map
        """imprime une copie formattée de la carte"""
        print(RUR.control.get_world_map())

try:
    RUR.reeborg_loaded = True
    window.console.log("reeborg loaded")
except:
    pass

#py:obsolete
# Do not tranlate the following


def nombre_d_instructions(nb):
    raise ReeborgError(
        "nombre_d_instructions() a été remplacé par max_nb_instructions().")


def face_au_nord():
    # obsolete
    raise ReeborgError("face_au_nord() est désuet;" +
                       " utilisez est_face_au_nord()")
