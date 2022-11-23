import { findAll } from "../controllers/contact.controller";

export default class contacts_list{
    constructor(){
        this.contacts = findAll();
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