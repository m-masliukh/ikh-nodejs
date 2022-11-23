export default class NewsList{
    _news = [];
    
    constructor(){
        this._news = new Array();
    }
    
    get items(){
        if(this._news === ""){
            throw new Error('Не знайдено пропозицій новин');
        }
        return this._news;
    }
    set items(value){
        this._news = value; 
    }

    removeDuplicates(){
        var newArray = [];
        var lookupObject  = {};

        for(var i in this._news) {
            lookupObject[this._news[i]['link']] = this._news[i];
        }

        for(i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        this._news = newArray;
    }
    getNewsListItem(i){
        return this._news[i];
    }

}