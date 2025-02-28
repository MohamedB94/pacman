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
     
    // tout les fantomes - modifier la position de départ de Blinky (294 est dans le ghost lair)
    ghosts = [
        new Ghost('blinky', 293, 250), // Position modifiée pour être en dehors du ghost-lair
        new Ghost('pinky', 376, 250),
        new Ghost('inky', 351, 250),
        new Ghost('clyde', 379, 250)
    ];

    //placer les fantomes sur le plateau
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add('ghost');
    });

    // Démarrer Blinky immédiatement
    moveGhost(ghosts[0]);

    // Fonction pour libérer les fantômes du ghost-lair un par un
    function releaseGhosts() {
        let ghostIndex = 1; // Commencer par Pinky (indice 1)
        
        const releaseTimer = setInterval(() => {
            if (ghostIndex <= 3) {
                // Déplacer le fantôme vers la sortie avant de commencer son mouvement normal
                const ghost = ghosts[ghostIndex];
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost');
                ghost.currentIndex = 294; // Position de sortie
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
                
                // Démarrer le mouvement du fantôme
                moveGhost(ghost);
                
                ghostIndex++;
            } else {
                clearInterval(releaseTimer);
            }
        }, 5000); // Libérer un fantôme toutes les 5 secondes
    }

    // Déclencher la libération des fantômes
    releaseGhosts();

    function moveGhost(ghost) {
        const directions = [-1, +1, -width, +width];
        let direction = directions[Math.floor(Math.random() * directions.length)];

        ghost.timerId = setInterval(function() {
            // 80% de chance de suivre Pac-Man, 20% de mouvement aléatoire
            if (Math.random() < 0.3) {
                // Logique pour suivre Pac-Man
                let possibleDirections = [];
                
                // Vérifier les directions possibles (sans murs ou autres fantômes)
                directions.forEach(dir => {
                    if (!squares[ghost.currentIndex + dir].classList.contains('wall') && 
                        !squares[ghost.currentIndex + dir].classList.contains('ghost') &&
                        !squares[ghost.currentIndex + dir].classList.contains('ghost-lair')) {
                        possibleDirections.push(dir);
                    }
                });
                
                if (possibleDirections.length > 0) {
                    // Calculer quelle direction nous rapproche de Pac-Man
                    let bestDirection = possibleDirections[0];
                    let bestDistance = Number.MAX_VALUE;
                    
                    possibleDirections.forEach(dir => {
                        const newPos = ghost.currentIndex + dir;
                        const distance = Math.abs(newPos % width - pacmanCurrentIndex % width) + 
                                        Math.abs(Math.floor(newPos / width) - Math.floor(pacmanCurrentIndex / width));
                        
                        if (distance < bestDistance) {
                            bestDistance = distance;
                            bestDirection = dir;
                        }
                    });
                    
                    direction = bestDirection;
                }
            }

            // Vérifier si la direction choisie est valide
            if (!squares[ghost.currentIndex + direction].classList.contains('wall') && 
                !squares[ghost.currentIndex + direction].classList.contains('ghost') &&
                !squares[ghost.currentIndex + direction].classList.contains('ghost-lair')) {
                
                // Supprimer toutes les classes du fantôme à sa position actuelle
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
                
                // Déplacer le fantôme
                ghost.currentIndex += direction;
                
                // Ajouter les classes appropriées à la nouvelle position
                squares[ghost.currentIndex].classList.add(ghost.className);
                squares[ghost.currentIndex].classList.add('ghost');
                
            } else {
                // Choisir une nouvelle direction aléatoire si la précédente n'est pas valide
                direction = directions[Math.floor(Math.random() * directions.length)];
            }
            
            // Gérer l'état "effrayé" du fantôme
            if (ghost.isScared) {
                squares[ghost.currentIndex].classList.add('scared-ghost');
            }
            
            // Gérer la collision avec Pac-Man quand le fantôme est effrayé
            if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
                ghost.currentIndex = ghost.startIndex;
                score += 100;
                scoreDisplay.innerHTML = score;
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
            }
            
            // Vérifier si le jeu est terminé
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
    function checkForWin() {
        // Vérifier s'il reste des pac-dots ou power-pellets
        const remainingPellets = squares.some(square => 
            square.classList.contains('pac-dot') || 
            square.classList.contains('power-pellet')
        );
        
        if (!remainingPellets) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener('keyup', movePacman);
            setTimeout(() => alert("You have WON!"), 500);
        }
    }
});
