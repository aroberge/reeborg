// the following is used in a few places below
var mac_user_save_files_ko = ' <b>Mac users:</b> please see <a href="https://github.com/aroberge/reeborg/blob/master/dev_tools/known_problems.md" target="_blank" rel="noopener">Known problems</a>.';

exports.ui_ko = ui_ko = {};
exports.ko_to_en = ko_to_en = {};

ui_ko["ko-en"] = "혼용된 모드: 사용자 환경은 한국어로 번역되어 있지만, 프로그래밍 언어는 영어로 이루어져 있습니다. <br>" +
 "Mixed mode: User Interface in Korean; programming language in English.<br>";

ui_ko["SITE NAME"] = "리보그의 세상";
ui_ko["WORLD INFO"] = "월드 정보";
ui_ko["EDITOR VISIBLE"] = "에디터 유지하기";


ui_ko["apple"] = "사과";
ko_to_en["사과"] = "apple";
ui_ko["banana"] = "바나나";
ko_to_en["바나나"] = "banana";
ui_ko["beeper"] = "beeper";
ko_to_en["beeper"] = "beeper";
ui_ko["box"] = "상자";
ko_to_en["상자"] = "box";
ui_ko["bridge"] = "다리";
ko_to_en["다리"] = "bridge";
ui_ko["carrot"] = "당근";
ko_to_en["당근"] = "carrot";
ui_ko["daisy"] = "데이지 꽃";
ko_to_en["데이지 꽃"] = "daisy";
ui_ko["dandelion"] = "민들레";
ko_to_en["민들레"] = "dandelion";
ui_ko["leaf"] = "잎";
ko_to_en["잎"] = "leaf";
ui_ko.square = "사각형";
ko_to_en["사각형"] = "square";
ui_ko.star = "별";
ko_to_en["별"] = "star";
ui_ko["strawberry"] = "딸기";
ko_to_en["딸기"] = "strawberry";
ui_ko.token = "토큰";
ui_ko["tokens are Reeborg's favourite thing."] = "토큰 are Reeborg's favourite thing.";
ko_to_en["토큰"] = "token";
ui_ko.triangle = "삼각형";
ko_to_en["삼각형"] = "triangle";
ui_ko["tulip"] = "튤립";
ko_to_en["튤립"] = "tulip";
ui_ko["bucket"] = "물통"; // bucket of water; translated using google
ko_to_en["물통"] = "bucket";

ui_ko["bricks"] = "bricks";  // translation needed
ko_to_en["bricks"] = "bricks";

ui_ko["mud"] = "진흙";
ko_to_en["진흙"] = "mud";
ui_ko["soil"] = "흙"; // translated using google
ko_to_en["흙"] = "soil";
ui_ko["water"] = "물";
ko_to_en["물"] = "water";
ui_ko["grass"] = "잔디";
ko_to_en["잔디"] = "grass";
ui_ko["gravel"] = "자갈";
ko_to_en["자갈"] = "gravel";
ui_ko["ice"] = "얼음";
ko_to_en["얼음"] = "ice";
ui_ko["fire"] = "불";
ko_to_en["불"] = "fire"; // translated using google
// the following need translations; I do not trust google based
// on its recommendation for the French translation.
ui_ko["bulb"] = "tulip bulb";
ko_to_en["tulip bulb"] = "bulb";
ui_ko["Tulip bulb: might grow into a nice tulip with some water from a bucket."] = "Tulip bulb: might grow into a nice tulip with some water from a bucket.";

ui_ko["infinite"] = "infinite number";


// more translations needed
ui_ko["fence_right"] = "울타리 right";
ko_to_en["울타리 right"] = "fence_right";
ui_ko["fence_left"] = "울타리";
ko_to_en["울타리 left"] = "fence_left";
ui_ko["fence_double"] = "울타리";
ko_to_en["울타리 double"] = "fence_double";
ui_ko["fence_vertical"] = "울타리";
ko_to_en["울타리 vertical"] = "fence_vertical";

ui_ko["Invalid Javascript code in Onload editor"] = "유효하지 않은 자바스크립트 onload 코드입니다; 이 월드의 제작자에게 연락하세요.";
ui_ko["Invalid Python code in Onload editor"] = "유효하지 않은 파이썬 onload 코드입니다; 이 월드의 제작자에게 연락하세요.";

ui_ko["Too many steps:"] = "단계가 너무 많습니다: {max_steps}<br>한계를 높이려면 <code>set_max_nb_steps(nb)</code>를 사용하십시오.";
ui_ko["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>리보그는 올바른 x 위치에 있습니다. </li>";
ui_ko["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>리보그는 잘못된 x 위치에 있습니다. </li>";
ui_ko["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>리보그는 올바른 y 위치에 있습니다. </li>";
ui_ko["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>리보그는 잘못된 y 위치에 있습니다. </li>";
ui_ko["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>모든 객체가 올바른 위치에 있습니다. </li>";
ui_ko["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>하나 이상의 객체가 올바른 위치에 있지 않습니다.</li>";
ui_ko["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>모든 벽은 제대로 지어지고 있습니다. </li>";
ui_ko["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>하나 이상의 벽이 빠지거나 잘못된 위치에서 건설됐습니다/li>";
ui_ko["Last instruction completed!"] = "마지막 명령이 완료됐습니다!";
ui_ko["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>명령 <code>done()</code> 실행.</p>";

ui_ko["Unknown object"] = "알 수 없는 객체: <code>{obj}</code>";
ui_ko["No object found here"] = "여기서 <code>{obj}</code> 를 찾을 수 없어요!";
ui_ko["object"] = "객체";
ui_ko["I don't have any object to put down!"] = "나는 집어넣을 <code>{obj}</code> 가 없어요!";
ui_ko["There is already a wall here!"] = "벽이 여기에 이미 있어요!";
ui_ko["There is no wall to remove!"] = "There is no wall to remove!";
ui_ko["Ouch! I hit a wall!"] = "아으, 아파요! 저는 벽을 부딪혔어요!";
ui_ko["Done!"] = "끝!";
ui_ko["There is no position as a goal in this world!"] = "위치에 대한 목표가 없어요!";
ui_ko["There is no goal in this world!"] = "이 월드는 목표가 없어요.";
ui_ko["I carry too many different objects. I don't know which one to put down!"] = "저는 너무 많은 다른 객체들을 싣고 있어요. 저는 이중 어떤 걸 내려놓을지 모르겠어요!";
ui_ko["Many objects are here; I do not know which one to take!"] = "많은 객체가 여기에 있어요; 저는 그 중 어떤 걸 가져갈지 모르겠어요!";

ui_ko.east = "동쪽";
ui_ko.north = "북쪽";
ui_ko.west = "서쪽";
ui_ko.south = "남쪽";
ko_to_en["동쪽"] = "east";
ko_to_en["북쪽"] = "north";
ko_to_en["서쪽"] = "west";
ko_to_en["남쪽"] = "south";
ui_ko["Unknown orientation for robot."] = "로봇의 방향을 알 수 없습니다.";

ui_ko["Invalid position."] = "{pos} is an invalid position.";
ui_ko["Invalid orientation."] = "'{orient}' is an unknown orientation.";

ui_ko["World selected"] = "월드 {world} 가 선택되었습니다";
ui_ko["Could not find world"] = "월드를 찾을 수 없습니다. {world}";
ui_ko["Object names"] = " 라이브러리, 토큰, 별, 삼각형, 사각형, 등.";

ui_ko["Invalid world file."] = "유효하지 않은 월드 파일.";
ui_ko["Could not find link: "] = "링크를 찾을 수 없습니다: ";

ui_ko["Click on world to move robot."] = "월드를 클릭해서 추가하거나 시작 가능한 리보그 위치를 제거합니다.";
ui_ko["Added robot."] = "리보그 추가됨.";
ui_ko["Click on image to turn robot"] = "리보그를 회전하기 위해 이미지를 클릭하세요.";
ui_ko["Robot now has tokens."] = "이제 리보그는 {x_tokens} 토근을 가지고 있습니다.";
ui_ko["Click on world to add object."] = "<code>{obj}</code> 의 수를 설정하기 위해 월드를 클릭하세요.";
ui_ko["Click on desired object below."] = "아래에서 원하는 개체를 클릭합니다.";
ui_ko["Click on world to toggle walls."] = "벽을 달기 위해 월드를 클락하세요.";
ui_ko["Click on world to set home position for robot."] = "로봇의 최종위치를 정하기 위해 월드를 클릭하세요.";
ui_ko["Click on world to toggle additional walls to build."] = "추가로 벽을 달기 위해 월드를 클릭하세요.";
ui_ko["Click on desired goal object below."] = "아래에서 원하는 목표 객체를 클릭하세요.";
ui_ko["Click on world to set number of goal objects."] = "<code>{obj}</code>의 목표를 설정하기 위해 객체를 클릭하세요.";
ui_ko["Enter number of tokens for robot to carry (use inf for infinite number)"] = "싣고 갈 토큰의 수를 입력하세요.";
ui_ko[" is not a valid value!"] = " 유효하지 않은 값입니다!";
ui_ko["Enter number of objects desired at that location."] = "<code>{obj}</code> 의 수를 설정하기 위해 월드를 클릭하세요.";
ui_ko["Objects found here:"] = "객체를 여기서 찾음:";
ui_ko["Description"] = "설명";
ui_ko["A robot located here carries no objects."] = "로봇은 (x, y) = ({x}, {y})에 위치해 있고 싣고 있는 객체는 없습니다.";
ui_ko["Goal to achieve:"] = "목표 달성:";
ui_ko["A robot located here carries:"] = "로봇은 (x, y) = ({x}, {y})에 위치해 있습니다. 싣고 있는 객체:";
ui_ko["random location"] = "무작위 위치";
ui_ko["Enter number of objects to give to robot."] = "로봇에게 주기 위해 <code>{obj}</code> 의 수를 입력하세요..";
ui_ko["Special information about this location:"] = "이 위치에 대한 특별한 정보:";
ui_ko["Click on world to toggle tile."] = "<code>{obj}</code> 타일을 달기 위해 월드를 클릭하세요.";
ui_ko["Click on desired tile below."] = "아래에서 원하는 타일을 클릭합니다. (or color selector)";

ui_ko["A wall must be built east of this location."] = "벽은 이 위치의 동쪽에 지어져야 합니다.";
ui_ko["A wall must be built north of this location."] = "벽은 이 위치의 북쪽에 지어져야 합니다.";
ui_ko["A wall must be built west of this location."] = "벽은 이 위치의 서쪽에 지어져야 합니다.";
ui_ko["A wall must be built south of this location."] = "벽은 이 위치의 남쪽에 지어져야 합니다.";
ui_ko["The final required position of the robot will be chosen at random."] = "로봇의 마지막으로 필요한 위치가 무작위로 선택됩니다.";
ui_ko["The final position of the robot must be (x, y) = "] = "로봇의 최종위치는 반드시 (x, y) = ";
ui_ko["Click on world to fill with given tile."] = "주어진 타일을 채우기 위해 월드를 클릭합니다.";
ui_ko["Click on desired object below."] = "아래에서 원하는 객체를 클릭합니다.";
ui_ko["Enter url of image to use as background."] = "배경화면으로 쓰일 이미지나 이미지 주소를 입력해 주세요.";
ui_ko["Replace editor content"] = "당신의 이 월드의 제작자에 의해 제공되는 에디터 코드를 대체 하고 싶나요?";
ui_ko["Replace library content"] = "당신은 이 월드의 제작자에 의해 제공되는 라이브러리 코드를 대체 하고 싶나요?";
ui_ko["colour"] = "색";
ui_ko["There is already a bridge here."] = "There is already a bridge here.";

ui_ko["Name already exist; confirm that you want to replace its content."] = "이름이 이미 존재합니다; 당신이 내용을 교체하고 싶으면 확인합니다.";
ui_ko["No such world!"] = "월드가 존재하지 않습니다!";
ui_ko["Enter world name to save"] = "월드를 저장하기 위해 월드 이름을 입력해주세요; 사용될 이름: ";
ui_ko["Enter world name to delete"] = "월드를 삭제하기 위해 월드 이름을 입력 해주세요; 기존 세계: ";
ui_ko["Delete "] = "삭제 ";

ui_ko["Error found at or near line {number}."] = "오류를 발견했습니다 혹은 라인 근처에서 발견됬습니다. : {number}.";
ui_ko["<br>Perhaps a missing colon is the cause."] = "<br>아마도 콜론(:)을 놓쳐서 문제가 발생했을 겁니다.";
ui_ko["<br>Perhaps you forgot to add parentheses ()."] = "<br>아마도 당신은 괄호를 추가하는 것을 잊어버렸을 겁니다 ().";
ui_ko["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>아마도 당신은 단어의 철자나 함수를 정의하는것을 잊었거나 변수를 까먹었을 겁니다.";
ui_ko["I cannot help you with this problem."] = "I cannot help you with this problem.";

ui_ko["I'm stuck in mud."] = "난 진흙에 걸렸어요.";
ui_ko["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "진흙: 리보그는 이것을 탐지 <b>하지 못하고<b> 이 위치로 이동하게 되면 걸리게 됩니다.";
ui_ko["Soil: usually safe, but looks identical to mud."] = "Soil: usually safe, but looks identical to mud.";
ui_ko["I'm slipping on ice!"] = "저는 얼음에 미끄러지고 있어요!";
ui_ko["Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."] = "얼음: 리보그는 이것을 탐지 <b>하지 못하고</b> 만약 이 위치로 이동하게 되면 미끄러지고 다음 위치로 이동하게 됩니다.";
ui_ko["Grass: usually safe."] = "잔디: 보통 안전함.";
ui_ko["Gravel: usually safe."] = "자갈: 보통 안전함.";
ui_ko["I'm in water!"] = "난 물 속에 있어요!";
ui_ko["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "물: 리보그는 이것을 탐지 할 수 <b>있지만</b> 이 위치로 이동하는 경우 상처를 입히게 됩니다.";
ui_ko["green home tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "green home tile: 리보그는 at_goal 를 사용하면 이 타일을 감지 할 수 <b>있어요<b>.";
ui_ko["Crash!"] = "Crash!";
ui_ko["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "벽돌 벽: 리보그는 이것을 탐지 할 수 있지만 만약 벽돌 벽으로 간다면 자신을 다치게 합니다.";
ui_ko["I hit a fence!"] = "I hit a fence!";
ui_ko["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "울타리: 리보그는 이것을  <b>can</b> 탐지 할 수 있지만 그것에 의해 중지됩니다.";
ui_ko["Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "리보그는 이것을 탐지 할 수 <b>있으며</b> 이 물 위에서 안전한 통행을 허용하는것을 알게 될 것입니다.";
ui_ko["My joints are melting!"] = "내 관절이 녹고있어."; // translated using google
ui_ko["A bucket full of water."] = "A bucket full of water.";

ui_ko["Something is blocking the way!"] = "뭔가가 길을 막고 있어요!";
ui_ko["Reeborg <b>can</b> detect this tile using at_goal()."] = "리보그는 at_goal() 를 사용해서 탐지 할 수 <b>있어요</b>.";
ui_ko["green home tile:"] = "초록색 홈 타일:";
ui_ko["home:"] = "홈:";
ui_ko["racing flag:"] = "레이싱 깃발:";
ui_ko["house:"] = "집:";

ui_ko["Local variables"] = "지역 변수";
ui_ko["Global variables"] = "전역 변수";
ui_ko["Watched expressions"] = "문장 결과 보기";

ui_ko["move forward"] = "앞으로 움직이기";
ui_ko["turn left"] = "왼쪽으로 움직이기";
ui_ko["take object"] = "객체 가지기";
ui_ko["put object"] = "객체 넣기";
ui_ko["Pause the program's execution."] = "프로그램 일시 정지.";
ui_ko["Build a wall in front of the robot."] = "벽을 로봇 앞에 짓기.";
ui_ko["End the program's execution."] = "프로그램 실행 종료.";
ui_ko["True if a wall is blocking the way."] = "벽이 길을 막고 있는 경우가 사실이라면.";
ui_ko["True if nothing is blocking the way."] = "아무것도 차단 하지 않는 경우가 사실이라면.";
ui_ko["True if desired destination."] = "원하는 목적지가 있는 경우가 사실이라면";
ui_ko["True if robot carries at least one object."] = "로봇이 적어도 하나의 객체를 싣고 있는 경우가 사실이라면.";
ui_ko["True if there is at least one object here."] = "적어도 하나의 객체가 여기에 있는 경우가 사실이라면.";
ui_ko["True if robot is facing North."] = "만약 로봇이 북쪽을 바라보고 있는 경우가 사실이라면.";
ui_ko["Delay between actions; default is 300 ms."] = "행동을 지연시킵니다; 기본값은 300 밀리초.";

ui_ko["Save world in browser"] = "월드를 브라우저에 저장하기";
ui_ko["Save permalink"] = "퍼머 저장";
ui_ko["Save permalink explanation"] = "파일의 퍼머링크 복사본을 저장하기";
ui_ko["LOAD BLOCKLY"] = "프로그램(블럭들)을 파일에서 불러오기";
ui_ko["LOAD BLOCKLY EXPLAIN"] = "로컬 파일을 열고 Blockly 작업공간의 요소 대신에 이 요소를 사용합니다";
ui_ko["LOAD EDITOR"] = "파일로 불러오기";
ui_ko["LOAD EDITOR EXPLAIN"] = "로컬 저장소에서 소스코드 불러오기";
ui_ko["LOAD LIBRARY"] = "파일에서 라이브러리를 가져오기";
ui_ko["LOAD LIBRARY EXPLAIN"] = "파일을 열고 라이브러리의 컨텐츠를 지금 사용합니다.";
ui_ko["LOAD WORLD"] = "파일로 불러오기";
ui_ko["LOAD WORLD EXPLAIN"] = "컴퓨터안의 파일로 월드를 불러오기";
ui_ko["SAVE BLOCKLY"] = "Save program to file";
ui_ko["SAVE BLOCKLY EXPLAIN"] = "Saves the current blocks in a file." + mac_user_save_files_ko;
ui_ko["SAVE EDITOR"] = "파일로 저장";
ui_ko["SAVE EDITOR EXPLAIN"] = "에디터 소스코드 저장" + mac_user_save_files_ko;
ui_ko["SAVE LIBRARY"] = "라이브러리 저장";
ui_ko["SAVE LIBRARY EXPLAIN"] = "파일 라이브러리의 내용 저장" + mac_user_save_files_ko;
ui_ko["SAVE WORLD"] = "파일로 저장";
ui_ko["SAVE WORLD EXPLAIN"] = "(json 확장자) 월드를 컴퓨터에 저장" + mac_user_save_files_ko;

ui_ko["PROGRESS SECTION TITLE"] = "Keeping track of tasks solved";
ui_ko["PROGRESS EXPLAIN"] = "Tasks solved are marked with " + RUR.CHECKMARK +
    "in the world selector and the information is saved in your browser. If you use a different browser, " +
    "the tasks you have already solved using a different browser will not be shown. " +
    "If you click on the save button below, a file named progress.json will be saved with the tasks solved " +
    "recorded in the current browser. You can import this file in a different browser so that your progress can be updated.";
ui_ko["SAVE PROGRESS"] = "Save";
ui_ko["IMPORT PROGRESS"] = "Import";
ui_ko["RETRIEVE SOLUTION"] = "Retrieve solution";
ui_ko["RETRIEVE SOLUTION EXPLAIN"] = "If a solution (blocks, or code and possibly code in library) for this world has been saved in the browser for the current programming mode, it will be retrieved and replace the current content.";

ui_ko["ADD CONTENT TO WORLD"] = "Add content to world from selected items below.";
ui_ko["ADD BLOCKLY TEXT"] = "Code blocks";
ui_ko["ADD EDITOR TEXT"] = "Code in editor";
ui_ko["ADD LIBRARY TEXT"] = "Library";
ui_ko["ADD PRE TEXT"] = "Pre";
ui_ko["ADD POST TEXT"] = "Post";
ui_ko["ADD DESCRIPTION TEXT"] = "Description";
ui_ko["ADD ONLOAD TEXT"] = "Onload";

ui_ko["KEYBOARD BUTTON"] = "리보그의 키보드";
ui_ko["ADDITIONAL OPTIONS"] = "추가 설정";

ui_ko["BASIC COMMANDS"] = "기본적인 명령어";
ui_ko["DEFINING"] = "정의";
ui_ko["LOOPS"] = "루프";
ui_ko["DECISIONS"] = "결정";
ui_ko["CONDITIONS"] = "상태";
ui_ko["USING VARIABLES"] = "변수 사용하기";
ui_ko["COMMANDS"] = "명령어들";
ui_ko["OTHER"] = "그 외";
ui_ko["OBJECTS"] = "객체들";

ui_ko["Python Code"] = "파이썬 코드";
ui_ko["Javascript Code"] = "자바스크립트 코드";
ui_ko["LIBRARY"] = "라이브러리";
ui_ko["EXTRA"] = "extra";
ui_ko["PRE"] = "전에";
ui_ko["POST"] = "후";
ui_ko["DESCRIPTION"] = "월드 정보";
ui_ko["ONLOAD"] = "Onload";

ui_ko["HIGHLIGHT IMPOSSIBLE"] = "구문 강조를 꺼서 문제가 발생했습니다.";
ui_ko["COMMAND RESULT"] = "아래 메뉴에서 수행할 작업을 선택합니다.";

ui_ko["DELETE WORLD TEXT"] = "버튼을 클릭하면 브라우져의 메모리에 저장된 월드를 제거합니다:";
ui_ko["PYTHON ONLY"] = "파이썬 전용";
ui_ko["COLLABORATION"] = "협업";
ui_ko["TOGETHERJS EXPLAIN"] = "다른 사용자는 Mozilla의 TogetherJS를 이용하여 협업에 참여 할 수 있습니다.  (Does not work with Blockly.)";
ui_ko["WORLD CREATION TITLE"] = "월드 : 창조, 수정..";
ui_ko["EDIT WORLD"] = "월드 수정";
ui_ko["EDIT WORLD EXPLAIN"] = "기존 월드를 수정하여 자신 만의 월드를 만들 수 있습니다.";
ui_ko["PROGRAM IN EDITOR"] = "에디터";
ui_ko["PROGRAM IN BLOCKLY WORKSPACE"] = "blockly 작업 공간 프로그램";
ui_ko["CONTACT"] = "(English/French only) 이메일:";
ui_ko["ISSUES"] = "버그 제보, 건의 그외 문제 등. (영어/프랑스어만 됨)";
ui_ko["FORUM"] = "토론 포럼 (영어/프랑스어만 됨";
ui_ko["HELP"] = "도움말";
ui_ko["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/ko" target="_blank" rel="noopener">Documentation (참고 문서)</a>';
ui_ko["PYTHON HELP"] = "파이썬을 사용해서, <code>help()</code>를 실행해서 명령어의 목록을 얻으세요 또는 <code>help(함수명)</code>으로 해당 <code>함수명()</code>의 정보를 확인할 수 있습니다. 예를 들어, <code>help(move)</code>로 <code>move</code>함수의 정보를 얻을 수 있습니다.";
ui_ko["KEYBOARD HELP"] = "리보그의 키보드를 클릭해서 파이썬 키워드 등, 사용할수 있는 명령어의 목록을 보세요.";

ui_ko["WORLD EDITOR"] = "월드 편집기";
ui_ko["m-east"] = "동쪽";
ui_ko["m-north"] = "북쪽";
ui_ko["m-west"] = "서쪽";
ui_ko["m-south"] = "남쪽";
ui_ko["m-random"] = "랜덤";
ui_ko["m-dimensions"] = "월드 크기";
ui_ko["m-add"] = "추가";
ui_ko["m-add-robot"] = "로봇 추가";
ui_ko["m-robot"] = "로봇";
ui_ko["m-position"] = "위치(들)";
ui_ko["m-turn"] = "회전";
ui_ko["m-objects"] = "객체";
ui_ko["m-walls"] = "벽";
ui_ko["m-objects2"] = "객체";
ui_ko["m-tiles"] = "타일들";
ui_ko["m-fill"] = "체우기";
ui_ko["m-solid"] = "특정 객체";
ui_ko["m-decorative"] = "꾸미기용 객체";
ui_ko["m-background"] = "배경 사진";
ui_ko["m-goal"] = "목표";
ui_ko["mg-robot"] = "로봇";
ui_ko["mg-walls"] = "벽";
ui_ko["mg-objects"] = "객체";

ui_ko["Reeborg says: I'm done!"] = "리보그 : 다했어요";
ui_ko["Reeborg writes:"] = "리보그 쓰기:";
ui_ko["Reeborg shouts: Something is wrong!"] = "리보그의 외침: 뭔가 잘못 되었어!";
ui_ko["Reeborg explores some Javascript code"] = "리보그는 일부 자바스크립트 코드를 조사했습니다";
ui_ko["Reeborg states:"] = "리보그 상태:";
ui_ko["Reeborg watches some variables!"] = "리보그는 몇가지의 변수를 보고 있습니다!";
ui_ko["Click on the world to get some additional information."] = "추가 정보를 얻기 위해 월드를 클릭합니다.";

ui_ko["Reeborg's basic keyboard"] = "리보그의 기본적인 키보드";
ui_ko["kbd-command-btn"] = "명령어";
ui_ko["kbd-condition-btn"] = "상태";
ui_ko["kbd-python-btn"] = "파이썬";
ui_ko["kbd-py-console-btn"] = "파이썬";
ui_ko["kbd-javascript-btn"] = "자비스크립트";
ui_ko["kbd-cpp-btn"] = "C++";
ui_ko["kbd-coffee-btn"] = "CoffeeScript";
ui_ko["kbd-objects-btn"] = "객체";
ui_ko["kbd-special-btn"] = "특수키";

ui_ko["UNDO"] = "되돌리기";
ui_ko["REDO"] = "다시 실행";
ui_ko["tab"] = "TAB";
ui_ko["shift-tab"] = "Shift-TAB";
ui_ko["enter"] = "\u23CE";
ui_ko["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code>는 여기에서만 작동하는 파이썬 키워드입니다.";

ui_ko["Colour:"] = "색상:";
ui_ko["Enter a colour"] = "색상을 입력하세요";

ui_ko["Background image"] = "배경 이미지";

ui_ko["NAME:"] = "이름:";
ui_ko["Save world in browser"] = "월드를 브라우저에 저장하기";


ui_ko["Set the world's dimensions"] = "월드의 크기를 조절하세요";
ui_ko["set-dimensions-explain"] = "원하는 경우 월드의 기본 크기를 다르게 설정할 수 있습니다. 작은 해상도의 화면은 매우 큰 세계를 볼수 없음을 기억하세요.";
ui_ko["Maximum x value:"] = "최대 x 값:";
ui_ko["Maximum y value:"] = "최대 y 값:";
ui_ko["Use small tiles"] = "작은 타일 사용하기";

ui_ko["Set goal number for object"] = "객체의 목표 수를 설정합니다.";
ui_ko["dialog-goal-object-explain"] = "체크박스를 클릭하세요. 월드가 시작될때 당신의 원하는 객체의 모든 숫자가 보입니다.";
ui_ko["Number of objects"] = "객체의 수:";
ui_ko["All such objects"] = "모든 종류의 객체";

ui_ko["Number of objects:"] = "객체의 수:";
ui_ko["Maximum:"] = "최대 값:";
ui_ko["Add object in the world"] = "Set number of object";
ui_ko["ADD OBJECT EXPLAIN"] = "Choose zero to remove any existing such object at this location. If <code>Maximum</code> is set to a value greater than the <code>Number of objects</code>, a number of objects, between these two values, will be chosen randomly each time a program is run.";

ui_ko["Unlimited:"] = "Unlimited:";
ui_ko["Give object to robot"] = "Give object to robot";
ui_ko["GIVE OBJECT EXPLAIN"] = "로봇이 운반 할 객체의 수를 고르세요. 더 많은 수를 원한다면 체크박스를 클릭하세요.";

ui_ko["UPDATE BLOCKLY CONTENT"] = "This world has some default content for the blocks workspace. To replace the current blocks content, click on the button";
ui_ko["UPDATE BLOCKLY BUTTON"] = "Replace existing blocks";
ui_ko["Contents from World"] = "Contents from World";

ui_ko["WARNING: Do not change this comment."] = "WARNING: Do not change this comment.";
ui_ko["Library Code is below."] = "Library Code is below.";
ui_ko["No solution can be saved when using REPL (Py)."] = "No solution can be saved when using REPL (Py).";
ui_ko["No solution can be loaded when using REPL (Py)."] = "No solution can be loaded when using REPL (Py).";

ui_ko["You are not allowed to use <code>done</code> in this world!"] = "You are not allowed to use <code>done()</code> in this world!";
ui_ko["Execution ended before the <em>Post</em> code was executed."] = "Execution ended before the <em>Post</em> code was executed.";

ui_ko["Difficulty level"] = "난이도";

ui_ko["Expected result"] = "Expected result";
ui_ko["Differences highlighted"] = "Differences highlighted";
ui_ko["Actual result"] = "Actual result";

ui_ko["Cannot parse progress file."] = "Cannot parse progress file.";
ui_ko["Cannot merge progress."] = "Cannot merge progress.";
ui_ko["No solution found for this world."] = "No solution found for this world.";

ui_ko["THINKING"] = "생각 중";
