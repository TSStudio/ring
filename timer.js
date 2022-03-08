var player;
var list;
window.onload=function(){
    player=document.getElementById('player');
    list=document.getElementById('list');
}

function time(){
    d=new Date();
    return parseInt(d.getTime()/1000);
}
function timeofday(){
    return (time()+28800)%86400;
}
ringtones=new Array();
ringtones=["cb1.mp3","cb2.wav","co.mp3","lb.wav","st.mp3","ri.wav"];
//          0         1         2        3        4        5
tasks=["07:02:00","07:05:00","07:28:00","07:30:00","08:10:00","08:18:00","08:20:00","09:00:00","09:28:00","09:30:00","10:10:00","10:18:00","10:20:00","11:00:00","11:08:00","11:10:00","11:50:00","11:50:29","13:10:00","13:18:00","13:20:00","14:00:00","14:08:00","14:10:00","14:50:00","15:18:00","15:20:00","16:40:00"];//28
taskring=[4,5,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,3,5,0,1,2,0,1,2,0,1,2];

var times;
function play(no){
    player.src="resources/"+ringtones[no];
    player.play();
}
function playplan(i){
    play(taskring[i]);
    str="";
    for(j=0;j<tasks.length;j++){
        if(j<i){
            str=str+tasks[j]+" -> <a href=\"#\" onclick=\"play("+(taskring[j].toString())+")\">"+ringtones[taskring[j]]+"</a>已过时间<br>";
        }
        if(j==i){
            str=str+tasks[j]+" -> <a href=\"#\" onclick=\"play("+(taskring[j].toString())+")\">"+ringtones[taskring[j]]+"</a>正在播放/上一个播放<br>";
        }
        if(j>i){
            str=str+tasks[j]+" -> <a href=\"#\" onclick=\"play("+(taskring[j].toString())+")\">"+ringtones[taskring[j]]+"</a>将播放<br>";
        }
    }
    list.innerHTML=str;
}
function timeparse(){
    times=new Array();
    for(i=0;i<tasks.length;i++){
        h=tasks[i].substring(0,2);
        m=tasks[i].substring(3,5);
        s=tasks[i].substring(6,8);
        times.push(parseInt(h)*3600+parseInt(m)*60+parseInt(s));
    }
}
function init(){
    timeparse();
    str="";
    for(i=0;i<tasks.length;i++){
        if(timeofday()>times[i]){
            str=str+tasks[i]+" -> <a href=\"#\" onclick=\"play("+(taskring[i].toString())+")\">"+ringtones[taskring[i]]+"</a>已过时间<br>";
            continue;
        }
        setTimeout("playplan("+(i.toString())+")",(times[i]-timeofday())*1000);
        str=str+tasks[i]+" -> <a href=\"#\" onclick=\"play("+(taskring[i].toString())+")\">"+ringtones[taskring[i]]+"</a>将播放<br>";
    }
    list.innerHTML=str;
}