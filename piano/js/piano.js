// Document Elements
const pianoArea = document.querySelector(".piano-background");
const body = document.querySelector("body");
const label = document.querySelector(".label");
const main = document.querySelector("main");
const greatOldOne = document.querySelector(".great-old-one");
const oldOneImg = document.querySelector(".old-pic");

const pianoKeys = document.getElementsByClassName("key");
const lowerKeys = document.getElementsByClassName("white-key");
const upperKeys = document.getElementsByClassName("black-key");

// Make key groupings arrays for loop iterations
const allKeys = Array.from(pianoKeys);
const whiteKeys = Array.from(lowerKeys);
const blackKeys = Array.from(upperKeys);

// Varible to see if user types in weseeyou command
let phrase = "";

// Piano Sounds
const sound = {65:"http://carolinegabriel.com/demo/js-keyboard/sounds/040.wav",
    87:"http://carolinegabriel.com/demo/js-keyboard/sounds/041.wav",
    83:"http://carolinegabriel.com/demo/js-keyboard/sounds/042.wav",
    69:"http://carolinegabriel.com/demo/js-keyboard/sounds/043.wav",
    68:"http://carolinegabriel.com/demo/js-keyboard/sounds/044.wav",
    70:"http://carolinegabriel.com/demo/js-keyboard/sounds/045.wav",
    84:"http://carolinegabriel.com/demo/js-keyboard/sounds/046.wav",
    71:"http://carolinegabriel.com/demo/js-keyboard/sounds/047.wav",
    89:"http://carolinegabriel.com/demo/js-keyboard/sounds/048.wav",
    72:"http://carolinegabriel.com/demo/js-keyboard/sounds/049.wav",
    85:"http://carolinegabriel.com/demo/js-keyboard/sounds/050.wav",
    74:"http://carolinegabriel.com/demo/js-keyboard/sounds/051.wav",
    75:"http://carolinegabriel.com/demo/js-keyboard/sounds/052.wav",
    79:"http://carolinegabriel.com/demo/js-keyboard/sounds/053.wav",
    76:"http://carolinegabriel.com/demo/js-keyboard/sounds/054.wav",
    80:"http://carolinegabriel.com/demo/js-keyboard/sounds/055.wav",
    186:"http://carolinegabriel.com/demo/js-keyboard/sounds/056.wav"};

// Keep track of keys being held down to prevent constant sound playing
let pressedKeys = {};

// Keep track of current phrase that has been typed for the key word
let currentTypedPhrase = "";


// Show key labels on mouseover
for(const keys of allKeys)
{
    keys.addEventListener("mouseover", (event) => {
        for(const key of allKeys)
        {
            key.style.contentVisibility = "visible";  
        }
    });
}

// Hide key labels again when mouseover ends
pianoArea.addEventListener("mouseout", (event) => {
    for(const key of allKeys)
    {
        key.style.contentVisibility = "hidden";
    }
});


// Make piano play on keydown events
body.addEventListener("keydown", keyPressed);
body.addEventListener("keyup", keyReleased);

function keyPressed(e) {
    const keyPressed = e.code[3];

    // Check Black Keys;
    for(const blackKey of blackKeys)
    {
        if(blackKey.textContent == keyPressed)
        {
            blackKey.style.backgroundColor = "grey";

            // Play sound once
            if (pressedKeys[e.keyCode]) {
                return; 
            }
            const url = sound[e.keyCode];
            const audio = new Audio(url);
            audio.play();
            pressedKeys[e.keyCode] = true;

            // Track letters typed
            CheckPhrase(blackKey.textContent);
        }
    }

    // Check White Keys
    for(const whiteKey of whiteKeys)
    {
        if(whiteKey.textContent == keyPressed)
        {
            whiteKey.style.backgroundColor = "grey";

            // Play sound once
            if (pressedKeys[e.keyCode]) {
                return; 
            }
            const url = sound[e.keyCode];
            const audio = new Audio(url);
            audio.play();
            pressedKeys[e.keyCode] = true;

            // Track letters typed
            CheckPhrase(whiteKey.textContent);
        }
        else if(whiteKey.textContent == ";" && keyPressed == "i")  // Check for special character ;
        {
            whiteKey.style.backgroundColor = "grey";
            // Play sound once
            if (pressedKeys[e.keyCode]) {
                return; 
            }
            const url = sound[e.keyCode];
            const audio = new Audio(url);
            audio.play();
            pressedKeys[e.keyCode] = true;

            // Track letters typed
            CheckPhrase(whiteKey.textContent);
        }
    }
        
}


function keyReleased(e) {
    const keyPressed = e.code[3];

    // Check Black Keys;
    for(const blackKey of blackKeys)
    {
        if(blackKey.textContent == keyPressed)
        {
            blackKey.style.backgroundColor = "black";
            pressedKeys[e.keyCode] = false;
        }
    }

    // Check White Keys
    for(const whiteKey of whiteKeys)
    {
        if(whiteKey.textContent == keyPressed)
        {
            whiteKey.style.backgroundColor = "white";
            pressedKeys[e.keyCode] = false;
        }
        else if(whiteKey.textContent == ";" && keyPressed == "i")  // Check for special character ;
        {
            whiteKey.style.backgroundColor = "white";
            pressedKeys[e.keyCode] = false;
        }
    }
        
}


// Function to play audio
function CheckPhrase(keyContent)
{
    if(currentTypedPhrase.length < 8)
    {
        currentTypedPhrase += keyContent;
    }
    else
    {
        currentTypedPhrase = currentTypedPhrase.substring(1) + keyContent;
    }

    if(currentTypedPhrase == "WESEEYOU")
    {
        // Hide and disable piano
        pianoArea.style.display = "none";
        body.removeEventListener("keydown", keyPressed);
        body.removeEventListener("keyup", keyReleased);

        // Reveal the great old on div with fade in and play creepy audio
        greatOldOne.style.display = "flex";
        const url = "https://orangefreesounds.com/wp-content/uploads/2020/09/Creepy-piano-sound-effect.mp3?_=1";
        const audio = new Audio(url);
        audio.play();
        FadeInOldOne();


    }
}


function FadeInOldOne()
{
    opacity = parseFloat(oldOneImg.style.opacity);
    if (isNaN(opacity)) {
        opacity = 0;
    }

    opacity += 0.1;
    oldOneImg.style.opacity = opacity;
    if(opacity >= 1.0)
    {
        return
    }
    setTimeout(FadeInOldOne,3);


}

