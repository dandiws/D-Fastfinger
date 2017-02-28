/*
Author	: Dandi Wiratsangka S
Title	: Fast type meter
Year	: 2016
*/
function mainFunction(lang) {
	document.getElementById("main").className+=" open";
	document.getElementById("chooselang").className+=" none";
	document.getElementById("count").className="count";
	var par;
if (lang=='ind') {
	par=document.getElementById("par1");
}
else {
	par=document.getElementById("par2");
}
var newspan=document.getElementById("newspan");
var input=document.getElementById("input");
var arr=par.innerHTML.toLowerCase().split(" ");
/*---Randoming array--*/
	arr=arr.sort(function() {
		return 0.5 - Math.random()
	});

/*---end---*/
var textnode=new Array();
var span=new Array();
var succed=0;
var fail=0;
var timer=document.getElementById("timer");
var countdown=document.getElementById("countdown");
var wrongarr=new Array();
var wrongarrin=new Array();
var wronglist=document.getElementById("wrong-list");

input.addEventListener("keypress",timing);
//----------DISPLAY WORDS
	for (var x = 0; x < arr.length; x++) {
		textnode[x]=document.createTextNode(arr[x]+" ");
		span[x]=document.createElement("span");
		span[x].appendChild(textnode[x]);
		newspan.appendChild(span[x]);
	}
	//-----------COUNTDOWN
	var d=59;
	function countDown() {
		countdown.innerHTML="00:"+d;
		var t=setTimeout(function () {
			d--;
			if(d<10){
				d="0"+d;
			}
			countDown();
		},1000);
		if(d<=0){
			clearTimeout(t);
		}
	}
	//---------TIMING
	function timing() {
			input.onkeypress='';//remove event
			input.removeEventListener("keypress",timing);
			input.addEventListener("keydown",typing);//ad keyup event
			timer.style.animation="timer 60s linear";//progress bar start
			var t=setTimeout(function() {//do..when already 1 minute
				input.removeEventListener("keydown",typing);
				input.value="";
				input.disabled="disabled";
				var wpm=Math.round((keystroke/5)-fail);
				if (wpm<0) {
					wpm=0;
				}
				var akurasi=((keystroke-(5*fail))/(keystroke+backspace)*100).toFixed(2).replace(/\.?0*$/,'');
				if (akurasi<0) {
					akurasi=0;
				}
				document.getElementById("keystroke").innerHTML=keystroke;
				document.getElementById("wpm").innerHTML=wpm+" wpm";
				document.getElementById("accuracy").innerHTML=akurasi+" %";
				document.getElementById("scoreboard").className+=" open";
				document.getElementById("count").className+=" open";
				wronglist.innerHTML='';
				for (var i = 0; i < wrongarr.length; i++) {
					wronglist.innerHTML+="<li>instead <span class='tblue'>"+wrongarr[i]+"</span> you input <span class='tred'>"+wrongarrin[i]+"</span></li>";
				}
				if (fail==0) {
					document.getElementById("wrongboard").className+=" none";
				}
			}, 60*1000);
			countDown();
	}

//----------VALIDATION
	span[0].className= "highlight";
	var i=0;
	var w=0;
	var keystroke=0;
	var backspace=0;
	var tf=-1.5;
	function typing(e){
		input.placeholder='';
		if (e.keyCode==8) {//8 is backspace
			backspace++;
		}
		if (e.keyCode==32) {//32 is space bar
			/*count keystroke*/
			e.preventDefault();
			if (input.value.length<=arr[i].length+1) {
				keystroke+=input.value.length+1;
			}
			else if (input.value.length>arr[i].length+1){
				keystroke+=arr[i].length+1;
			}
			/*end*/
			/*validate input with word in array*/
			if (input.value==arr[i]) {
				span[i].style.color="#2f81d6";
				succed++;//counting correct
				document.getElementById("succed").innerHTML=succed;
			}
			else {
				wrongarr[w]=arr[i];
				wrongarrin[w]=input.value;
				input.value='';
				w++;
				span[i].style.color="red";
				span[i].style.textDecoration="line-through";
				fail++;//counting incorrect
				document.getElementById("fail").innerHTML=fail;
			}
			/*end*/
			/*transition in new line*/
			if (span[i+1].offsetLeft<=35) {
				newspan.style.transition="0.3s";
				newspan.style.transform="translateY("+tf+"em)";
				tf-=1.5;
			}
			/*end*/
			span[i].className="";//delete highlight for current word
			input.value='';//re-empty input field
			span[i+1].className= "highlight";//highlighting next word
			i++;
		}
	}
//------PLACEHOLDER ON BLUR
function comeback() {
	input.placeholder="Type Here!";
}
}
