from browser import window
RUR = window.RUR

RUR._World_("src/worlds/blank.json")

current_ctx = RUR.ROBOT_CTX
current_ctx.fill_style = "black"

def line(pt0, pt1):
    x0, y0 = pt0
    x1, y1 = pt1

def rectangle(pt, width, height):
    x, y = pt
    current_ctx.fillRect(x, y, width, height)

def clear_all():
    RUR.vis_world.clear_all_ctx();
