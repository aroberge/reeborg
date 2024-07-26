// the following is used in a few places below
var mac_user_save_files_en = ' <b>Mac:</b> Por favor consulte <a href="https://github.com/aroberge/reeborg/blob/master/dev_tools/known_problems.md" target="_blank" rel="noopener">problema conhecido</a>.';

exports.ui_pt = ui_pt = {};
exports.en_to_pt = en_to_pt = {};
exports.pt_to_en = pt_to_en = {};

ui_pt["pt-en"] =  "Modo Misto: Interface em Português; Linguagem de programação em Inglês." +
                  "Mixed mode: User Interface in Portuguese; programming language English.<br>";

ui_pt["SITE NAME"] = "Mundo de Reeborg";
ui_pt["WORLD INFO"] = "Info sobre Mundo";
ui_pt["EDITOR VISIBLE"] = "Mostrar Editor";

ui_pt["apple"] = en_to_pt["apple"] = "maçã";
ui_pt["banana"] = en_to_pt["banana"] = "banana";
ui_pt["beeper"] = en_to_pt["beeper"] = "bipe";
ui_pt["box"] = en_to_pt["box"] = "caixa";
ui_pt["bridge"] = en_to_pt["bridge"] = "ponte";
ui_pt["carrot"] = en_to_pt["carrot"] = "cenoura";
ui_pt["daisy"] = en_to_pt["daisy"] = "margarida";
ui_pt["dandelion"] = en_to_pt["dandelion"] = "dente de leão";
ui_pt["leaf"] = en_to_pt["leaf"] = "folha";
ui_pt["square"] = en_to_pt["square"] = "quadrado";
ui_pt["star"] = en_to_pt["star"] = "estrela";
ui_pt["strawberry"] = en_to_pt["strawberry"] = "morango";
ui_pt["token"] = en_to_pt["token"] = "ficha";
ui_pt["tokens are Reeborg's favourite thing."] = "fichas são as coisas favoritas de Reeborg.";
ui_pt["triangle"] = en_to_pt["triangle"] = "triângulo";
ui_pt["tulip"] = en_to_pt["tulip"] = "tulipa";
ui_pt["bucket"] = en_to_pt["bucket"] = "cesta";
ui_pt["bulb"] = en_to_pt["bulb"] = "bulbo";
ui_pt["bricks"] = en_to_pt["bricks"] = "tijolos";

ui_pt["mud"] = en_to_pt["mud"] = "lama";
ui_pt["soil"] = en_to_pt["soil"] = "solo";
ui_pt["water"] = en_to_pt["water"] = "agua";
ui_pt["grass"] = en_to_pt["grass"] = "grama";
ui_pt["gravel"] = en_to_pt["gravel"] = "cascalho";
ui_pt["ice"] = en_to_pt["ice"] = "gelo";
ui_pt["fire"] = en_to_pt["fire"] = "fogo";

ui_pt["infinite"] = "Infinito";
ui_pt["fence_right"] = en_to_pt["fence_right"] = "cerca_a_direita";
ui_pt["fence_left"] = en_to_pt["fence_left"] = "cerca_a_esquerda";
ui_pt["fence_vertical"] = en_to_pt["fence_vertical"] = "cerca_vertical";
ui_pt["fence_double"] = en_to_pt["fence_double"] = "cerca_dupla";

ui_pt["Invalid Javascript code in Onload editor"] = "Código Javascript inválido no Editor.";
ui_pt["Invalid Python code in Onload editor"] = "Código Python inválido no Editor.";

ui_pt["Too many steps:"] = "Muitos passos: {max_steps}<br>Use <code>set_max_nb_steps(nb)</code> como máximo de passos.";
ui_pt["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg está na posição x correta.</li>";
ui_pt["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg está na posição x incorreta.</li>";
ui_pt["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg está na posição y correta.</li>";
ui_pt["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg está na posição y incorreta.</li>";
ui_pt["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>Todos objetos estão na posição correta.</li>";
ui_pt["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>Um ou mais objetos não estão na posição correta.</li>";
ui_pt["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>Todas as paredes foram construídas corretamente.</li>";
ui_pt["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>Uma ou mais paredes foram construídas em posição incorreta.</li>";
ui_pt["Last instruction completed!"] = "Última instrução completa.";
ui_pt["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Instrução <code>done()</code> executada.</p>";

ui_pt["Unknown object"] = "Objeto desconhecido: <code>{obj}</code>";
ui_pt["No object found here"] = "Nenhum objeto encontrado aqui!";
ui_pt["object"] = "Objeto";
ui_pt["I don't have any object to put down!"] = "Não tenho nenhum objeto para colocar.";
ui_pt["There is already a wall here!"] = "Existe uma parede aqui!";
ui_pt["There is no wall to remove!"] = "Não existe parede para ser removida!";
ui_pt["Ouch! I hit a wall!"] = "Opa! Bati em uma parede.";
ui_pt["Done!"] = "Feito!";
ui_pt["There is no position as a goal in this world!"] = "Não existe posição de chegada neste mundo!";
ui_pt["There is no goal in this world!"] = "Não existe chegada neste mundo!";
ui_pt["I carry too many different objects. I don't know which one to put down!"] = "Estou carregando vários objetos diferentes. Eu não sei qual deles deixar aqui!";
ui_pt["Many objects are here; I do not know which one to take!"] = "Muitos objetos estão aqui. Não sei qual deles pegar!";

ui_pt.east = en_to_pt.east = "Leste";
ui_pt.north = en_to_pt.north = "Norte";
ui_pt.west = en_to_pt.west = "Oeste";
ui_pt.south = en_to_pt.south = "Sul";
ui_pt["Unknown orientation for robot."] = "Orientação desconhecida para o Robô.";

ui_pt["Invalid position."] = "{pos} é uma posição inválida.";
ui_pt["Invalid orientation."] = "'{orient}' é uma orientação inválida.";

ui_pt["World selected"] = "Mundo {world} selecionado.";
ui_pt["Could not find world"] = "Mundo {world} não encontrado";
ui_pt["Object names"] = " library, token, star, triangle, square, etc.";

ui_pt["Invalid world file."] = "Arquivo inválido de Mundo";
ui_pt["PERMALINK"] = "PERMALINK";
ui_pt["Could not find link: "] = "Link não encontrado:";

ui_pt["Click on world to move robot."] = "Clique no mundo para mover Robô.";
ui_pt["Added robot."] = "Reeborg adicionado.";
ui_pt["Click on image to turn robot"] = "Clique na imagem para virar o Robô.";
ui_pt["Robot now has tokens."] = "Robô agora possui {x_tokens} Fichas.";
ui_pt["Click on world to add object."] = "Clique no mundo para adicionar objeto <code>{obj}</code>.";
ui_pt["Click on desired object below."] = "Clique no objeto desejado abaixo.";
ui_pt["Click on world to toggle walls."] = "Clique no mundo para alternar paredes.";
ui_pt["Click on world to set home position for robot."] = "Clique no mundo para definir posição de início do Robô.";
ui_pt["Click on world to toggle additional walls to build."] = "Clique no mundo para adicionar paredes adicionais.";
ui_pt["Click on desired goal object below."] = "Clique no ponto de chegada desejado abaixo.";
ui_pt["Click on world to set number of goal objects."] = "Clique no mundo para definir número de objetivos (pontos de chegada) <code>{obj}</code>.";
ui_pt["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Entre número de fichas que o Robô pode carregar (Entre com Inf para infinito)";
ui_pt[" is not a valid value!"] = " não é um valor válido!";
ui_pt["Enter number of objects desired at that location."] = "Entre número de objetos desejado no local <code>{obj}</code>.";
ui_pt["Objects found here:"] = "Objetos encontrados aqui:";
ui_pt["Description"] = "Descrição";
ui_pt["A robot located here carries no objects."] = "Um Robô localizado aqui (x, y) = ({x}, {y}) não possui objetos.";
ui_pt["Goal to achieve:"] = "Objetivo a ser atingido:";
ui_pt["A robot located here carries:"] = "Um RobÔ localizado aqui (x, y) = ({x}, {y}) carrega:";
ui_pt["random location"] = "Posição aleatória:";
ui_pt["Enter number of objects to give to robot."] = "Entre número de objetos a serem dados para o Robô.";
ui_pt["Special information about this location:"] = "Informação especial sobre essa localização:";
ui_pt["Click on world to toggle tile."] = "Clique no mundo para alternar o bloco.";
ui_pt["Click on desired tile below."] = "Clique no bloco desejado abaixo.";
ui_pt["A wall must be built east of this location."] = "Uma parede deve ser construída a leste desta localização.";
ui_pt["A wall must be built north of this location."] = "Uma parede deve ser construída ao norte desta localização.";
ui_pt["A wall must be built west of this location."] = "Uma parede deve ser construída a oeste desta localização.";
ui_pt["A wall must be built south of this location."] = "Uma parede deve ser construída ao sul desta localização.";
ui_pt["The final required position of the robot will be chosen at random."] = "A posição final do Robô será escolhida aleatoriamente.";
ui_pt["The final position of the robot must be (x, y) = "] = "A posição final do Robô deve ser: (x, y) = ";
ui_pt["Click on world to fill with given tile."] = "Clique no mundo para preencher com o bloco selecionado.";
ui_pt["Click on desired object below."] = "Clique no objeto desejado abaixo.";
ui_pt["Enter url of image to use as background."] = "Entre com URL de imagem a ser usada como imagem de fundo.";
ui_pt["Replace editor content"] = "Alterar conteúdo do editor?";
ui_pt["Replace library content"] = "Alterar conteúdo de biblioteca?";
ui_pt["colour"] = "Cor";
ui_pt["There is already a bridge here."] = "There is already a bridge here.";

ui_pt["Name already exist; confirm that you want to replace its content."] = "Nome já existente. Confirme a substituição do conteúdo deste nome.";
ui_pt["No such world!"] = "Não existe este mundo!";
ui_pt["Enter world name to save"] = "Entre com o nome do Mundo a ser salvo";
ui_pt["Enter world name to delete"] = "Entre com o nome do Mundo a ser apagado ";
ui_pt["Delete "] = "Apagar ";

ui_pt["Error found at or near line {number}."] = "Erro encontrado na linha {number}.";
ui_pt["<br>Perhaps a missing colon is the cause."] = "<br>Cheque se não está faltando dois pontos [:].";
ui_pt["<br>Perhaps you forgot to add parentheses ()."] = "<br>Cheque se você não esqueceu de adicionar parênteses ().";
ui_pt["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Talvez você tenha digitado uma palavra incorretamente ou esquecido de definir uma variável ou função.";
ui_pt["I cannot help you with this problem."] = "Eu não consigo te ajudar com esse problema.";

ui_pt["I'm stuck in mud."] = "Estou preso na lama.";
ui_pt["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "Lama: Reeborg <b>não pode</b> detectar a lama e irá ficar preso se você caminhar nesta direção.";
ui_pt["Soil: usually safe, but looks identical to mud."] = "Solo: geralmente é seguro, mas parece idêntico a lama.";
ui_pt["I'm slipping on ice!"] = "Estou escorregando no gelo!";
ui_pt["Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."] = "Gelo: Reeborg <b>não pode</b> detectar o gelo e irá escorregar e mover para a próxima posição caso você caminhe nesta direção.";
ui_pt["Grass: usually safe."] = "Grama: normalmente seguro.";
ui_pt["Gravel: usually safe."] = "Cascalho: normalmente seguro.";
ui_pt["I'm in water!"] = "Estou na água!";
ui_pt["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "Água: Reeborg <b>pode</b> detectar a água mas irá se danificar se você mover para essa direção.";
ui_pt["green home tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "Bloco verde: Reeborg <b>pode</b> detectar este bloco usando a função chegou().";
ui_pt["Crash!"] = "Crash!";
ui_pt["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "Parede de tijolos: Reeborg <b>pode</b> detectar mas irá se danificar se tentar se mover através da parede.";
ui_pt["I hit a fence!"] = "Atingi uma cerca!";
ui_pt["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "Cerca: Reeborg <b>pode</b> detectar a cerca mas será parado ao atingí-la.";
ui_pt["Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "Ponte: Reeborg <b>pode</b> detectar a ponte e saberá que a ponte permite uma passagem segura sobre a água.";
ui_pt["My joints are melting!"] = "Minhas juntas estão derretendo!";
ui_pt["A bucket full of water."] = "Um balde cheio de água.";
ui_pt["Tulip bulb: might grow into a nice tulip with some water from a bucket."] = "Bulbo de tulipa: Crescerá em uma linda tulipa se for regada com água de um balde.";


ui_pt["Something is blocking the way!"] = "Algo está bloqueando o caminho!";
ui_pt["Reeborg <b>can</b> detect this tile using at_goal()."] = "Reeborg <b>pode</b> detectar esse bloco usando chegou().";
ui_pt["green home tile:"] = "Bloco verde:";
ui_pt["home:"] = "Home:";
ui_pt["racing flag:"] = "Bandeira:";
ui_pt["house:"] = "Casa:";

ui_pt["Local variables"] = "Variáveis locais";
ui_pt["Global variables"] = "Variáveis globais";
ui_pt["Watched expressions"] = "Expressões assistidas";

ui_pt["move forward"] = "mover em frente";
ui_pt["turn left"] = "virar à direita";
ui_pt["take object"] = "Objekt nehmen";
ui_pt["put object"] = "Objekt ablegen";
ui_pt["Pause the program's execution."] = "Pausa a execução do programa.";
ui_pt["Build a wall in front of the robot."] = "Constrói uma parede na frente do Robô.";
ui_pt["End the program's execution."] = "Ausführung des Programms beenden.";
ui_pt["True if a wall is blocking the way."] = "Verdadeiro se uma parede está bloqueando o caminho.";
ui_pt["True if nothing is blocking the way."] = "Verdadeiro se nada está bloqueando o caminho.";
ui_pt["True if desired destination."] = "Verdadeiro se é o destino desejado.";
ui_pt["True if robot carries at least one object."] = "Verdadeiro se o Robô carrega pelo menos um objeto.";
ui_pt["True if there is at least one object here."] = "Verdadeiro se existe pelo menos um objeto aqui.";
ui_pt["True if robot is facing North."] = "Verdadeiro se o Robô está voltado para o Norte.";
ui_pt["Delay between actions; default is 300 ms."] = "Atraso entre ações; default é 300 ms.";

ui_pt["Save world in browser"] = "Salvar mundo no navegador";
ui_pt["LOAD BLOCKLY"] = "Carrega Blockly";
ui_pt["LOAD BLOCKLY EXPLAIN"] = "Explicação do programa de importação de dados.";
ui_pt["LOAD EDITOR"] = "Carrega Editor";
ui_pt["LOAD EDITOR EXPLAIN"] = "Explicação do carregamento do editor";
ui_pt["LOAD LIBRARY"] = "Carrega Biblioteca";
ui_pt["LOAD LIBRARY EXPLAIN"] = "Explica o carregamento de biblioteca.";
ui_pt["LOAD WORLD"] = "Carrega Mundo";
ui_pt["LOAD WORLD EXPLAIN"] = "Explica o carregamento de mundo.";
ui_pt["SAVE BLOCKLY"] = "Salva Blockly";
ui_pt["SAVE BLOCKLY EXPLAIN"] = "Explica o salvamento de blockly." + mac_user_save_files_en;
ui_pt["SAVE EDITOR"] = "Salva Editor";
ui_pt["SAVE EDITOR EXPLAIN"] = "Explica o salvamento de Editor" + mac_user_save_files_en;
ui_pt["SAVE LIBRARY"] = "Salva Biblioteca";
ui_pt["SAVE LIBRARY EXPLAIN"] = "Explica o salvamento de biblioteca." + mac_user_save_files_en;
ui_pt["SAVE WORLD"] = "Salva Mundo";
ui_pt["SAVE WORLD EXPLAIN"] = "Explica o salvamento de Mundo." + mac_user_save_files_en;

ui_pt["PROGRESS SECTION TITLE"] = "Título da Seção de Progresso:";
ui_pt["PROGRESS EXPLAIN"] = "As tarefas são resolvidas com " + RUR.CHECKMARK +
    "e as informações são salvas no seu navegador. Se você usar outro navegador " +
    "as tarefas que você resolveu em outro navegador não serão mostradas. " +
    "Se você clicar no botão salvar abaixo, um arquivo chamado progress.json com as tarefas resolvidas será salvo " +
    "no navegador atual. Você pode importar este arquivo para outro navegador para que seu progresso possa ser atualizado.";
ui_pt["SAVE PROGRESS"] = "Salvar Progresso";
ui_pt["IMPORT PROGRESS"] = "Importar Progresso";
ui_pt["RETRIEVE SOLUTION"] = "Revelar Solução";
ui_pt["RETRIEVE SOLUTION EXPLAIN"] = "Mostra solução para as tarefas deste mundo";

ui_pt["ADD CONTENT TO WORLD"] = "Adicionar conteúdo ao Mundo.";
ui_pt["ADD BLOCKLY TEXT"] = "Adicionar código Blockly";
ui_pt["ADD EDITOR TEXT"] = "Adicionar código no Editor";
ui_pt["ADD LIBRARY TEXT"] = "Adicionar biblioteca";
ui_pt["ADD PRE TEXT"] = "Adicionar texto pré";
ui_pt["ADD POST TEXT"] = "Adicionar texto pós";
ui_pt["ADD DESCRIPTION TEXT"] = "Adicionar descrição";
ui_pt["ADD ONLOAD TEXT"] = "Adicionar texto de carregamento";

ui_pt["KEYBOARD BUTTON"] = "Teclado Reeborg";
ui_pt["ADDITIONAL OPTIONS"] = "Opções adicionais";

ui_pt["BASIC COMMANDS"] = "Comandos Básicos";
ui_pt["DEFINING"] = "Definições";
ui_pt["LOOPS"] = "Repetições";
ui_pt["DECISIONS"] = "Decisões";
ui_pt["CONDITIONS"] = "Condicionais";
ui_pt["USING VARIABLES"] = "Usando variáveis";
ui_pt["COMMANDS"] = "Comandos";
ui_pt["OTHER"] = "Outros";
ui_pt["OBJECTS"] = "Objetos";

ui_pt["Python Code"] = "Código Python";
ui_pt["Javascript Code"] = "Código Javascript";
ui_pt["LIBRARY"] = "biblioteca";
ui_pt["EXTRA"] = "Extra";
ui_pt["PRE"] = "Pré";
ui_pt["POST"] = "Pós";
ui_pt["DESCRIPTION"] = "Descrição";
ui_pt["ONLOAD"] = "Ao Carregar";

ui_pt["HIGHLIGHT IMPOSSIBLE"] = "Destaque Impossível.";
ui_pt["COMMAND RESULT"] = "Resultado do comando.";

ui_pt["DELETE WORLD TEXT"] = "Apagar Mundo:";
ui_pt["PYTHON ONLY"] = "Python somente";
ui_pt["COLLABORATION"] = "Colaboração";
ui_pt["TOGETHERJS EXPLAIN"] = "Ferramento para colaborar com uma ou mais pessoas usando Mozilla TogetherJS. Não funciona com Blockly.";
ui_pt["WORLD CREATION TITLE"] = "Mundo: Criação, Edição, ...";
ui_pt["EDIT WORLD"] = "Editar Mundo";
ui_pt["EDIT WORLD EXPLAIN"] = "Edita configuração do Mundo.";
ui_pt["PROGRAM IN EDITOR"] = "Programa em editor";
ui_pt["PROGRAM IN BLOCKLY WORKSPACE"] = "Programa em Blockly-Workspace";
ui_pt["CONTACT"] = "(Somente Inglês/Francês) Email:";
ui_pt["ISSUES"] = "Relatórios, Sugestões, etc (Inglês/Francês)";
ui_pt["FORUM"] = "Fórum de discussão";
ui_pt["HELP"] = "Ajuda";
ui_pt["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/en" target="_blank" rel="noopener">Documentação</a>';
ui_pt["PYTHON HELP"] = "Em Python: execute um comando com <code>help()</code> para obter ajuda. Ou execute ainda um comando como <code>help(move)</code> para obter ajuda com um dado comando.";
ui_pt["KEYBOARD HELP"] = "Clique no teclado Reeborg para obter uma lista de comandos disponíveis, palavras-chave Python, etc.";

ui_pt["WORLD EDITOR"] = "Editor de Mundo";
ui_pt["m-east"] = "Oeste";
ui_pt["m-north"] = "Norte";
ui_pt["m-west"] = "Oeste";
ui_pt["m-south"] = "Sul";
ui_pt["m-random"] = "Aleatório";
ui_pt["m-dimensions"] = "Dimensões";
ui_pt["m-add"] = "Adicionar";
ui_pt["m-add-robot"] = "Adicionar Robô";
ui_pt["m-robot"] = "Robô";
ui_pt["m-position"] = "Posição";
ui_pt["m-turn"] = "Virar";
ui_pt["m-objects"] = "Objetos";
ui_pt["m-walls"] = "Paredes";
ui_pt["m-objects2"] = "Objetos";
ui_pt["m-tiles"] = "Blocos";
ui_pt["m-fill"] = "Preencher";
ui_pt["m-solid"] = "Sólido";
ui_pt["m-decorative"] = "Objeto decorativo";
ui_pt["m-background"] = "Pano de fundo";
ui_pt["m-goal"] = "Ponto de chegada";
ui_pt["mg-robot"] = "Rpbô";
ui_pt["mg-walls"] = "Paredes";
ui_pt["mg-objects"] = "Objetos";

ui_pt["Reeborg says: I'm done!"] = "Reeborg diz: Pronto!";
ui_pt["Reeborg writes:"] = "Reeborg escreve:";
ui_pt["Reeborg shouts: Something is wrong!"] = "Reeborg grita: Algo está errado!";
ui_pt["Reeborg explores some Javascript code"] = "Reeborg explorando código JavaScript";
ui_pt["Reeborg states:"] = "Reeborg afirma:";
ui_pt["Reeborg watches some variables!"] = "Reeborg assiste algumas variáveis!";
ui_pt["Click on the world to get some additional information."] = "Clique no mundo para obter algumas informações adicionais.";

ui_pt["Reeborg's basic keyboard"] = "Teclado básico do Reeborg";
ui_pt["kbd-command-btn"] = "Comandos";
ui_pt["kbd-condition-btn"] = "Condições";
ui_pt["kbd-python-btn"] = "Python";
ui_pt["kbd-py-console-btn"] = "Python";
ui_pt["kbd-javascript-btn"] = "JavaScript";
ui_pt["kbd-cpp-btn"] = "C++";
ui_pt["kbd-coffee-btn"] = "CoffeeScript";
ui_pt["kbd-objects-btn"] = "Objetos";
ui_pt["kbd-special-btn"] = "Especial";

ui_pt["UNDO"] = "Desfazer";
ui_pt["REDO"] = "Refazer";
ui_pt["tab"] = "TAB";
ui_pt["shift-tab"] = "Shift-TAB";
ui_pt["enter"] = "\u23CE";
ui_pt["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code> não é uma palavra-chave do Python.";

ui_pt["Colour:"] = "Cor:";
ui_pt["Enter a colour"] = "Entre com uma cor";

ui_pt["Background image"] = "Imagem de fundo";

ui_pt["NAME:"] = "Nome:";
ui_pt["Save world in browser"] = "Salvar o mundo no navegador";

ui_pt["Set the world's dimensions"] = "Defina dimensões do mundo";
ui_pt["set-dimensions-explain"] = "Aqui você pode definir as dimensões do seu mundo";
ui_pt["Maximum x value:"] = "Máximo valor de x:";
ui_pt["Maximum y value:"] = "Máximo valor de y:";
ui_pt["Use small tiles"] = "Usar blocos pequenos";

ui_pt["Set goal number for object"] = "Definir número do objetivo para objeto";
ui_pt["dialog-goal-object-explain"] = "Clique na checkbox se você deseja que o número seja igual ao número de objetos encontrados no mundo quando gerado.";
ui_pt["Number of objects"] = "Número de objetos";
ui_pt["All such objects"] = "Todos os objetos";

ui_pt["Number of objects:"] = "Número de objetos:";
ui_pt["Maximum:"] = "Máximo:";
ui_pt["Add object in the world"] = "Adicionar objeto no mundo";
ui_pt["ADD OBJECT EXPLAIN"] = "Escolha zero para remover qualquer objeto nesta localização. Se <code>Maximum</code> for definido para um valor maior que <code>Número de objetos</code>, um número de objetos entre estes dois números, será gerado de forma aleatória a cada vez que o programa for executado.";

ui_pt["Unlimited:"] = "Ilimitado:";
ui_pt["Give object to robot"] = "Dar objeto ao Robô:";
ui_pt["GIVE OBJECT EXPLAIN"] = "Escolha um número de objetos para o Robô carregar. Clique no checkbox caso você deseje que o número seja ilimitado.";

ui_pt["UPDATE BLOCKLY CONTENT"] = "Este mundo possui contéudo padrão para a área de trabalho de blocos. Para substituir os blocos, clique no botão.";
ui_pt["UPDATE BLOCKLY BUTTON"] = "Atualizar Blockly";
ui_pt["Contents from World"] = "Conteúdo do Mundo";

ui_pt["WARNING: Do not change this comment."] = "WARNING: Do not change this comment.";
ui_pt["Library Code is below."] = "Código da biblioteca abaixo.";
ui_pt["No solution can be saved when using REPL (Py)."] = "Nenhuma solução pode ser salva quando REPL (Py) estiver sendo usado!.";
ui_pt["No solution can be loaded when using REPL (Py)."] = "Nenhuma solução pode ser carregada quando REPL (Py) estiver sendo usado!.";

ui_pt["You are not allowed to use <code>done</code> in this world!"] = "Não permitido usar <code>done()</code> neste mundo!";
ui_pt["Execution ended before the <em>Post</em> code was executed."] = "Execução interrompida antes de <em>Post</em> ser executado.";

ui_pt["Difficulty level"] = "Nível de dificuldade";

ui_pt["Expected result"] = "Resultado esperado";
ui_pt["Differences highlighted"] = "Diferenças reveladas";
ui_pt["Actual result"] = "Resultado";

ui_pt["Cannot parse progress file."] = "Não foi possível a leitura do arquivo de progresso.";
ui_pt["Cannot merge progress."] = "Não foi possível atualizar o progresso.";
ui_pt["No solution found for this world."] = "Nenhuma solução encontrada para esse mundo.";

ui_pt["THINKING"] = "Pensando ...";

function inverse(obj){
  var retobj = {};
  for(var key in obj){
    retobj[obj[key]] = key;
  }
  return retobj;
}

pt_to_en = inverse(en_to_pt)