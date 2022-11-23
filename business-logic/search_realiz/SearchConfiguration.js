export default class SearchConfiguration{
    _searchTerms = [];
    _searchSites = [];
    termsStr = [];
 
    get sitesStr(){
        return this.termsStr;
    }
    getTermString(){
        var termMap = {};
        this._searchTerms.forEach(t => {
            var key = t.type;
            var value = t.terms;

            if (key in termMap) {
                termMap[key].push(value);
            } else {
                termMap[key] = [value];
            }
        })
        for(const t in termMap){
            this.termsStr.push(termMap[t].toString());
        }
            
    }
    set searchTerms(value){
        this._searchTerms = value;
        this.getTermString();
    }
    
    getSearchTerms(ind){
        this.getTermString();
        
        return this.termsStr[parseInt(ind)];
    }
    set searchSites(value){
        this._searchSites.push(value);
    }

    get searchSites(){
        return this._searchSites;
    }
    getSearchSite(){
        return this._searchSites[1];
    }

}