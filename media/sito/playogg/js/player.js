// execute on load

    var flashvars = {};
    var params = {};
    var attributes = {
	allowScriptAccess: "always",
	swLiveConnect:"true"
    };

    var haveflash=false;
    function callbackFn(e) 
    {
      if (e.success){
	  //alert("you have flash");
      haveflash=true;
    };
      createPlayer(media,"html5player","flashplayer","javaplayer");
    }
    
    // try to update flash becouse after I am hidden !
    function cancelFunction() {
     alert("Flash Express Install was cancelled");
    }
    var upflash = function() {

      var att = { data:"baseURL+swfobject/expressInstall.swf", width:"310", height:"137" };
      var par = {};
      var id = "updateflash";
      swfobject.showExpressInstall(att, par, id, cancelFunction);
    }

    if ( ! (swfobject.hasFlashPlayerVersion("10.0.0"))) {
	swfobject.addDomLoadEvent(upflash);
    }

//alert ("installo:"+baseURL+"flash/AnOgg.swf");
    swfobject.embedSWF(baseURL+"flash/AnOgg.swf", "flashplayer",  "0", "0", "10.0.0", baseURL+"swfobject/expressInstall.swf",flashvars,params,attributes,callbackFn);



//----------------------------------------------------
//                 Flash
//
/* Helper function */
function getFlashMovie(movieName)
{

    //alert("moviename:"+movieName);
    //return $(movie_name)

    if (window.document[movieName]) 
	{
	    return window.document[movieName];
	}
    if (navigator.appName.indexOf("Microsoft Internet")==-1)
	{
	    if (document.embeds && document.embeds[movieName])
		return document.embeds[movieName]; 
	}
    else // if (navigator.appName.indexOf("Microsoft Internet")!=-1)
	{
	    return document.getElementById(movieName);
	} 
}

/* Commands */
function oggPlayURL(oggPlayer,str)//play an url ending with .ogg or .mp3
{
    //alert(getFlashMovie(oggPlayer));
    //alert(str);
	    getFlashMovie(oggPlayer).playURL(str);
}
function oggStop(oggPlayer) //stop playing and discontinue loading as well
{
	getFlashMovie(oggPlayer).stopPlaying();
	//btnSetBufferState(0);
}
function oggSetVolume(oggPlayer,val)//set linear volume to 0-100
{
	getFlashMovie(oggPlayer).setVolume(val);
}
function oggPause(oggPlayer)//toggle pause playing but continue loading
{
	getFlashMovie(oggPlayer).pausePlay();
}
function oggSeek(oggPlayer,val)//set seek position from 0 to 1 (floating point)
{
	getFlashMovie(oggPlayer).Seek(val);
}


// general function

function  createPlayer(playURL,html5id,flashid,javaid){

    var id=testobjects(html5id,flashid,javaid);

    if(document.getElementById && document.createElement)
	{

	    //alert(id);

	    if ( id == "plugin"){
		$("#player").append('<a type="audio/ogg" href="'+playURL+'" id='+id+'"><b>player</b><a>')
		$("#player").css({background:'url('+imgURL+'player.png)'})
	    }
	    else{
		$("#player").append('<div id="'+id+'" style="background-image: url('+imgURL+'player.png)"> <b>Play OGG</b></div>')
		$("#player").css({background:'url('+imgURL+'player.png)'})
		$("#"+id).click(function (event) { 
			buttonPlayStop(event,playURL,html5id,flashid,javaid);
		    });
	    
	    }
	}
}

function  setPlayerButton(PlayerID,PlayStop,imgBaseURL)
{
    document.getElementById(PlayerID).src=imgURL+"media-"+PlayStop+".png";
}

var html5playogg=null;

function testobjects(html5id,flashid,javaid){
    var player=null;

    try {
	
	html5playogg=document.createElement('audio').canPlayType('audio/ogg; codecs=vorbis');

	document.getElementById(html5id).pause();
	if (html5playogg != "probably")
	    { 
		//swfobject.embedSWF("flash/AnOgg.swf", "redoflplayer",  "310", "137", "10.0.0", "swfobject/expressInstall.swf",flashvars,params,attributes,callbackFn);
		//alert(flashid);
		//alert("Your browser have some problems with html5 and Ogg ! redirect to no html5 version");
		var currenturl = document.location.href;
		window.location.replace(currenturl.replace("/player/", "/player/nohtml5/"));

		//raise_random_error();
	}
	player="html5";
    }
    catch(err){

	/*   non va questo
	try {
	    oggPlayURL("null.ogg");
	    player="flash";
	}
	*/

	if (haveflash){
	    player="flash";
	    return player;
	}
	
	try {
	    document.getElementById(javaid);
	    player="java";
	}
	catch(err){
	    player="plugin";
	}
    }

    return player;
}


function buttonPlayStop(event,playURL,html5id,flashid,javaid){
    // IE doesn't pass event into the parameter
    if ( !event )
	{
	    event = window.event;
	}

    // IE doesn't have the property "target".
    // Use "srcElement" instead.
    // Not 100% the same, but works in most simple cases
    var target = event.target ? event.target : event.srcElement;

    PlayerID=target.getAttribute("id")

	//alert("ecco:"+PlayerID);

	switch (PlayerID) {
	case "html5":
	html5buttonPlayStop(PlayerID,html5id,playURL);
	break;
	
	case "flash": 
	flashbuttonPlayStop(PlayerID,flashid,playURL);
	break;
	
	case "java": 
	javabuttonPlayStop(PlayerID,javaid,playURL);
	break;

	default:
	alert("error: notify to webmaster");
	}
}

function html5buttonPlayStop(PlayerID,html5id,playURL)
{
    var myAudio = document.getElementById(html5id);
    if (myAudio.paused){
       	myAudio.setAttribute('src', playURL);
	myAudio.play();
	setPlayerButton(PlayerID,"stop");
	$("#"+PlayerID).css({backgroundPosition:'270px 262px'}).attr("title","STOP")
    }else{
	myAudio.pause();
	setPlayerButton(PlayerID,"play");
	$("#"+PlayerID).css({backgroundPosition:'75px 262px'}).attr("title","PLAY")
    }
}

     var flStatus = false;

function flashbuttonPlayStop(PlayerID,flashid,playURL)
{
    if (flStatus){
	oggStop(flashid);
	flStatus = false;
	setPlayerButton(PlayerID,"play");
	$("#"+PlayerID).css({backgroundPosition:'75px 262px'}).attr("title","STOP")
    }
    else{
	oggPlayURL(flashid,playURL);
	flStatus = true;
	setPlayerButton(PlayerID,"stop");
	$("#"+PlayerID).css({backgroundPosition:'270px 262px'}).attr("title","PLAY")
    } 
}


/* doPlay(): Start playback
   doPause(): Pause playback
   doStop(): Stop playback 
   doSeek(double pos)   seek to a new position, must be between 0.0 and 1.0.
   getPlayPosition(): returns current position in seconds   */

var javaStatus = false;

function javabuttonPlayStop(PlayerID,javaid,playURL)
{

    //var javaAudio = document.getElementById(javaid);
    //var javaAudio = $(javaid);
    var javaAudio = document.applets[0];

    if (javaStatus){
	javaAudio.doStop();
	javaStatus = false;
	setPlayerButton(PlayerID,"play");
	$("#"+PlayerID).css({backgroundPosition:'75px 262px'}).attr("title","STOP")
    } 
    else{
	javaAudio.doPlay();
	javaStatus = true;
	setPlayerButton(PlayerID,"stop");
	$("#"+PlayerID).css({backgroundPosition:'270px 262px'}).attr("title","PLAY")
    }
}

