export default class TermModel {
    constructor() {
        this.searchTerms = [] 
    }
    init = async () => {
        return await axios.get('https://sheetdb.io/api/v1/2yrgha5d1g1ba?sheet=search_words')
            .then(response => response.data)
            .then(data => {
                this.searchTerms = data;
            })
            .catch(err => {
                this.searchTerms = ['initial'];
                console.error(`Could not get preference: ${err}`)
            })
            
    }
    getAll(){
        return this.searchTerms;
    }
    bindTermsChanged(callback) {
        this.onTermsChanged = callback
    }

    _commit(searchTerms_) {
        this.onTermsChanged(searchTerms_) //show changed on ui
        axios.delete('https://sheetdb.io/api/v1/2yrgha5d1g1ba/all?sheet=search_words');
        axios.post('https://sheetdb.io/api/v1/2yrgha5d1g1ba?sheet=search_words', {
            "data": searchTerms_ });  //post changed to storage
    }

    addTerms(term) {
        const termObj = {
            id: this.searchTerms.length > 0 ? parseInt(this.searchTerms[this.searchTerms.length - 1].id) + 1 : 1,
            terms: term,
        }

        this.searchTerms.push(termObj)
        this._commit(this.searchTerms)
    }

    editTerms(id, updatedText) {
        this.searchTerms = this.searchTerms.map(t =>
            parseInt(t.id) === parseInt(id) ? { id: parseInt(t.id), terms: updatedText} : t
        )
        this._commit(this.searchTerms)
    }

    deleteTerms(id) {
        this.searchTerms = this.searchTerms.filter(t => parseInt(t.id) !== id)
        this._commit(this.searchTerms)
    }

}
