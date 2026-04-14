let frames=[]
let offsetX=0
let targetOffset=0

let autoMode=true
let focusIndex=0
let timer=0

class Frame{

constructor(x,y,w,h,label,link,desc){
this.baseX=x
this.y=y
this.w=w
this.h=h
this.label=label
this.link=link
this.desc=desc

this.scale=1
this.target=1
}

display(globalX,isFocus){

let dist = abs((this.baseX+globalX) - width/2)

//越接近中心越大（沉浸核心）
this.target = map(dist,0,width,1.4,0.7)

this.scale = lerp(this.scale,this.target,0.08)

let w=this.w*this.scale
let h=this.h*this.scale

let x=this.baseX+globalX-(w-this.w)/2
let y=this.y-(h-this.h)/2

//陰影
noStroke()
fill(0,0,0,80)
rect(x+10,y+10,w,h)

//聚光（比賽重點）
if(isFocus){
fill(255,255,200,160)
rect(x-20,y-20,w+40,h+40)
}

//畫框
fill(120,85,45)
rect(x,y,w,h)

//內框
fill(255)
rect(x+10,y+10,w-20,h-20)

//文字
fill(0)
textAlign(CENTER,CENTER)
textSize(18)
text(this.label,x+w/2,y+h/2)

//解說牌（加分）
textSize(12)
fill(80)
text(this.desc,x+w/2,y+h/2+30)

}

isHover(globalX){

let w=this.w*this.scale
let h=this.h*this.scale

let x=this.baseX+globalX-(w-this.w)/2
let y=this.y-(h-this.h)/2

return(
mouseX>x &&
mouseX<x+w &&
mouseY>y &&
mouseY<y+h
)

}

}



function setup(){

createCanvas(windowWidth,windowHeight)

//五個作品（含解說）

frames.push(new Frame(100,240,220,150,"第1週",
"https://example.com","基礎語法與結構"))

frames.push(new Frame(380,240,220,150,"第2週",
"https://jovie6818-byte.github.io/2026.0407/",
"p5.js互動設計"))

frames.push(new Frame(660,240,220,150,"第3週",
"https://example.com","class與物件導向"))

frames.push(new Frame(940,240,220,150,"第4週",
"https://example.com","動畫與互動控制"))

frames.push(new Frame(1220,240,220,150,"第5週",
"https://example.com","整合式作品展示"))

}



function draw(){

drawMuseum()

offsetX = lerp(offsetX,targetOffset,0.08)

//自動導覽（重點）
if(autoMode){
autoTour()
}

for(let i=0;i<frames.length;i++){
let isFocus = (i===focusIndex)
frames[i].display(offsetX,isFocus)
}

drawLight()

}



//博物館場景
function drawMuseum(){

background(235,225,210)

fill(0)
textSize(26)
text("📍 程式設計作品展覽館｜Auto Tour Mode",40,70)

stroke(210)
line(0,120,width,120)

noStroke()
fill(205,185,150)
rect(0,height*0.65,width,height)

}



//燈光掃描
function drawLight(){

let x = (frameCount*4)%width

noStroke()
fill(255,255,200,40)
ellipse(x,200,250,500)

}



//自動導覽（比賽核心）
function autoTour(){

timer++

if(timer>180){ //約3秒換一個

focusIndex++
if(focusIndex>=frames.length){
focusIndex=0
}

targetOffset = -focusIndex*280

timer=0
}

}



//點擊進入作品
function mousePressed(){

autoMode=false //點擊後變手動模式

for(let f of frames){

if(f.isHover(offsetX)){

let overlay=document.getElementById("overlay")
let viewer=document.getElementById("viewer")

viewer.src=f.link
overlay.style.display="flex"

}
}

}



//關閉展覽
document.addEventListener("click",function(e){

if(e.target.id==="overlay"){
document.getElementById("overlay").style.display="none"
}

})