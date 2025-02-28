document.addEventListener('DOMContentLoaded', function() {

    const scoreDisplay = document.getElementById('score');
    const width = 28;
    let score = 0;
    const grid = document.querySelector('.grid');
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
      ];
    /* 0 - pac-dots
       1 - wall
       2 - ghost-lair
       3 - power-pellet
       4 - empty
    */
    const squares = [];

    // cree le plateau de jeu
     function createBoard(){
        for (let i = 0; i<layout.length; i++){
            const square = document.createElement('div');
            grid.appendChild(square);
            squares.push(square);

            if(layout[i] === 0){
                squares[i].classList.add('pac-dot');
            } else if(layout[i] === 1){
                squares[i].classList.add('wall');
            } else if(layout[i] === 2){
                squares[i].classList.add('ghost-lair');
            } else if(layout[i] === 3){
                squares[i].classList.add('power-pellet');
            }
        }
     }
        createBoard();

let pacmanCurrentIndex = 490;
squares[pacmanCurrentIndex].classList.add('pac-man')

function movePacman(e) {
    // First, remove the pac-man class from current position
    squares[pacmanCurrentIndex].classList.remove('pac-man');
    
    switch (e.keyCode) {
        case 37: //gauche
            if (pacmanCurrentIndex % width !==0 && !squares[pacmanCurrentIndex -1].classList.contains('wall'))
            pacmanCurrentIndex -=1;
            break;
        case 38: //haut
            if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains('wall'))
            pacmanCurrentIndex -= width;
            break;
        case 39: //droite
            if (pacmanCurrentIndex % width < width -1 && !squares[pacmanCurrentIndex +1].classList.contains('wall'))
            pacmanCurrentIndex +=1;
            break;
        case 40: //bas
            if (pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains('wall'))
            pacmanCurrentIndex += width;
            break;
    }
    
    squares[pacmanCurrentIndex].classList.add('pac-man')
    pacDotEaten();
    powerPelletEaten();
    checkForGameOver();
    checkForWin();
}
document.addEventListener('keyup', movePacman);

//manger les pac-dots

   function pacDotEaten(){
    if(squares[pacmanCurrentIndex].classList.contains('pac-dot')){
        score++;
        scoreDisplay.innerHTML = score;
        squares[pacmanCurrentIndex].classList.remove('pac-dot');
    }
  }

    //manger les power-pellets
    function powerPelletEaten(){
        if(squares[pacmanCurrentIndex].classList.contains('power-pellet')){
            score +=10;
            ghosts.forEach(ghost => ghost.isScared = true);
            setTimeout(unScareGhosts, 10000);
            squares[pacmanCurrentIndex].classList.remove('power-pellet');
        }
    }

    //arreter le clignotement des fantomes
    function unScareGhosts(){
        ghosts.forEach(ghost => ghost.isScared = false);
    }

    //creer les fantomes en utilsant des constructeurs
    class Ghost {
        constructor(className, startIndex, speed){
            this.className = className;
            this.startIndex = startIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
            this.isScared = false;
            this.timerId = NaN;
        }
    }
     
    // tout les fantomes
    ghosts = [
        new Ghost('blinky', 348, 250),
        new Ghost('pinky', 376, 400),
        new Ghost('inky', 351, 300),
        new Ghost('clyde', 379, 500)
    ];

    //placer les fantomes sur le plateau
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add('ghost');
    });

    //deplacer les fantomes de maniere aleatoire
    ghosts.forEach(ghost => moveGhost(ghost));

    function moveGhost(ghost) {
        const directions = [-1, +1, -width, +width];
        let direction = directions[Math.floor(Math.random() * directions.length)];

        ghost.timerId = setInterval(function() {
            // si la prochaine case ou le fantome va se rendre n'est pas un mur et n'est pas un autre fantome
            if (!squares[ghost.currentIndex + direction].classList.contains('wall') &&
                !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
                //supprimmer la classe ghost
                squares[ghost.currentIndex].classList.remove(ghost.className);
                squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');
                // se deplacer dans cette espace
                ghost.currentIndex += direction;
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
                //sinon, trouver une nouvelle direction aleatoire dans laquelle se deplacer
                } else direction = directions[Math.floor(Math.random() * directions.length)];
                // si le fantome est effraye
                if(ghost.isScared){
                    squares[ghost.currentIndex].classList.add('scared-ghost');
                }
                //si le fantome est effraye et pacman le touche
                if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')){
                    squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
                    ghost.currentIndex = ghost.startIndex;
                    score +=100;
                    squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
                }
                checkForGameOver();
                
            }, ghost.speed);
        
    }

    //verifier si le jeu est terminer
    function checkForGameOver(){
        if(squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')){
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener('keyup', movePacman);
            setTimeout(function(){ alert("Game Over!"); }, 500);
        }
    }

    //verifier la victoire - plus lorsque le score est atteint
    function checkForWin(){
        if(score === 274){
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener('keyup', movePacman);
            setTimeout(function(){ alert("You have WON!"); }, 500);
        }
    }
});
