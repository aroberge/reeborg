// the following is used in a few places below
var mac_user_save_files_cn = ' <b>Mac 用户：</b> 请参考<a href="https://github.com/aroberge/reeborg/blob/master/dev_tools/known_problems.md" target="_blank" rel="noopener">已知的问题</a>。';

exports.ui_cn = ui_cn = {};
exports.cn_to_en = cn_to_en = {};

ui_cn["cn-en"] = "混合模式：中文界面，英文编程。<br>" +
    "Mixed mode: User Interface in Chinese; programming language in English.<br>";

ui_cn["SITE NAME"] = "乐跑的世界";
ui_cn["WORLD INFO"] = "世界信息";
ui_cn["EDITOR VISIBLE"] = "保持编辑器可见";

ui_cn["apple"] = "苹果";
cn_to_en["苹果"] = "apple";
ui_cn["banana"] = "香蕉";
cn_to_en["香蕉"] = "banana";
ui_cn["beeper"] = "喇叭";
cn_to_en["喇叭"] = "beeper";
ui_cn["box"] = "箱子";
cn_to_en["箱子"] = "box";
ui_cn["bridge"] = "桥";
cn_to_en["桥"] = "bridge";
ui_cn["carrot"] = "胡萝卜";
cn_to_en["胡萝卜"] = "carrot";
ui_cn["daisy"] = "菊花";
cn_to_en["菊花"] = "daisy";
ui_cn["dandelion"] = "蒲公英";
cn_to_en["蒲公英"] = "dandelion";
ui_cn["leaf"] = "树叶";
cn_to_en["树叶"] = "leaf";
ui_cn.square = "方块";
cn_to_en["方块"] = "square";
ui_cn.star = "星星";
cn_to_en["星星"] = "star";
ui_cn["strawberry"] = "草莓";
cn_to_en["草莓"] = "strawberry";
ui_cn.token = "笑脸";
cn_to_en["笑脸"] = "token";
ui_cn["tokens are Reeborg's favourite thing."] = "笑脸是乐跑最喜欢的物品。";
ui_cn.triangle = "三角形";
cn_to_en["三角形"] = "triangle";
ui_cn["tulip"] = "郁金香";
cn_to_en["郁金香"] = "tulip";
ui_cn["bucket"] = "桶";
cn_to_en["桶"] = "bucket";
ui_cn["bulb"] = "球茎";
cn_to_en["球茎"] = "bulb";
ui_cn["bricks"] = "砖";
cn_to_en["砖"] = "bricks";

ui_cn["mud"] = "泥";
cn_to_en["泥"] = "mud";
ui_cn["soil"] = "土壤";
cn_to_en["土壤"] = "soil";
ui_cn["water"] = "水";
cn_to_en["水"] = "water";
ui_cn["grass"] = "草";
cn_to_en["草"] = "grass";
ui_cn["gravel"] = "砾石";
cn_to_en["砾石"] = "gravel";
ui_cn["ice"] = "冰";
cn_to_en["冰"] = "ice";
ui_cn["fire"] = "火";
cn_to_en["火"] = "fire";

ui_cn["infinite"] = "无穷";

ui_cn["fence_right"] = "右侧篱笆";
cn_to_en["右侧篱笆"] = "fence_right";
ui_cn["fence_left"] = "左侧篱笆";
cn_to_en["左侧篱笆"] = "fence_left";
ui_cn["fence_vertical"] = "垂直篱笆";
cn_to_en["垂直篱笆"] = "fence_vertical";
ui_cn["fence_double"] = "双侧篱笆";
cn_to_en["双侧篱笆"] = "fence_double";

ui_cn["Invalid Javascript code in Onload editor"] = "Onload 编辑器里有无效的 JavaScript 代码。";
ui_cn["Invalid Python code in Onload editor"] = "Onload 编辑器里有无效的 Python 代码。";

ui_cn["Too many steps:"] = "太多步骤了：{max_steps}<br>使用 <code>set_max_nb_steps(nb)</code> 来提高上线。";
ui_cn["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>乐跑的 x 坐标正确。</li>";
ui_cn["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>乐跑的 x 坐标不正确。</li>";
ui_cn["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>乐跑的 y 坐标正确。</li>";
ui_cn["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>乐跑的 y 坐标不正确。</li>";
ui_cn["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>所有的物品都在正确的位置。</li>";
ui_cn["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>一个或多个物品不在正确的位置。</li>";
ui_cn["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>所有的墙都砌在了正确的位置。</li>";
ui_cn["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>一个或多个墙缺失或不在正确的位置。</li>";
ui_cn["Last instruction completed!"] = "已完成最后一条指令！";
ui_cn["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'><code>完成()</code> 指令执行完毕。</p>";

ui_cn["Unknown object"] = "未知物品：<code>{obj}</code>";
ui_cn["No object found here"] = "这里没有物品：<code>{obj}</code>";
ui_cn["object"] = "物品";
ui_cn["I don't have any object to put down!"] = "我没有<code>{obj}</code>可以放下！";
ui_cn["There is already a wall here!"] = "这里已经有墙了！";
ui_cn["There is no wall to remove!"] = "这里没有墙可以移除！";
ui_cn["Ouch! I hit a wall!"] = "啊呀！我撞到墙了！";
ui_cn["Done!"] = "完成！";
ui_cn["There is no position as a goal in this world!"] = "这个世界里没有目的地坐标！";
ui_cn["There is no goal in this world!"] = "这个世界里没有目标！";
ui_cn["I carry too many different objects. I don't know which one to put down!"] = "我带了很多不同的物品，不知道要放下哪个！";
ui_cn["Many objects are here; I do not know which one to take!"] = "这里有很多不同的物品，我不知道要拾起哪个！";

ui_cn.east = "东";
ui_cn.north = "北";
ui_cn.west = "西";
ui_cn.south = "南";
cn_to_en["东"] = "east";
cn_to_en["北"] = "north";
cn_to_en["西"] = "west";
cn_to_en["南"] = "south";
ui_cn["Unknown orientation for robot."] = "未知的机器人朝向";

ui_cn["Invalid position."] = "{pos}是无效的坐标。";
ui_cn["Invalid orientation."] = "'{orient}'是未知的朝向。";

ui_cn["World selected"] = "选择了世界：{world}";
ui_cn["Could not find world"] = "找不到世界：{world}";
ui_cn["Object names"] = " 库、笑脸、星星、三角形、方块等等。";

ui_cn["Invalid world file."] = "无效的世界文件。";
ui_cn["PERMALINK"] = "固定链接";
ui_cn["Could not find link: "] = "找不到链接：";

ui_cn["Click on world to move robot."] = "点击世界里的格子以添加或移除乐跑可能的初始位置。";
ui_cn["Added robot."] = "添加了乐跑。";
ui_cn["Click on image to turn robot"] = "点击图片以旋转乐跑。";
ui_cn["Robot now has tokens."] = "乐跑现在有{x_tokens}个笑脸。";
ui_cn["Click on world to add object."] = "点击世界里的格子以设置<code>{obj}</code>的数量。";
ui_cn["Click on desired object below."] = "在下面点击所需的物品。";
ui_cn["Click on world to toggle walls."] = "点击世界里的格子以添加或移除墙。";
ui_cn["Click on world to set home position for robot."] = "点击世界里的格子以添加或移除乐跑可能的目的地位置。";
ui_cn["Click on world to toggle additional walls to build."] = "点击世界里的格子以添加或移除需要砌墙的位置。";
ui_cn["Click on desired goal object below."] = "在下面点击所需的目标物品。";
ui_cn["Click on world to set number of goal objects."] = "点击世界里的格子以设置目标<code>{obj}</code>的数量。";
ui_cn["Enter number of tokens for robot to carry (use inf for infinite number)"] = "输入乐跑所携带的笑脸数量。";
ui_cn[" is not a valid value!"] = " 不是一个有效的数字！";
ui_cn["Enter number of objects desired at that location."] = "点击世界里的格子以设置<code>{obj}</code>的数量。";
ui_cn["Objects found here:"] = "这里的物品有：";
ui_cn["Description"] = "说明";
ui_cn["A robot located here carries no objects."] = "座标 (x, y) = ({x}, {y}) 的机器人没有携带物品。";
ui_cn["Goal to achieve:"] = "需要达成的目标：";
ui_cn["A robot located here carries:"] = "座标 (x, y) = ({x}, {y}) 的机器人携带有：";
ui_cn["random location"] = "随机位置";
ui_cn["Enter number of objects to give to robot."] = "输入给机器人的<code>{obj}</code>的数量。";
ui_cn["Special information about this location:"] = "这个位置的特别信息：";
ui_cn["Click on world to toggle tile."] = "点击世界里的格子以添加或移除<code>{obj}</code>贴图。";
ui_cn["Click on desired tile below."] = "在下面点击所需的贴图。";
ui_cn["A wall must be built east of this location."] = "在此位置，墙只能砌在东边。";
ui_cn["A wall must be built north of this location."] = "在此位置，墙只能砌在北边。";
ui_cn["A wall must be built west of this location."] = "在此位置，墙只能砌在西边。";
ui_cn["A wall must be built south of this location."] = "在此位置，墙只能砌在南边。";
ui_cn["The final required position of the robot will be chosen at random."] = "机器人的目的地将会被随机选择。";
ui_cn["The final position of the robot must be (x, y) = "] = "机器人最后必须停留在坐标 (x, y) = ";
ui_cn["Click on world to fill with given tile."] = "点击世界里的格子以填充指定的贴图。";
ui_cn["Enter url of image to use as background."] = "请输入背景图片的链接。";
ui_cn["Replace editor content"] = "你想把编辑器里的代码替换为这个世界的作者所提供的代码吗？";
ui_cn["Replace library content"] = "你想把库里的代码替换为这个世界的作者所提供的代码吗？";
ui_cn["colour"] = "颜色";
ui_cn["There is already a bridge here."] = "There is already a bridge here.";

ui_cn["Name already exist; confirm that you want to replace its content."] = "该名称已经存在，请确认你想替换其中的内容。";
ui_cn["No such world!"] = "该世界不存在！";
ui_cn["Enter world name to save"] = "请输入世界的名称以保存。使用名称：";
ui_cn["Enter world name to delete"] = "请输入要删除的世界的名称。删除世界";
ui_cn["Delete "] = "删除";

ui_cn["Error found at or near line {number}."] = "在第{number}行或附近发现错误。";
ui_cn["<br>Perhaps a missing colon is the cause."] = "<br>可能是由于缺少冒号（“:”）造成的。";
ui_cn["<br>Perhaps you forgot to add parentheses ()."] = "<br>你可能忘记了加括号（“()”）。";
ui_cn["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>你可能写错了世界的名字、忘记了定义一个函数或变量。";
ui_cn["I cannot help you with this problem."] = "关于这个错误，我帮不了你。";

ui_cn["I'm stuck in mud."] = "我陷在泥里了。";
ui_cn["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "泥：乐跑<b>无法</b>发现，来到此位置将被困住。";
ui_cn["Soil: usually safe, but looks identical to mud."] = "土壤：一般是安全的，但看起来和泥一样。";
ui_cn["I'm slipping on ice!"] = "我在冰上打滑了！";
ui_cn["Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."] = "冰：乐跑<b>无法</b>发现，来到此位置将<em>可能</em>会滑到下一格。";
ui_cn["Grass: usually safe."] = "草：一般是安全的。";
ui_cn["Gravel: usually safe."] = "砾石：一般是安全的。";
ui_cn["I'm in water!"] = "我掉水里了！";
ui_cn["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "水：乐跑<b>可以</b>发现，来到此位置将会损坏。";
ui_cn["green home tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "绿色基地贴图：乐跑<b>可以</b>用 at_goal() 发现。";
ui_cn["Crash!"] = "哎呦！";
ui_cn["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "砖墙：乐跑<b>可以</b>发现，试图穿越此位置将会受伤。";
ui_cn["I hit a fence!"] = "我撞到篱笆了！";
ui_cn["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "篱笆：乐跑<b>可以</b>发现，但无法穿越。";
ui_cn["Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "桥：乐跑<b>可以</b>发现，并且知道可以用来安全的渡水。";
ui_cn["My joints are melting!"] = "我的关节正在融化！";
ui_cn["A bucket full of water"] = "一桶满满的水。";
ui_cn["Tulip bulb: might grow into a nice tulip with some water from a bucket."] = "郁金香球茎：浇点桶里的水或许能长成郁金香。";


ui_cn["Something is blocking the way!"] = "有东西挡住了路！";
ui_cn["Reeborg <b>can</b> detect this tile using at_goal()."] = "乐跑<b>可以</b>用 at_goal() 发现此贴图。";
ui_cn["green home tile:"] = "绿色基地贴图：";
ui_cn["home:"] = "家：";
ui_cn["racing flag:"] = "赛车旗帜：";
ui_cn["house:"] = "房子：";

ui_cn["Local variables"] = "本地变量";
ui_cn["Global variables"] = "全局变量";
ui_cn["Watched expressions"] = "查看中的表达式";

ui_cn["move forward"] = "前进";
ui_cn["turn left"] = "左转";
ui_cn["take object"] = "拾起物品";
ui_cn["put object"] = "放下物品";
ui_cn["Pause the program's execution."] = "暂停执行程序。";
ui_cn["Build a wall in front of the robot."] = "在机器人前方砌墙。";
ui_cn["End the program's execution."] = "停止执行程序。";
ui_cn["True if a wall is blocking the way."] = "当有墙挡住路时，返回“是”";
ui_cn["True if nothing is blocking the way."] = "当没有东西挡住路时，返回“是”";
ui_cn["True if desired destination."] = "当到达目的地时，返回“是”";
ui_cn["True if robot carries at least one object."] = "当机器人携带有物品时，返回“是”";
ui_cn["True if there is at least one object here."] = "当此处有物品时，返回“是”";
ui_cn["True if robot is facing North."] = "当机器人朝向北方时，返回“是”";
ui_cn["Delay between actions; default is 300 ms."] = "操作间的延迟，默认为300毫秒。";

ui_cn["Save world in browser"] = "在浏览器中保存";
ui_cn["LOAD BLOCKLY"] = "导入到工作区";
ui_cn["LOAD BLOCKLY EXPLAIN"] = "打开文件并用其内容替换 Blockly 工作区当前的内容。";
ui_cn["LOAD EDITOR"] = "导入到编辑器";
ui_cn["LOAD EDITOR EXPLAIN"] = "打开文件并用其内容替换代码编辑器当前的内容。";
ui_cn["LOAD LIBRARY"] = "导入到库";
ui_cn["LOAD LIBRARY EXPLAIN"] = "打开文件并用其内容替换库里当前的内容。";
ui_cn["LOAD WORLD"] = "加载世界";
ui_cn["LOAD WORLD EXPLAIN"] = "打开文件并导入世界内容。";
ui_cn["SAVE BLOCKLY"] = "保存工作区";
ui_cn["SAVE BLOCKLY EXPLAIN"] = "把工作区的内容（blocks）保存到文件。" + mac_user_save_files_cn;
ui_cn["SAVE EDITOR"] = "保存程序";
ui_cn["SAVE EDITOR EXPLAIN"] = "把程序保存到文件。" + mac_user_save_files_cn;
ui_cn["SAVE LIBRARY"] = "保存库";
ui_cn["SAVE LIBRARY EXPLAIN"] = "把库保存到文件。" + mac_user_save_files_cn;
ui_cn["SAVE WORLD"] = "保存世界";
ui_cn["SAVE WORLD EXPLAIN"] = "把世界内容（以 JSON 对象的格式）保存到文件。" + mac_user_save_files_cn;


ui_cn["PROGRESS SECTION TITLE"] = "持续跟踪已解决的任务";
ui_cn["PROGRESS EXPLAIN"] = "已解决的任务在世界菜单里有" + RUR.CHECKMARK +
    "标识，该信息保存在浏览器里。当切换到不同的浏览器，该信息不会被同步。" +
    "如果你点击下面的保存按钮，当前浏览器里的任务进度信息将被保存为名为“progress.json”的文件。" +
    "你可以在别的浏览器里导入该文件以同步任务进度。";
ui_cn["SAVE PROGRESS"] = "保存";
ui_cn["IMPORT PROGRESS"] = "导入";
ui_cn["RETRIEVE SOLUTION"] = "检索解决方案";
ui_cn["RETRIEVE SOLUTION EXPLAIN"] = "如果这个世界的解决方案（blocks、代码和库里的代码）在当前的编程模式下有保存过，则该解决方案将被检索并替换当前的内容。";

ui_cn["ADD CONTENT TO WORLD"] = "从下面选择物品并添加到世界里。";
ui_cn["ADD BLOCKLY TEXT"] = "代码块";
ui_cn["ADD EDITOR TEXT"] = "编辑器里的代码";
ui_cn["ADD LIBRARY TEXT"] = "库里的代码";
ui_cn["ADD PRE TEXT"] = "Pre";
ui_cn["ADD POST TEXT"] = "Post";
ui_cn["ADD DESCRIPTION TEXT"] = "说明";
ui_cn["ADD ONLOAD TEXT"] = "Onload";

ui_cn["KEYBOARD BUTTON"] = "乐跑键盘";
ui_cn["ADDITIONAL OPTIONS"] = "其它选项";

ui_cn["BASIC COMMANDS"] = "基本指令";
ui_cn["DEFINING"] = "定义";
ui_cn["LOOPS"] = "循环";
ui_cn["DECISIONS"] = "判断";
ui_cn["CONDITIONS"] = "条件";
ui_cn["USING VARIABLES"] = "使用变量";
ui_cn["COMMANDS"] = "注释";
ui_cn["OTHER"] = "其它";
ui_cn["OBJECTS"] = "物品";

ui_cn["Python Code"] = "Python 代码";
ui_cn["Javascript Code"] = "JavaScript 代码";
ui_cn["LIBRARY"] = "库";
ui_cn["EXTRA"] = "更多";
ui_cn["PRE"] = "Pre";
ui_cn["POST"] = "Post";
ui_cn["DESCRIPTION"] = "说明";
ui_cn["ONLOAD"] = "Onload";

ui_cn["HIGHLIGHT IMPOSSIBLE"] = "代码中的问题导致我关闭了代码高亮。";
ui_cn["COMMAND RESULT"] = "从下面的菜单中选择一个操作执行。";

ui_cn["DELETE WORLD TEXT"] = "以下是当前存储在你的浏览器里并且可以删除的世界：";
ui_cn["PYTHON ONLY"] = "Python";
ui_cn["COLLABORATION"] = "合作";
ui_cn["TOGETHERJS EXPLAIN"] = "允许和另外一个或多个协作者使用 Mozilla 的 TogetherJS 进行合作的工具。不适用于 Blockly。";
ui_cn["WORLD CREATION TITLE"] = "世界：创建、编辑、……";
ui_cn["EDIT WORLD"] = "编辑世界";
ui_cn["EDIT WORLD EXPLAIN"] = "你可以通过编辑当前的世界来创建一个你自己的世界。";
ui_cn["PROGRAM IN EDITOR"] = "编辑器里的程序";
ui_cn["PROGRAM IN BLOCKLY WORKSPACE"] = "Blockly 工作区里的程序";
ui_cn["CONTACT"] = "电邮（英语或法语）：";
ui_cn["ISSUES"] = "提交错误报告、建议、其它问题等等（英语或法语）。";
ui_cn["FORUM"] = "论坛（英语或法语）";
ui_cn["HELP"] = "帮助";
ui_cn["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/en" target="_blank" rel="noopener">文档</a>';
ui_cn["PYTHON HELP"] = "使用 Python，如果执行<code>help()</code>可以得到一个指令列表；如果执行比如<code>help(move)</code>可以得到<code>move()</code>函数的说明。";
ui_cn["KEYBOARD HELP"] = "点击乐跑键盘可以看到可用的函数、Python 关键字等的列表。";

ui_cn["WORLD EDITOR"] = "世界编辑器";
ui_cn["m-east"] = "东";
ui_cn["m-north"] = "北";
ui_cn["m-west"] = "西";
ui_cn["m-south"] = "南";
ui_cn["m-random"] = "随机";
ui_cn["m-dimensions"] = "世界的尺寸";
ui_cn["m-add"] = "添加";
ui_cn["m-add-robot"] = "添加机器人";
ui_cn["m-robot"] = "机器人";
ui_cn["m-position"] = "坐标";
ui_cn["m-turn"] = "方向";
ui_cn["m-objects"] = "物品";
ui_cn["m-walls"] = "墙";
ui_cn["m-objects2"] = "物品";
ui_cn["m-tiles"] = "标题";
ui_cn["m-fill"] = "填充";
ui_cn["m-solid"] = "障碍物";
ui_cn["m-decorative"] = "装饰物";
ui_cn["m-background"] = "背景图片";
ui_cn["m-goal"] = "目标";
ui_cn["mg-robot"] = "机器人";
ui_cn["mg-walls"] = "墙";
ui_cn["mg-objects"] = "物体";

ui_cn["Reeborg says: I'm done!"] = "乐跑说：我完成了！";
ui_cn["Reeborg writes:"] = "乐跑写：";
ui_cn["Reeborg shouts: Something is wrong!"] = "乐跑喊：有什么地方出错了！";
ui_cn["Reeborg explores some Javascript code"] = "乐跑探索了一些 JavaScript 代码";
ui_cn["Reeborg states:"] = "乐跑宣布：";
ui_cn["Reeborg watches some variables!"] = "乐跑查看了一些变量！";
ui_cn["Click on the world to get some additional information."] = "点击世界以得到更多的信息。";

ui_cn["Reeborg's basic keyboard"] = "乐跑的基本键盘";
ui_cn["kbd-command-btn"] = "指令";
ui_cn["kbd-condition-btn"] = "条件";
ui_cn["kbd-python-btn"] = "Python";
ui_cn["kbd-py-console-btn"] = "Python";
ui_cn["kbd-javascript-btn"] = "JavaScript";
ui_cn["kbd-cpp-btn"] = "C++";
ui_cn["kbd-coffee-btn"] = "CoffeeScript";
ui_cn["kbd-objects-btn"] = "物品";
ui_cn["kbd-special-btn"] = "特殊";

ui_cn["UNDO"] = "撤销";
ui_cn["REDO"] = "重做";
ui_cn["tab"] = "TAB";
ui_cn["shift-tab"] = "Shift-TAB";
ui_cn["enter"] = "\u23CE";
ui_cn["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code>不是一个真正的 Python 关键字。";

ui_cn["Colour:"] = "颜色：";
ui_cn["Enter a colour"] = "输入一个颜色";

ui_cn["Background image"] = "背景图片";

ui_cn["NAME:"] = "名称：";


ui_cn["Set the world's dimensions"] = "设置世界的尺寸";
ui_cn["set-dimensions-explain"] = "如果需要，你可以更改默认的尺寸。请记得低解析度的显示器不能显示非常大的世界。";
ui_cn["Maximum x value:"] = "x 坐标的最大值";
ui_cn["Maximum y value:"] = "y 坐标的最大值";
ui_cn["Use small tiles"] = "使用小贴图";

ui_cn["Set goal number for object"] = "设置物品的目标数量";
ui_cn["dialog-goal-object-explain"] = "如果想使用该物品在世界中的总数，则勾选复选框。";
ui_cn["Number of objects"] = "物品数量";
ui_cn["All such objects"] = "使用物品总数";

ui_cn["Number of objects:"] = "物品数量：";
ui_cn["Maximum:"] = "最大值：";
ui_cn["Add object in the world"] = "设置物品数量";
ui_cn["ADD OBJECT EXPLAIN"] = "设置0可以移除该物品。如果<code>最大值</code>大于<code>物品数量</code>，那么物品数量会是一个在两个数值之间的随机数，该随机数在每次运行程序时被生成。";

ui_cn["Unlimited:"] = "无限";
ui_cn["Give object to robot"] = "把物品给机器人";
ui_cn["GIVE OBJECT EXPLAIN"] = "设置机器人所携带的物品数量。如果想设置数量为无线，则勾选复选框。";

ui_cn["UPDATE BLOCKLY CONTENT"] = "这个世界里有一些默认的工作区内容。想要替换掉当前的内容，请点击按钮。";
ui_cn["UPDATE BLOCKLY BUTTON"] = "替换当前内容";
ui_cn["Contents from World"] = "世界里的内容";

ui_cn["WARNING: Do not change this comment."] = "警告：不要更改这条注释。";
ui_cn["Library Code is below."] = "以下是库里的代码。";
ui_cn["No solution can be saved when using REPL (Py)."] = "使用 REPL（Py）模式时不能保存。";
ui_cn["No solution can be loaded when using REPL (Py)."] = "使用 REPL（Py）模式时不能加载。";

ui_cn["You are not allowed to use <code>done</code> in this world!"] = "在这个世界里，不允许使用<code>done()</code>！";
ui_cn["Execution ended before the <em>Post</em> code was executed."] = "在<em>Post</em>代码之前，执行已经结束。";

ui_cn["Difficulty level"] = "难度等级";

ui_cn["Expected result"] = "期望结果";
ui_cn["Differences highlighted"] = "不同点已高亮显示";
ui_cn["Actual result"] = "实际结果";

ui_cn["Cannot parse progress file."] = "无法分析进度文件。";
ui_cn["Cannot merge progress."] = "无法合并进度。";
ui_cn["No solution found for this world."] = "找不到这个世界的解决方案。";

ui_cn["THINKING"] = "思考中……";
