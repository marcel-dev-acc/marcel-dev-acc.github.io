/* Game code here */
import { setupLocalVariables } from './utils/manageVariables.js';
import { maintainGameStats } from './utils/utils.js';
import { upButtonSetup } from './buttons/upButton.js';
import { downButtonSetup } from './buttons/downButton.js';
import { leftButtonSetup } from './buttons/leftButton.js';
import { rightButtonSetup } from './buttons/rightButton.js';
import { aButtonSetup } from './buttons/aButton.js';


document.addEventListener('DOMContentLoaded', function(event) {
    console.log('Document loaded');
    setup();
});

// Game load function
function setup() {
    try {

        // Set local variables setLocalVariables
        setupLocalVariables();

        maintainGameStats();

        // Up Button
        upButtonSetup();

        // Down Button
        downButtonSetup();

        // Left Button
        leftButtonSetup();

        // Right Button
        rightButtonSetup();

        // A Button
        aButtonSetup();

        // B Button
        document.getElementById("B-button").addEventListener("click", function() {
            console.log("B PRESS");
        });

        
        // testing


    } catch(error) {
        alert("Error on setup");
        alert(error);
    }
    
    

}
