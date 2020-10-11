


function user_info (char_obj, value_add=10){

    console.log('hi')
    let name = char_obj.name
    //change the max and level cause it the person level
    let max_value = char_obj.data.data.details.xp.max
    let current_value = char_obj.data.data.details.xp.value
    let value_bar = ((current_value/max_value) * 100).toFixed(1)
    let amount =    ((value_add/ max_value) * 100).toFixed(1)
    let html_in = `
        <style> 
            .position_col {
            display:flex !important;
            flex-direction:row ;
            background-color:gray !important;
            min-width : 250px;
            
            
        }
        .info {
            
            display:flex !important;
            flex-direction:row ;
            justify-content: space-between;
            
        }
        
        .main {
            
            display:flex !important;
            flex-direction:col ;
            justify-content: space-around !important;
            align-items: center !important;
            
            
        }
        .img_container{
        display:flex !important;
        max-width : 20%;
        max-height : 20%
            
        }
                
        .info_container{
        display:flex !important;
         max-width : 80% !important;
 
                

        }
        
        .img_fit{
            object-fit: contain; 



        }
        .b_len {
            width: 20px !important;
        }
        
        
        
        </style> 
    
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <div class="main" id='main_xp_char_${name}'>
            <div class="img_container">
                <img  class="img_fit" src="${char_obj.data.img}"  width=60,  height=60 >
            </div>
            <div clas="info_container">
                <div class="info" id='char_remove_${name}'>
                    <h6 id='field_name'>${name}</h4>
                    <h6 id= 'field_xp' class='field_xp' style='color:#4b6da9'>+${value_add}XP</h6>
                    <h6 id='field_total_xp' class='field_total_xp'>${current_value}XP</h6>
                </div>
                <div class="position_col" >
                    <div id='value_bar'  class="w3-light-green value_bar" style="height:24px;width:${value_bar}%">${value_bar}%</div>
                    <div id='bar-change'  class="w3-light-blue bar-change" style="height:24px;width:${amount}%"></div>
                </div>
            </div> 
            
                <button class="b_len"  onclick="document.getElementById('main_xp_char_${name}').remove()"> &#10008; </div>  
                

                
            </div>


  
        </div>
            <script>
            console.log('creating')
            document.addEventListener('hello', function (event){\
            
            old_xp =  Array.from(document.getElementsByClassName("monster_xp_values")).map(d => parseInt(d.innerHTML.replace('XP',''))).reduce((a,b) => a +b, 0)
            
            event.detail.remove_button.remove()
            
            
            new_xp = Array.from(document.getElementsByClassName("monster_xp_values")).map(d => parseInt(d.innerHTML.replace('XP',''))).reduce((a,b) => a +b, 0)
      
            Array.from(document.getElementsByClassName('field_xp')).map(c => c.innerHTML = '+' + new_xp + 'XP')  
            
            Array.from(document.getElementsByClassName('bar-change')).map(c => c.style.width = (parseFloat(c.style.width) * new_xp)/old_xp   +'%')  
                    
            }
            )
              
            </script>
        
        `
        return html_in
        }

        
console.log(canvas.tokens.controlled.length);
function main(){
    if (canvas.tokens.controlled.length> 0 && canvas.tokens.controlled.map(s => s.actor.data.data.details.cr).length > 0) {
              
        let selected_tokens = []
      
        let value_xp_sum = canvas.tokens.controlled.reduce((sum_v,t) => t.actor.data.data.details.cr? sum_v + t.actor.data.data.details.xp.value: sum_v + 0 , 0) 
        console.log('SUM',value_xp_sum)
        canvas.tokens.controlled.forEach(t => t.actor.data.data.details.cr ? selected_tokens.push(`
        <style>
            .row_conf {
                display:flex !important;
                flex-direction:row !important;
                justify-content: space-between;
                align-items: center !important;
    
                
            }   
            
            .b_len {
                width: 20px !important;
            }
        </style>
        <div id='monster_${t.actor.name}'>
        <hr>
            <div class="row_conf" >
                <div>${t.actor.name}</div>
                <div id ='monster_${t.actor.name}' class="monster_xp_values">${t.actor.data.data.details.xp.value}XP</div>
         
    
                <button class="b_len" id='b_mon_dis' onclick="document.dispatchEvent( new CustomEvent('hello', {detail: {'remove_button':document.getElementById('monster_${t.actor.name}')}}));"> &#10008; </div>
                
                
            </div>
        </hr>
        </div>`): console.log('no monster'))
        
        
        let selected_html = `<h2>Monsters</h2><div>${selected_tokens.join('\n') }</div><h2>Players</h2><div>`
        let chars_xp = game.actors.entries.filter( n => n.isPC )
         
         
         
        
        let players_message = [] 
         for (const c_xp of chars_xp) {
          players_message.push(user_info(c_xp, value_xp_sum))
        }
            
        let d = new Dialog({
          title: 'Experience and Loot',
          content: selected_html + players_message.join('\n'),
          buttons: {
            ok: {
              icon: '<i class="fas fa-check"></i>',
              label: 'Ok',
              callback : (html) => {
                  
                  let list_value_bar = Array.from(html.find('#value_bar')).map(e =>  e.style.width)
                  let list_bar_change = Array.from(html.find('#bar-change')).map(e => e.style.width)

                  let list_names = Array.from(html.find('#field_name')).map(e => e.innerHTML.toUpperCase())
                  let list_xp = Array.from(html.find('#field_xp')).map(e => e.innerHTML.replace('XP','').replace('+',''))
                  let list_xp_total = Array.from(html.find('#field_total_xp')).map(e => e.innerHTML.replace('XP',''))
                  
                  function generate_html(name, xp, total,value_current, bar_change) {return `
                        <style>
                        .message_values {
                                 display:flex !important;
                                 flex-direction:row !important;
                                 justify-content: space-between;
                                       
            
                        }
                        
                    </style>
                    <div class='message_values'>
                    
                        <img src='http://msngroup.aimoo.com/atlantisthequestforpower/fetch.dll-action=MyPhotos_GetPubPhoto&PhotoID=nJAAAAJ8LcabV1Scvy!6kzhJhO9XovOFzjOnvYhS2ma7moNvgaoCrntr7KWqOIGoygZVgooBAfdQ.gif' width='6%'>
                        
                        
                        
                        <span>${name}</span>
                         
                    
                   
                        <span style='color:#4b6da9'>+${xp}XP </span> 
                        <div>(TOTAL: ${total})</div>
                        <div style='background-color:gray;height:10px;flex-direction:row;display:flex'>
                             <div style='background-color:#8cc34a;height:10px;width:${value_current}'></div>
                             <div style='background-color:#87ceeb; height:10px; width:${bar_change}'>  </div>
                        </div>
                      </div>
                        `}
                  
                  list_names.forEach((name, index)=>ChatMessage.create({ content:generate_html(name, list_xp[index], list_xp_total[index] , list_value_bar[index], list_bar_change[index])  }))
                  console.log(canvas.tokens.controlled.name)
                  console.log('list_names', list_names)
                  canvas.tokens.controlled.map(n => {
                      console.log('CONSOLEEE', n.name)
                      if (list_names.includes(n.name.toUpperCase())){
                                    console.log('include', n.name)
                                    let id_remove =  `remove_effect_${n.name}` 
                                    let options = { x: n.x, y: n.y, name: id_remove };
                                    let effect_actor =  game.actors.getName('xp_effect')
                                    canvas.tokens.dropActor(effect_actor, options);
                                    
                                    
                                    async function remove_token (actor_remove){
                                        console.log('entrada!')
                                        await new Promise (resolve => setTimeout (resolve, 2000) );
                               
                                        let rm_filter = canvas.tokens.placeables.filter(t => t.name == id_remove)[0]
                                        rm_filter.delete()
                                        
                                    }
                                        
                                    remove_token(effect_actor)
                                        
                                        
                                    }
                                    
                                    
                                    
                        
                                    } )
                  
                  

                                      
                  console.log(list_names,list_xp , list_xp_total, list_value_bar, list_bar_change)
                  
                  
                  
              }
            },
          }
        }).render(true);
        
        }else{console.log('empty')}

}




main()

