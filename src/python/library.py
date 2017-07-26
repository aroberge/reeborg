from browser import window
from preprocess import transform
from common import REEBORG_EN

ReeborgOK_saved = window['ReeborgOK_en']
ReeborgOk_saved = window['ReeborgOk_en']
ReeborgError_saved = window['ReeborgError_en']
WallCollisionError_saved = window['WallCollisionError_en']
MissingObjectError_saved = window['MissingObjectError_en']

locals().update(REEBORG_EN)

window['ReeborgOK_en'] = ReeborgOK_saved
window['ReeborgOk_en'] = ReeborgOk_saved
window['ReeborgError_en'] = ReeborgError_saved
window['WallCollisionError_en'] = WallCollisionError_saved
window['MissingObjectError_en'] = MissingObjectError_saved

src = transform(window.library.getValue())
exec(src)
