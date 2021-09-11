
function setupLocalVariables() {
    // Player name
    // if (!localStorage.getItem('playerName')) {
        let playerName = 'Bob';
        localStorage.setItem('playerName', JSON.stringify(playerName));
    // }

    // if (!localStorage.getItem('activeWindowOption')) {
        let activeWindowOption = [
            'battle-dialogue',
            'attack-selection',
            'win-lose-dialogue',
        ];
        localStorage.setItem('activeWindowOption', JSON.stringify(activeWindowOption));
    // }

    // if (!localStorage.getItem('activeWindow')) {
        let activeWindow = 'battle-dialogue';
        localStorage.setItem('activeWindow', JSON.stringify(activeWindow));
    // }

    // if (!localStorage.getItem('runAnimation')) {
        let runAnimation = true;
        localStorage.setItem('runAnimation', JSON.stringify(runAnimation));
    // }
    
    // if (!localStorage.getItem('attacks')) {
        let attacks = {
            1: {
                'name': 'Spit',
                'attacking_sentence': 'by spitting',
                'damage': 0,
                'special': 0.5,
            },
            2: {
                'name': 'Swing Sword',
                'attacking_sentence': 'with a swing of the sword',
                'damage': 10,
                'special': 0,
            },
            3: {
                'name': 'Throw Rock',
                'attacking_sentence': 'by throwing a rock',
                'damage': 5,
                'special': 0,
            },
            4: {
                'name': 'Punch',
                'attacking_sentence': 'with a punch',
                'damage': 1,
                'special': 0,
            },
        };
        localStorage.setItem('attacks', JSON.stringify(attacks));
    // }
    
    // if (!localStorage.getItem('activeAttack')) {
        let activeAttack = 1;
        localStorage.setItem('activeAttack', JSON.stringify(activeAttack));
    // }
    
    // if (!localStorage.getItem('opponentHP')) {
        let opponentHP = 10;
        localStorage.setItem('opponentHP', JSON.stringify(opponentHP));
    // }
    
    // if (!localStorage.getItem('playerHP')) {
        let playerHP = 10;
        localStorage.setItem('playerHP', JSON.stringify(playerHP));
    // }
    
    // if (!localStorage.getItem('playerXP')) {
        let playerXP = 0;
        localStorage.setItem('playerXP', JSON.stringify(playerXP));
    // }
    
    // if (!localStorage.getItem('playerLevel')) {
        let playerLevel = 1;
        localStorage.setItem('playerLevel', JSON.stringify(playerLevel));
    // }

    // if (!localStorage.getItem('opponentNames')) {
        let opponentNames = [
            'Achilleas',
            'Adam',
            'Agapi',
            'Aimilios',
            'Charalampos',
            'Charilaos',
            'Christos',
            'Demetrios',
            'Diamanto',
            'Dimitris',
            'Dorotheos',
            'Efthymios',
        ];
        localStorage.setItem('opponentNames', JSON.stringify(opponentNames));
    // }
    
    // if (!localStorage.getItem('processesBlocked')) {
        let processesBlocked = false;
        localStorage.setItem('processesBlocked', JSON.stringify(processesBlocked));
    // }
    
}

function setVar(variable, value) {
    if (!localStorage.getItem(variable)) {
        alert('Variable ' + variable + ' not found! Could not be set...');
        return false;
    }
    localStorage.setItem(variable, JSON.stringify(value));
    return true;
}

function getVar(variable) {
    if (!localStorage.getItem(variable)) {
        alert('Variable ' + variable + ' not found! Could not get...');
        return false;
    }
    return JSON.parse(localStorage.getItem(variable));
}

export { setupLocalVariables, setVar, getVar };
