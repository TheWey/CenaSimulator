var recognition; /* webkitSpeechRecognition */
var isListening = false; /* button switch */
var numOfCalls=-1;
/**
	Getting the DOM objects we want to eventually change
**/
var listenButton = document.getElementById("listen-button");
var conversationText = document.getElementById("conversation-text");


function init() {
	// Check if webkitSpeechRecognition exists. It's currently only available on Google Chrome
	if(!window.webkitSpeechRecognition){
    playSound('themesong');
		alert("JOHN CENA ONLY APPROVES OF GOOOOOOOOGLE CHRRROOOOOOMMMMEEEE");
	}
  else{
    playSound('ringing')//make this ordinary phone ring
		recognition = new webkitSpeechRecognition();
		/* Continuously listen for speech until the recognition stops */
		recognition.continuous = true;
		/* Once recognition starts, recognition.onstart is called back. We change the status text */
		recognition.onstart = function(){

		}
		/* Once recognition gets a result, recognition.onresult is called back. We get the words */
		recognition.onresult = function(event){
			if(event.results.length > 0){
				/**
					Results refer to the words that webkitSpeechRecognition thought we said.
					Even though we expect only one result, we use the loop so that the code can be reused.
				*/
				for(var i=event.resultIndex; i<event.results.length; i++){

					/* Within the first result, we fetch the phrase with the highest confidence, which is always the first */
					var phrase = event.results[i][0].transcript;

					conversationText.innerHTML=conversationText.innerHTML+"<br>"+phrase;
          numOfCalls++;
					cena(phrase);

				}
			}
		}
	}
}

window.onkeyup=function(e){
  if (e.keyCode==13){
   toggleListen();
  }

}

function isquestion(p){
  return (containsLS(p,['who','what','when','where','why','how']));

}

function correlate(p)
{
  //this is a primitive version, its going to be stupid
  if(contains(p,"ready")){
    return 2;
  }
  else if(isquestion(p)){
    return 3;
  }
  else if(contains(p,"hello"))
  	{
  		if(numOfCalls==0)
  			{
     			return 1;
    		}
  		else if(numOfCalls<7)
    		{
      		return 6;
    		}
  		else return 7;
    }
  else if(containsLS(p,['f*', 's*','shipping','shipped','ship', 'damn', 'hell', 'crap', 'bitch', 'shut up']))
  	{
  		return 4;
  	}
  else if(contains(p,"cena")){
    return 5;
  }
  else return 8;
  //Hang up and then collectcall call them again


}
//Sets background
function setCena(filename){
	 document.body.style.backgroundImage = "url('pics/" + filename + ".jpg')";
}

function cena(phrase){

  var d=correlate(phrase);
  switch(d) {
    case 1:
      	playSound('champ');
        break;
    case 2:
      	playSound('ready');
				cenaPics();
        break;
    case 3:
      	playSound('questionwillbeanswered');
				cenaPics();
      	break;
    case 4:
      {
        setCena('marineCorps');
 				playSound('marinecorps');
        var blink = document.getElementById("blink");
        parentCena = blink.parentNode
        parentCena.removeChild(blink);
        var top = document.getElementById("top");
        topCena = top.parentNode
        topCena.removeChild(top);
        function militaryCena(){
  			setCena('militaryCena');
  			playSound('name2');
  			parentCena.insertBefore(blink , parentCena.firstChild);
        topCena.insertBefore(top, topCena.firstChild);
        }
        window.setTimeout(militaryCena, 7500);
        break;
      }
    case 5:
        playSound('themesong');
				cenaPics();
      	break;
    case 6:
      	playSound('goodbye');
				cenaPics();
      	break;
    case 7:
      	RandomSound();
				cenaPics();
        break;
    case 8:
      	RandomSound();
				cenaPics();
				var x = function(){ playSound('hangup');
      	document.body.style.backgroundImage="none"; playSound('collectcall')}
				window.setTimeout(x, 7500);
      	break;
    default:
      ;

  }

}

function RandomSound()
{
				var sounds=['undertakersaid','49.99','59.99','imwatchingu','murica'];//Array of sound file names
        var index=parseInt(Math.random()*4)+1;
      	playSound(sounds[index]);
}

function militaryCena(){
  setCena('militaryCena');
  playSound('name2');
  parentCena.insertBefore(blink,parentCena.firstChild);
        topCena.insertBefore(top, topCena.firstChild);
}
function contains(phrase, innerString){
	return phrase.toUpperCase().indexOf(innerString.toUpperCase())>-1;
}
function containsLS(phrase, containedLS){
  for (var i=0;i<containedLS.length;i++){
		if (contains(phrase, containedLS[i])){
      return true;
    }
  }
  return false;
}

function cenaPics() {
  var r=parseInt(Math.random()*5)+1;
  document.body.style.backgroundImage = "url('pics/cena" + r + ".jpg')";
}
function playSound(filename){
	var	audio = new Audio('sound/'+ filename +'.mp3');
	audio.play();


}

/**
	toggleListen()
	- Starts and stops webkitSpeechRecognition
*/
function toggleListen(){
  conversationText.innerHTML="";
	if(isListening){
		recognition.stop();
		isListening = false;
		listenButton.innerHTML = "Speak to Cena-senpai";
	}else{
		recognition.start();
		isListening = true;
		listenButton.innerHTML = "Stop Listening";
	}
}

/* Run the init() function to set everything up */
init();
