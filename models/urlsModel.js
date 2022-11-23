export default class UrlModel {
    constructor() {
        this.searchUrls = [] 
    }
    init = async () => {
        return await axios.get('https://sheetdb.io/api/v1/h62awsnm53okw?sheet=search_sites')
            .then(response => response.data)
            .then(data => {
                this.searchUrls = data;
            })
            .catch(err => {
                this.searchUrls = ['initial'];
                console.error(`Could not get preference: ${err}`)
            })
            
    }
    getAll(){
        return this.searchUrls;
    }
    bindUrlsChanged(callback) {
        this.onUrlsChanged = callback
    }

    _commit(searchUrls_) {
        this.onUrlsChanged(searchUrls_) //show changed on ui
        axios.delete('https://sheetdb.io/api/v1/h62awsnm53okw/all?sheet=search_sites');
        axios.post('https://sheetdb.io/api/v1/h62awsnm53okw?sheet=search_sites', {
            "data": searchUrls_ });  //post changed to storage
    }

    addUrls(url) {
        const urlObj = {
            id: this.searchUrls.length > 0 ? parseInt(this.searchUrls[this.searchUrls.length - 1].id) + 1 : 1,
            urls: url,
        }

        this.searchUrls.push(urlObj)
        this._commit(this.searchUrls)
    }

    deleteUrls(id) {
        this.searchUrls = this.searchUrls.filter(t => parseInt(t.id) !== id)
        this._commit(this.searchUrls)
    }

}
