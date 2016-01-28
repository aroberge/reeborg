
/** @function add_new_home_tile
 * @memberof RUR
 * @instance
 * @summary This function makes it possible to add a new image to use as
 *    a home tile. If the name of an existing home tile is specified again,
 *    the image for that object is replaced; we suggest you do not do this.

 *
 * @desc Cette fonction permet l'ajout de nouvelles images à utiliser comme
 *   but à atteindre pour le robot.  Si le nom d'un but existant est spécifié,
 *   l'image pour ce but est remplacée par la nouvelle image; nous vous suggérons
 *   de ne pas faire ceci.
 *
 * @param {string} name The name to be used for this tile<br>
 *                        _Le nom à utiliser pour cet objet._
 * @param {string} url - URL where the image can be found.
 *                    <br> _URL où l'image peut être trouvée_
 * @param {string} info - A sentence to be displayed when the user queries information
 *                       about the world; something like "goal: Reeborg can detect
 *                       this tile using at\_goal()." <br> *Une phrase décrivant ce but lorsqu
 *                       l'usager consulte la description du monde; quelque chosen
 *                       comme "but: Reeborg peut détecter ceci en utilisant au\_but()".*
 *
 */

RUR.add_new_home_tile = function (name, url, info) {
    var home = RUR.HOME_IMAGES;
    home[name] = {};
    home[name].detectable = true;
    home[name].info = info;
    home[name].image = new Image();
    home[name].image.src = url;
    home[name].image.onload = RUR.INCREMENT_LOADED_FN;
    RUR._NB_IMAGES_TO_LOAD += 1;
};
