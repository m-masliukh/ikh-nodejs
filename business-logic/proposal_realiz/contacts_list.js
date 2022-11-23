import { findAll } from "../controllers/contact.controller";

export default class contacts_list{
    _contacts = null;
    
    constructor(){
        //this._contacts = findAll();
    }

    getInstance() {
        if (this._contacts == null) {
            this._contacts = findAll();
        }
        return this._contacts;
    }

    addValuesToDatatlist(id){
        var datalist = document.getElementById(id);
        
        this.contacts.array.forEach(element => {
            var option = document.createElement('option');
            option.value = element;
            datalist.appendChild(option.name);
        });
    }
}