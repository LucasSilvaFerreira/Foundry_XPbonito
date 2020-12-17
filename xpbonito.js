

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
                    <h6 id='field_name' class='field_name'>${name}</h4>
                    <h6 id= 'field_xp' class='field_xp' style='color:#4b6da9'>+${value_add}XP</h6>
                    <h6 id='field_total_xp' class='field_total_xp'>${current_value}XP</h6>
                </div>
                <div class="position_col" >
                    <div id='value_bar'  class="w3-light-green value_bar" style="height:24px;width:${value_bar}%">${value_bar}%</div>
                    <div id='bar-change'  class="w3-light-blue bar-change" style="height:24px;width:${amount}%"></div>
                </div>
            </div> 
            
           
            
                <button class="b_len"  onclick="document.dispatchEvent( new CustomEvent('hello', {detail: {'remove_button':document.getElementById('main_xp_char_${name}')}}))"> &#10008; </div>  
                
          
            </div>


  
        </div>
            <script>
            console.log('creating')
            document.addEventListener('hello', function (event){\
            
            old_xp =  Array.from(document.getElementsByClassName("monster_xp_values")).map(d => parseInt(d.innerHTML.replace('XP',''))).reduce((a,b) => a +b, 0)
            
            event.detail.remove_button.remove()
            
            
            new_xp = Array.from(document.getElementsByClassName("monster_xp_values")).map(d => parseInt(d.innerHTML.replace('XP',''))).reduce((a,b) => a +b, 0)
            
            new_xp = parseInt(new_xp/Array.from(document.getElementsByClassName('field_xp')).length)
            
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
                <div class='monster_capture_name'>${t.actor.name}</div>
                <div id ='monster_${t.actor.name}' class="monster_xp_values">${t.actor.data.data.details.xp.value}XP</div>
         
    
                <button class="b_len" id='b_mon_dis' onclick="document.dispatchEvent( new CustomEvent('hello', {detail: {'remove_button':document.getElementById('monster_${t.actor.name}')}}));"> &#10008; </div>
                
                
            </div>
        </hr>
        </div>`): console.log('no monster'))
        
        
        let selected_html = `<h2>Monsters</h2><div>${selected_tokens.join('\n') }</div><h2>Players</h2><div>`
        let is_pc_selected_list = canvas.tokens.controlled.filter(s => s.actor.hasPlayerOwner).map(s => s.actor.name)
        let chars_xp = game.actors.entries.filter( n => n.hasPlayerOwner &&  is_pc_selected_list.indexOf(n.name) != -1)
        
         
         
        
        let players_message = [] 
         for (const c_xp of chars_xp) {
          players_message.push(user_info(c_xp, parseInt(value_xp_sum/chars_xp.length)))
        }
            
        let d = new Dialog({
          title: 'Experience and Loot',
          content: selected_html + players_message.join('\n'),
          buttons: {
            ok: {
              icon: '<i class="fas fa-check"></i>',
              label: 'Ok',
              callback : (html) => {
                  
                  
                  
                  
                  let monster_capture = Array.from(html.find('.monster_capture_name')).map(e =>  e.innerHTML)
                  let monster_array_to_items = canvas.tokens.controlled.filter(s => monster_capture.includes(s.name))
                  
                  
                  
                  
                  
                function compute_prob(p){
                    let v = Math.random() * 101
                    return  v <= p 
                    
                }
                
                
                let all_items = monster_array_to_items.map(token =>  token.actor.items.map( a => a.data.data.price? a : false  ).filter( f => f != false) )
                let prices = 0
                let all_item_prices = all_items.map(a => a.map(p => prices += p.data.data.price))
                
                //console.log(prices)
                //console.log(all_items.map(a => a.map(p => p.data.data.price)))
                
                function get_prob(v_prob){
                        if (v_prob < 100){
                          return compute_prob(40)
                        }
                        if (v_prob < 500){
                          return compute_prob(30)
                        }
                        
                        if (v_prob < 1000){
                          return compute_prob(15)  
                        }
                        
                         if (v_prob < 2500){
                          return compute_prob(10) 
                        }
                        if (v_prob < 5000){
                          return compute_prob(4)
                        }
                        
                        if (v_prob < 100000){
                          return compute_prob(1)
                        }
                } 
                
                let all_items_values = []
                
                all_items.map(a => a.map(p =>  get_prob(p.data.data.price)? all_items_values.push(p) : 1
                    
                    ))
                    
                
                console.log(all_items_values)
                console.log('==================================')
                  
                  
                  console.log(monster_capture)
                  
                  
                  let list_value_bar = Array.from(html.find('.value_bar')).map(e =>  e.style.width)
                  let list_bar_change = Array.from(html.find('.bar-change')).map(e => e.style.width)
    
                  let list_names = Array.from(html.find('.field_name')).map(e => e.innerHTML.toUpperCase())
                  let list_xp = Array.from(html.find('.field_xp')).map(e => e.innerHTML.replace('XP','').replace('+',''))
                  let list_xp_total = Array.from(html.find('.field_total_xp')).map(e => e.innerHTML.replace('XP',''))
                  console.log('html generating ', html.find('.field_name'))
                  
 
  
  
  
  
                let items_per_player = all_items_values.map( i =>  [i,  list_names[Math.floor(Math.random() * list_names.length)] ])  
                
                console.log('loot', items_per_player)
                
                
                
                console.log('==================================')
                  
                  
                  
                  
                  
                  
                  
                  function generate_html(name, xp, total,value_current, bar_change, items_loot) {return `
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
                        <div>${items_loot}<div>
                      </div>
                        `}
                  
                  
         
                  
                  list_names.forEach((name, index)=>
                                     {
                                         console.log('listnames  ' + name);
                                         let items = [];
               
items_per_player.filter( i => i[1] == name).map(s_i =>  items.push(`<br><div><h3>${s_i[0].name}</h3></div><div>Price:${s_i[0].data.data.price}</div><img src="${s_i[0].img}"width="40" height="40"></div>`) )
        
        
        
        
                                items = items.join('')
                                //.map( s_i => items.push('<br>'+s_i[0]+ '</br>'  )
              
                                         
                                         
                                ChatMessage.create({ content:generate_html(name, list_xp[index], list_xp_total[index] , list_value_bar[index], list_bar_change[index], items) })
                                
                                let char = game.actors.filter(p => p.name.toUpperCase() == name)[0]
                                char.update({'data.details.xp.value' :  char.data.data.details.xp.value  + parseInt(list_xp[index])})
                                
      
      
      
                                items_per_player.filter(i => i[1] == name).map(i_v => {
                                    console.log('inside', i_v[1])
                                    char.createOwnedItem(i_v[0].data)
                                     
                                    
                                    
                                    
                                }
                                
                                
                                ) 
      
                   
      
      
      

                
                                
                                })
                                
                  console.log(canvas.tokens.controlled.name)
                  console.log('list_names', list_names)
                  canvas.tokens.controlled.map(n => {
                      console.log('CONSOLEEE', n.name)
                      if (list_names.includes(n.name.toUpperCase())){
                                    console.log('include', n.name)
                                    let id_remove =  `remove_effect_${n.name}` 
                                    let options = { x: n.x, y: n.y, name: id_remove };
                                    let effect_actor =  game.actors.getName('xp_effect')
                                    // canvas.tokens.dropActor(effect_actor, options);
                                    
                                    
                                    // async function remove_token (actor_remove){
                                    //     console.log('entrada!')
                                    //     await new Promise (resolve => setTimeout (resolve, 2000) );
                               
                                    //     let rm_filter = canvas.tokens.placeables.filter(t => t.name == id_remove)[0]
                                    //     rm_filter.delete()
                                        
                                    // }
                                        
                                    // remove_token(effect_actor)
                                        
                                        
                                    }
                                    
                                    
                                    
                        
                                    } )
                  
                  

                                      
                  console.log(list_names, list_xp , list_xp_total, list_value_bar, list_bar_change)
                  
                  
                  
              }
            },
          }
        }).render(true);
        
        }else{console.log('empty')}

}




main()
