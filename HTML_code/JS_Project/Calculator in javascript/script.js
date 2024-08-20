let string='';
let button=document.querySelectorAll('button');
Array.from(button).forEach((item)=>{
    item.addEventListener('click',(e)=>{
        if(e.target.innerHTML=='='){
            string=eval(string);
            document.getElementById('input').value=string;
        }else if(e.target.innerHTML=='C'){
            string='';
            document.getElementById('input').value=string;
        }
        else{
            string+=e.target.innerHTML;
            document.getElementById('input').value=string; 
        }    
        
    })
})