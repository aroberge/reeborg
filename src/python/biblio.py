from browser import window
from preprocess import transform
from common import REEBORG_FR

ReeborgOK_saved = window['ReeborgOK_fr']
ReeborgOk_saved = window['ReeborgOk_fr']
ReeborgError_saved = window['ReeborgError_fr']
WallCollisionError_saved = window['WallCollisionError_fr']
MissingObjectError_saved = window['MissingObjectError_fr']

locals().update(REEBORG_FR)

window['ReeborgOK_fr'] = ReeborgOK_saved
window['ReeborgOk_fr'] = ReeborgOk_saved
window['ReeborgError_fr'] = ReeborgError_saved
window['WallCollisionError_fr'] = WallCollisionError_saved
window['MissingObjectError_fr'] = MissingObjectError_saved

src = transform(window.library.getValue())
exec(src)
