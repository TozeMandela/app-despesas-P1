function actualize(){
    let id = document.querySelector('.actua').dataset.id;
    Cadastrar(id);
}

function Cadastrar (id = undefined, isNotSearch = true)  {   
    let obj = {};
    let $El = document.querySelectorAll('input, select');
    if(id) obj.id = id + 1;

    if(!validatorFields($El) && isNotSearch) return;

    $El.forEach(field => {
       obj[field.id] = field.value;
    });
    
    obj.id = (obj.id == undefined || obj.id == null) ? Despesa.geraId() : obj.id;

    if(!isNotSearch){
    console.log(obj)
    return obj;
    }

    if(isNotSearch){
        new Despesa().addLocalStorage(new Despesa(
        obj.id, 
        obj.ano,
        addzero(obj.mes), 
        addzero(obj.dia), 
        obj.tipo, 
        obj.descricao,
        obj.valor
        ),id);

   if(id==undefined){
            alert('despesa salva com sucesso');
        }else{
            location.reload()
            alert('despesa actualizada com sucesso');
        }
        clearEl($El) 
    }
        
        
}

function clearEl (el){
    el.forEach(el => {
        el.value = ''        
    });
}

function validatorFields(El, forValidator){
    let isValid = true;
    let date = new Date()
    if(forValidator){
        El.forEach(field => {

        if(field.id === 'ano'){
           if(!field.value) field.value = date.getFullYear();
        } 

        if(field.id === 'mes'){
            if(!field.value) field.value = date.getMonth()+1; 
        }

        if(field.id === 'tipo'|| field.id === 'valor'){
            if(!field.value) isValid = false;
        }
     });
     if(!isValid) 
     alert('preencha os campos tipo & valor');
}
     return isValid;
}

function createTr(){
    let tr = document.createElement('tr');
    return tr
}

function addzero(elemento){
    elemento = elemento < 10 ? `0${elemento}` : elemento;
    return elemento;
}

function listView (user){

    let tbody = document.querySelector('#tbody');
    tbody.innerHTML = '';
    user.forEach(el => {
        let tr = createTr();
        tr.innerHTML = `
        <td>${el._dia} / ${el._mes}/ ${el._ano}</td>
        <td>${el._tipo}</td>
        <td>${el._descricao}</td>
        <td>${el._valor}</td>
        <td>
        <button data-id="${el._id}"  class="btn btn-danger del">excluir</button>
        <button data-id="${el._id}" class="btn btn-primary edit">editar</button>
        </td>
                `;
        tbody.appendChild(tr);
    });

    eventBtnDelEdit();
}

function eventBtnDelEdit(){

    let el = document.querySelector('#tbody');
    
    document.querySelectorAll('#tbody .del').forEach(ele =>{

        ele.addEventListener('click', function(){

            let index = this.dataset.id.replace('0','') - 1;
            let tr = el.rows[index];
            Despesa.remove(index);
            tr.remove();
            
            Despesa.actualizeId();  
         })
    });

    document.querySelectorAll('#tbody .edit').forEach(ele =>{

        ele.addEventListener('click', function(){
           
        Despesa.actualizeId(); 
        let index = this.dataset.id.replace('0','') - 1;
        
        let despesa = Despesa.findOne(index)
        document.querySelector('.actua').dataset.id = index;
        document.querySelectorAll('input, select').forEach(element => {
            
            for(key in despesa){
               
                if(key.replace('_','')==element.id) {
                    if(element.id === 'mes') {
                        element.value = despesa[key].replace('0','');
                    }else{
                        element.value = despesa[key];
                    }
                }
            }
         })
        });  
    });

    

}

function search(){

    let despFiltered = filterEl(Despesa.getAllData(), Cadastrar(undefined, false));
    listView (despFiltered)
}

function filterEl(objs, obj){

    if(obj.ano !== ''){
        objs = objs.filter(d =>{
            return d._ano == obj.ano;
        }) 
    }
    if(obj.mes !== ''){
        objs = objs.filter(d =>{
            return d._mes == addzero(obj.mes)
        }) 
    }
    if(obj.dia !== ''){
        objs = objs.filter(d =>{
            return d._dia == addzero(obj.dia)
        }) 
    }
    if(obj.tipo !== ''){
        objs = objs.filter(d =>{
            return d._tipo == obj.tipo
        }) 
    }
    if(obj.descricao !== ''){
        objs = objs.filter(d =>{
            return d._descricao == obj.descricao
        }) 
    }
    if(obj.valor !== ''){
        objs = objs.filter(d =>{
            return d._valor == obj.valor
        }) 
    }

    return objs;
} 


