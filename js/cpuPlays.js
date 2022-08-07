
import {opponentIco} from './main.js';

export function cpuPlays(drawGridItemHtml,items){       
    let freeItems=[]  
    if(items[4]===''){
        items[4]=opponentIco
        drawGridItemHtml() 
        sessionStorage.setItem('pcAlreadyPlay','true') 
        return
    }
    if(sessionStorage.getItem('game-mode')==='HARD MODE'){
        if(items[0]===''||items[2]===''||items[6]===''||items[8]===''){
            items[0]===''? freeItems.push(0):null;
            items[2]===''? freeItems.push(2):null;
            items[6]===''? freeItems.push(6):null;
            items[8]===''? freeItems.push(8):null;          
            playRandom(freeItems);
            return
        }
    }

    for(let i=0; i<items.length;i++){
        if(items[i]===''){            
            freeItems.push(i)
        }
    }  
         
    playRandom(freeItems)    

    function playRandom(array){               
        let num=Math.floor(Math.random()*array.length)
        items[array[num]]=opponentIco; 
        drawGridItemHtml(); 
        sessionStorage.setItem('pcAlreadyPlay','true') 
    }      
} 
  
  