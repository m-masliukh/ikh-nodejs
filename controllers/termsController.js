
 export default class TermController {
    constructor(model, view) {
        this.model = model
        this.view = view

        this.model.bindTermsChanged(this.onTermsChanged)
        this.view.bindAddTerms(this.handleAddTerms)
        this.view.bindEditTerms(this.handleEditTerms)
        this.view.bindDeleteTerms(this.handleDeleteTerms)

        this.onTermsChanged(this.model.searchTerms)
    }

    onTermsChanged = terms => {
        this.view.displayTerms(terms)
    }

    handleAddTerms = term => {
        this.model.addTerms(term)
    }

    handleEditTerms = (id, term) => {
        
        this.model.editTerms(id, term)
    }

    handleDeleteTerms = id => {
        this.model.deleteTerms(id)
    }
}

