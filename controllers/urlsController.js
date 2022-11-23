 
 export default class UrlController {
    constructor(model, view) {
        this.model = model
        this.view = view

        this.model.bindUrlsChanged(this.onUrlsChanged)
        this.view.bindAddUrls(this.handleAddUrls)
        this.view.bindDeleteUrls(this.handleDeleteUrls)

        this.onUrlsChanged(this.model.searchUrls)
    }

    onUrlsChanged = urls => {
        this.view.displayUrls(urls)
    }

    handleAddUrls = url => {
        this.model.addUrls(url)
    }

    handleDeleteUrls = id => {
        this.model.deleteUrls(id)
    }
}


