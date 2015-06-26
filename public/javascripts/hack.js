var outputConsole = document.querySelector(".output-console");


/* fake console stuff */
var commandStart = ['Performing DNS', 
                'Searching for DNS system', 
                'Analyzing ', 
                'Estimating data of ', 
                'hacking website ', 
                'Requesting : ', 
                'wget -a -t ', 
                'tar -xzf ', 
                'sudo -s ***** ',
                'Entering Location ', 
                'Compilation Started of ',
                 'Downloading '],
    commandParts = ['Data Structure', 
                    'http://wwjd.com?au&2', 
                    'Texture', 
                    'TPS Reports', 
                    ' .... Searching ... ', 
                    'www.bet-up.fr/donation', 
                    'www.csgoprizes.com/admin'],
    commandResponses = ['Authorizing ', 
                 'Authorized...', 
                 'Access Granted..', 
                 'Going Deeper....', 
                 'Decrypting....',
                 'Compression Complete.', 
                 'Compilation Complete..', 
                 'Entering Security Console...', 
                 'Encryption Unsuccesful ...', 
                 'Waiting for response...', 
                 '....Searching...', 
                 'Calculating Requirements '
                ],
    isProcessing = false,
    processTime = 0,
    lastProcess = 0;


function consoleOutput(){
    var textEl = document.createElement('p');
    
    if(isProcessing){
        textEl = document.createElement('p');
        textEl.textContent += Math.random() + " ";
        if(Date.now() > lastProcess + processTime - 2500){
            isProcessing = false;   
        }
    }else{
        var commandType = ~~(Math.random()*4);
        switch(commandType){
            case 0:
                textEl.textContent = commandStart[~~(Math.random()*commandStart.length)] + commandParts[~~(Math.random()*commandParts.length)];
                break;
            case 3: 
                isProcessing = true;
                processTime = ~~(Math.random()*5000);
                lastProcess = Date.now();
            default:
                 textEl.textContent = commandResponses[~~(Math.random()*commandResponses.length)];
            break;
        }
    }

    outputConsole.scrollTop = outputConsole.scrollHeight;
    outputConsole.appendChild(textEl);
    
    if (outputConsole.scrollHeight > window.innerHeight) {
       var removeNodes = outputConsole.querySelectorAll('*');
       for(var n = 0; n < ~~(removeNodes.length/3); n++){
            outputConsole.removeChild(removeNodes[n]);
        }
    }   
    setTimeout(consoleOutput, ~~(Math.random()*200));
}


setTimeout(function(){   
  consoleOutput();
}, 1500);

