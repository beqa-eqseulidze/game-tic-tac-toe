// import{beqa} from './main.js';
// console.log(beqa);

import {opponentIco} from './main.js'

// expline folowing function:
// "cpu" checks three lines, three columns and two diagonals  if in each of them are two same ico 
// "cpu" plays; if "cpu" has two same ico it plays the third same ico and wins round,
// if two same ico are player's in this case "cpu" plays own ico as the third ico and kills player's chance to win 

export function checkPotentialWinner(array,argFunction){
    let parentFunctionReturn=false;
    let soss=null;   

    function check_3_index(index1,index2,index3){
                if(array[index1]===array[index2] && array[index1]!=''){
                    if(array[index3]===''){
                        if(array[index1]===opponentIco){
                            array[index3]=opponentIco;
                            argFunction()     
                            sessionStorage.setItem('pcAlreadyPlay','true')
                            parentFunctionReturn=true;
                            return     
                        }else{ soss=index3 }
                    }
                }
                if(array[index1]===array[index3] && array[index1]!=''){
                    if(array[index2]===''){
                        if(array[index1]===opponentIco){
                            array[index2]=opponentIco;
                            argFunction()     
                            sessionStorage.setItem('pcAlreadyPlay','true')
                            parentFunctionReturn=true;
                            return     
                        }else{ soss=index2 }
                    }
                }
                if(array[index2]===array[index3] && array[index2]!=''){
                    if(array[index1]===''){
                        if(array[index2]===opponentIco){
                            array[index1]=opponentIco;
                            argFunction()     
                            sessionStorage.setItem('pcAlreadyPlay','true')
                            parentFunctionReturn=true;
                            return     
                        }else{ soss=index1}
                    }
                }
    }

    if(!parentFunctionReturn){ check_3_index(0,1,2);  //check first line
        }else{ return; }

    if(!parentFunctionReturn){ check_3_index(3,4,5);  // check second line
        }else{ return; }

    if(!parentFunctionReturn){ check_3_index(6,7,8);  // check third line
        }else{ return; }

    if(!parentFunctionReturn){ check_3_index(0,3,6);  // check first column
        }else{ return; }

    if(!parentFunctionReturn){ check_3_index(1,4,7);  // check second column
        }else{ return; }

    if(!parentFunctionReturn){ check_3_index(2,5,8);  // check third column
        }else{ return; }

    if(!parentFunctionReturn){ check_3_index(0,4,8);  // check diagonal first
        }else{ return; }

    if(!parentFunctionReturn){ check_3_index(2,4,6);  // check diagonal second
        }else{ return; }
    
    if(soss!=null){
        array[soss]=opponentIco;
        argFunction()
        sessionStorage.setItem('pcAlreadyPlay','true') 
             return  
        }
}

