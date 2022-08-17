class Despesa {
    constructor(id, ano, mes, dia, tipo, descricao, valor){
        this._id = id; 
        this._ano = ano;
        this._mes = mes;
        this._dia = dia; 
        this._tipo = tipo; 
        this._descricao = descricao;
        this._valor = valor; 
    }

    static getAllData() {
        if(localStorage.getItem('cadastros') == null) 
        localStorage.setItem('cadastros',JSON.stringify([]));
    
        return JSON.parse(localStorage.getItem('cadastros'));
    
    }

    addLocalStorage(obj, id = undefined) {

        let add = Despesa.getAllData();

        if(id!==undefined){
            add[id] = obj;
        }else{
            add.push(obj);
        }
        
        localStorage.setItem('cadastros',JSON.stringify(add));
    }

    

    static findOne(id) {
    
        let dispesas = Despesa.getAllData();
        
        return dispesas[id];
    
    }
    
    static remove(id){

        let list = Despesa.getAllData();
        list.splice(id,1);
        localStorage.setItem('cadastros',JSON.stringify(list));

    }
    static geraId() {
    
        let lista = Despesa.getAllData();
        let id;
        if (lista.length == 0) id = 1;
    
        if(id == undefined) id = 1 + lista.length;
    
        return id;
    
    }

    static actualizeId() {
    
        let lista = Despesa.getAllData();;
        let i = 1;
        let aux = false;

        lista.forEach(el => {
            if(parseInt(el._id) > lista.length) aux = true;
        });

        if(aux){
                lista.forEach(element => {
                element._id = i;
                i++;
            });
        }
        localStorage.setItem('cadastros',JSON.stringify(lista));
    
    }
}