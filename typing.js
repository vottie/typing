// 単語
var wordList = [
    "main", "start", "exit", "end", "function", "type", "data", "print", "execute",
    "ruby", "python", "info", "error", "warning", "debug", "test", "add", "sub",
    "multiple", "div", "list", "map", "hash"
];
var wordMap = {start: '開始:start', end: '終了:end', define: '定義、宣言:define',
                function: '機能、関数:function',
                red: '赤:red',
                blue: '青:blue',
                orange: 'オレンジ:orange',
                town: '街:town',
                craft: '作る:craft',
                mine: '掘る:mine'
                };

// 時間制限
var timeLimit = 45;

var timer1;
var wordStr;
var wordChars;
var charIndex;
var messageArea;
var wordArea;
var typeArea;
var score;
var timeLeft;
var selectItem;
var qtype;

window.onload = function (){
    messageArea = document.getElementById("message");
    wordArea    = document.getElementById("word");
    typeArea    = document.getElementById("type");
    startButton = document.getElementById("start-button");
}

// 3秒後に開始
function onStartButtonClick(){
    selectItem = document.getElementById("qtype");
    qtype = selectItem.value;
    // console.log(qtype);
    /**
    if (qtype.value == "fast_type") {
        wordList = wordsArray;
    } else {
        wordlist = wordsMap;
    }
    */
    messageArea.textContent = "Ready?";
    setTimeout("startTyping()", 3000);
}

// 開始
function startTyping(){
    score = 0;
    timeLeft = timeLimit;
    nextWord();
    countDown();
    timer1 = setInterval("countDown()", 1000);
    startButton.disabled = true;
}

// 終了
function stopTyping(){
    clearInterval(timer1);
    wordChars = [];
    messageArea.textContent = "Score: " + score;
    wordArea.textContent = "";
    typeArea.textContent = "";
    startButton.disabled = false;
}

// 次の単語を表示
function nextWord(){
    if(qtype == "fast_type") {
        charIndex = 0;
        var random = Math.floor( Math.random() * wordList.length );
        wordArea.textContent = wordList[random];
        typeArea.textContent = "";
        wordChars = wordList[random].toUpperCase().split('');
    } else {
        charIndex = 0
        var keys = Object.keys(wordMap);
        console.log(keys);
        //console.log(keys.length);
        //console.log(idx);
        var idx = keys[Math.floor( Math.random() * keys.length )];
        wordArea.textContent = wordMap[idx];
        typeArea.textContent = "";
        //wordChars = wordMap[idx].toUpperCase().split('');
        console.log(idx);
        wordChars = idx.toUpperCase().split('');
        console.log(wordMap[idx]);
        console.log(wordChars);
        // result is undefined
    }
}

// 残り時間を計測
function countDown(){
    if(timeLeft <= 0) {
        stopTyping();
        return;
    }
    messageArea.textContent = timeLeft + " sec.";
    timeLeft--;
}

// キー押下時の処理
document.onkeydown = function (e){
    var keyStr;
    if(e.keyCode == 189){
        keyStr = "-";
    } else {
        keyStr = String.fromCharCode(e.keyCode);
    }

    console.log("keystr = " + keyStr);
    console.log(wordChars[charIndex]);
    if(wordChars[charIndex] == keyStr){

        charIndex++;
        typeArea.textContent = typeArea.textContent + keyStr.toLowerCase();
        if(charIndex== wordChars.length){
            score++;
            console.log(typeArea);
            setTimeout("nextWord()", 200);
        }
    }
};