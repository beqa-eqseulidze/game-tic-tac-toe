
sessionStorage.getItem('player_1_score') ? null : sessionStorage.setItem('player_1_score',0)
sessionStorage.getItem('player_2_score') ? null : sessionStorage.setItem('player_2_score',0)
sessionStorage.getItem('ties_score') ? null : sessionStorage.setItem('ties_score',0)


import {checkPotentialWinner} from './checkPotentialWinner.js';
import {cpuPlays} from './cpuPlays.js';

const X=`<img src="./images/Xdark.svg" alt="Xdarck">` ;
const O=`<img src="./images/Odark.svg" alt="Odarck">` ;
let player1=sessionStorage.getItem('player1')  ;
let player2=sessionStorage.getItem('player2') ;
let player_1_score=sessionStorage.getItem('player_1_score');
let player_2_score=sessionStorage.getItem('player_2_score');
let ties_score=sessionStorage.getItem('ties_score');
let startTable=document.querySelector('.start-table');
let mainTable=document.querySelector('.main-table');
let nextGame=document.querySelector('.next-game');
export let opponentIco=sessionStorage.getItem('opponentIco')  
let items=['','','','','','','','','']  ; 
let gameOver=false;  
let gridItem;


    start();  
    function start(){
       if(!sessionStorage.getItem('opponentIco')){
           showStartPage()
           sessionStorage.setItem('game-mode','WEAK MODE')
           const cross=document.querySelector('#x');
           const circle=document.querySelector('#o');
           const btnVsCpu=document.querySelector('.vs-cpu'); 
           const btnVsPlayer=document.querySelector('.vs-player'); 
            
           cross.addEventListener('click',()=>{
                sessionStorage.setItem('opponentIco',O);
                cross.style.background='green';
                circle.style.background='#A8BFC9'                
            })

            circle.addEventListener('click',()=>{
                sessionStorage.setItem('opponentIco',X);
                circle.style.background='green';
                cross.style.background='#1A2A33'
            })
            
            document.querySelector('#weak-mode').addEventListener('click',()=>{
                document.querySelector('#weak-mode').classList.add('activ-mode')
                document.querySelector('#hard-mode').classList.remove("activ-mode");
                sessionStorage.setItem('game-mode','WEAK MODE')
            })
            document.querySelector('#hard-mode').addEventListener('click',()=>{
                document.querySelector('#hard-mode').classList.add('activ-mode');
                document.querySelector('#weak-mode').classList.remove("activ-mode");
                sessionStorage.setItem('game-mode','HARD MODE')
            })

            btnVsCpu.addEventListener('click',()=>{
                if(!sessionStorage.getItem('opponentIco')){
                    sessionStorage.setItem('opponentIco',X)
                    player1=sessionStorage.setItem('player1','CPU');
                    player2=sessionStorage.setItem('player2','YOU');
                }else{
                    if(sessionStorage.getItem('opponentIco')===O){
                        player1=sessionStorage.setItem('player1','YOU')
                        player2=sessionStorage.setItem('player2','CPU')
                    }else{
                        player1=sessionStorage.setItem('player1','CPU');
                        player2=sessionStorage.setItem('player2','YOU');
                    }
                }
                sessionStorage.setItem('opponent','cpu') 
                location.reload()               
            })
            
            btnVsPlayer.addEventListener('click',()=>{                
                if(!sessionStorage.getItem('opponentIco')){
                    sessionStorage.setItem('opponentIco',O);
                    sessionStorage.setItem('game-mode','X TURN') //??????????????
                    player1=sessionStorage.setItem('player1','player1');
                    player2=sessionStorage.setItem('player2','player2');
                }else{
                    if(sessionStorage.getItem('opponentIco')===O){
                        sessionStorage.setItem('game-mode','X TURN') //??????????????
                        player1=sessionStorage.setItem('player1','player1')
                        player2=sessionStorage.setItem('player2','player2')
                    }else{
                        sessionStorage.setItem('game-mode','O TURN') //??????????
                        player1=sessionStorage.setItem('player1','palyer2');
                        player2=sessionStorage.setItem('player2','palyer1');
                    }

                }
                sessionStorage.setItem('opponent','player') 
                location.reload()              
            }) 
        }else{
            showMainPage()
           sessionStorage.getItem('opponent')==='cpu'? startVsCpu() : startVsPlayer();
      
        }
    }
     
    function showStartPage(){
        startTable.setAttribute('style','display:flex')
        mainTable.setAttribute('style','display:none')
        nextGame.setAttribute('style','display:none')
    }
    function showMainPage(){
        startTable.setAttribute('style','display:none')       
        mainTable.setAttribute('style','display:flex')
        nextGame.setAttribute('style','display:none')
        document.querySelector('#how-X').innerText=player1;
        document.querySelector('#how-O').innerText=player2;
        document.querySelector('.player_1_score').innerText=player_1_score;
        document.querySelector('.ties_score').innerText=ties_score;
        document.querySelector('.player_2_score').innerText=player_2_score;             
        document.querySelector('#show-game-mode').innerText=sessionStorage.getItem('game-mode')
    }
    function quitOrNextRound(){
        startTable.setAttribute('style','display:none')
        mainTable.setAttribute('style','display:flex')
        nextGame.setAttribute('style','display:flex')
        if(document.querySelector('.next-round')){
            document.querySelector('.next-round').addEventListener('click',()=>{
               location.reload();
            }) 
            document.querySelector('.quite').addEventListener('click',()=>{
                showStartPage()
                sessionStorage.clear();
                location.reload();
            })       

        }

    }

    function startVsPlayer(){
        gridItem=Array.from(document.querySelector('.grid').children)
        addEventlistenerOnGridItem_1()

    }  

    function addEventlistenerOnGridItem_1(){ 
        var turn='player1';    
        let showTurn=document.querySelector('#show-game-mode')   
        for(let i=0;i<items.length;i++){          
            gridItem[i].addEventListener('click',()=>{                                               
                    if(items[i]===''&& gameOver!=true) {
                        if (sessionStorage.getItem('opponentIco')===O){
                            if(turn==='player1'){
                                items[i]=X;
                                turn='player2'
                                showTurn.innerText='O TURN'                                
                                checkWiner();  
                                roundDraw();           
                                drawGridItemHtml();                            
                            }else{
                                items[i]=O;
                                turn='player1'
                                showTurn.innerText='X TURN'       
                                checkWiner(); 
                                roundDraw();           
                                drawGridItemHtml();                            
                            }
                        }else{
                            if(turn !='player1'){
                                items[i]=X;
                                turn='player1';
                                showTurn.innerText='O TURN'       
                                checkWiner();  
                                roundDraw();           
                                drawGridItemHtml();                            
                            }else{
                                items[i]=O;
                                turn ='player2';
                                showTurn.innerText='X TURN'       
                                checkWiner(); 
                                roundDraw();           
                                drawGridItemHtml();                            
                            }
                            
                        }
                                                  
                        }                                       
                    })
                }
            }
    
    function startVsCpu(){      
        gridItem=Array.from(document.querySelector('.grid').children) 
        function anyItemFull(item){
            return item!='';                          
        }    
        if( sessionStorage.getItem('opponentIco')===X && !items.some(anyItemFull)){       // cpu starts game
            items[4]=X; 
            drawGridItemHtml() 
        }
        
        addEventlistenerOnGridItem_2();             
    }   


 // if opponent is cpu works this function  : 

    function addEventlistenerOnGridItem_2(){         
        for(let i=0;i<items.length;i++){          
            gridItem[i].addEventListener('click',()=>{                                               
                    if(items[i]===''&& gameOver!=true) {
                            sessionStorage.getItem('opponentIco')===X ? items[i]=O : items[i]=X;    // player plays  
                            drawGridItemHtml();                            
                            checkWiner();  
                            roundDraw();           
                            sessionStorage.setItem('pcAlreadyPlay','false')
                            if(!gameOver){
                                checkPotentialWinner(items,drawGridItemHtml);
                                checkWiner();
                                roundDraw();                         
                            }                                       
                            if(sessionStorage.getItem('pcAlreadyPlay')=='false' && gameOver!=true){
                                cpuPlays(drawGridItemHtml,items)
                                roundDraw()

                            }                             
                        }                                       
                    })
                }
            }
    
    function drawGridItemHtml(){
        for(let i=0;i<items.length; i++){
            gridItem[i].innerHTML=items[i]
        }
    }

    function roundDraw(){
        let icoXsrc='./images/Xdark.svg';
        let icoOsrc='./images/Odark.svg'; 

        function anyItemFree(item){
            return item=='';                          
        }         
        if(!items.some(anyItemFree)&& !gameOver){           
            let scoreQauntiry=Number(sessionStorage.getItem('ties_score'))+1;
            sessionStorage.setItem('ties_score',scoreQauntiry)           
            gameOver=!gameOver;
            setTimeout(quitOrNextRound,500); 
            document.querySelector('.next-game .conteiner').innerHTML=`
                <div style="display: flex; justify-content:center;
                align-items: center;margin:30px">               
                    <p class="text" style="color:#A8BFC9">ROUND TIED</p>
                </div>
                <div>
                    <button class="quite">QUITE</button>
                    <button class="next-round">NEXT ROUND</button>
                </div>
            `          
            return
        }
    }
    function winer(arg){ 
        let icoXsrc='./images/Xdark.svg';
        let icoOsrc='./images/Odark.svg';   
        if(items[arg]===X ){           
           let scoreQauntiry1=Number(sessionStorage.getItem('player_1_score'))+1;
            sessionStorage.setItem('player_1_score',scoreQauntiry1)    ;
           gameOver=!gameOver; 
           setTimeout(quitOrNextRound,500) 
           if(sessionStorage.getItem('opponent')==='cpu'){
                if(sessionStorage.getItem('player1')==='YOU'){
                    showRoundResult('YOU WON',icoXsrc,'#31C3BD')
                }else{
                    showRoundResult('YOU LOSS',icoOsrc,'#F2B137')
                }
           }else{
                if(sessionStorage.getItem('player1')==='player1'){
                    showRoundResult('PLAYER-1 WON',icoXsrc,'#31C3BD')
                }else{
                    showRoundResult('PLAYER-2 WON',icoXsrc,'#31C3BD')
                }

           }
        }else if(items[arg]===O ){
           let scoreQauntiry2=Number(sessionStorage.getItem('player_2_score'))+1;
           sessionStorage.setItem('player_2_score',scoreQauntiry2)   
           gameOver=!gameOver;  
           setTimeout(quitOrNextRound,500);
           if(sessionStorage.getItem('opponent')==='cpu'){
                if(sessionStorage.getItem('player1')==='CPU'){
                    showRoundResult('YOU WON',icoOsrc,'#F2B137')
                }else{
                    showRoundResult('YOU LOSS',icoXsrc,'#31C3BD')
                }
           }else{
                if(sessionStorage.getItem('player1')==='player1'){
                    showRoundResult('PLAYER-2 WON',icoOsrc,'#F2B137')
                }else{
                    showRoundResult('PLAYER-1 WON',icoOsrc,'#F2B137')
                }

            }
        }
    }  
                           
    function checkWiner(){                
        if(items[0]===items[1] && items[1]===items[2]&& items[2]!=''){
            winer(0)                
        }else if(items[3]===items[4] && items[4]===items[5]&& items[5]!=''){
            winer(3)                
        }else if(items[6]===items[7] && items[7]===items[8]&& items[8]!=''){
            winer(6)                        
        }else if(items[0]===items[4] && items[4]===items[8]&& items[8]!=''){
            winer(0)                
        }else if(items[2]===items[4] && items[4]===items[6]&& items[6]!=''){
            winer(2)                
        }else if(items[0]===items[3] && items[3]===items[6]&& items[6]!=''){
            winer(0)                
        }else if(items[1]===items[4] && items[4]===items[7]&& items[7]!=''){
            winer(1)                
        }else if(items[2]===items[5] && items[5]===items[8]&& items[8]!=''){
            winer(2)                
        }
    }
      
 
    document.querySelector('.btn-refresh').addEventListener('click',()=>{
        quitOrNextRound()
        document.querySelector('.next-game .conteiner').innerHTML=`
        <div style="display: flex; justify-content:center;
        align-items: center;">               
            <p class="text" style="color:#A8BFC9">RESTAT GAME?</p>
        </div>
        <div>
            <button class="quite close">NO,CLOSE</button>
            <button class="next-round restart">YES,RESTART</button>
        </div>
       `
        document.querySelector('.close').addEventListener('click',()=>{
        nextGame.setAttribute('style','display:none')
        })
        document.querySelector('.restart').addEventListener('click',()=>{
            showStartPage()
            sessionStorage.clear();
            location.reload();
        })          
    
    })  

    function showRoundResult(text,playerMarkSrc,color,visibility){
       let elem=document.querySelector('.raund-result');
       let palyerMark=document.querySelector('.player-mark');
       let textColor=document.querySelector('.text');
       let hidden=document.querySelector('.hidden');
           elem.innerText=text;
           palyerMark.src=playerMarkSrc;
           textColor.style.color=color;
           hidden.style.visibility=visibility
        }
        
           
    
  


