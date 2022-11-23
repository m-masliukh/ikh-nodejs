

export default class TermView {
    constructor() {
        this.app = this.getElement('#termDiv')
        this.form = this.getElement('#termForm')
        this.input = this.getElement('#termInput')
        this.submitButton = this.getElement("#addTermBtn")
        this.terms = this.getElement('#term-list')
        
        
        this._temporaryTermText = ''
        this._initLocalListeners()
    }

    get _termText() {
        return this.input.value
    }

    _resetInput() {
        this.input.value = ''
    }

    createElement(tag, className) {
        const element = document.createElement(tag)

        if (className) element.classList.add(className)

        return element
    }

    getElement(selector) {
        const element = document.querySelector(selector)

        return element
    }

    displayTerms(terms_) {
        
        while (this.terms.firstChild) {
            this.terms.removeChild(this.terms.firstChild)
        }
        
        if (terms_?.length === 0) {
            const p = this.createElement('p')
            p.textContent = 'Немає пошукових слів! Хотіли б додати?'
            this.terms.append(p)
        } else {
            // Create nodes
            terms_?.forEach(t => {
                const li = this.createElement('li')
                li.id = t.id
                const span = this.createElement('span')
                span.contentEditable = true
                span.classList.add('editable')
                span.textContent = t.terms
      

                const deleteButton = this.createElement('button', 'delete')
                deleteButton.textContent = 'Видалити'
                li.append(span, deleteButton)

                // Append nodes
                this.terms.append(li)
            })
        
    }
    }

    _initLocalListeners() {
        this.terms.addEventListener('input', event => {
            if (event.target.className === 'editable') {
                this._temporaryTermText = event.target.innerText
            }
        })
    }

    bindAddTerms(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault()

            if (this._termText) {
                handler(this._termText)
                this._resetInput()
            }
        })
    }

    bindDeleteTerms(handler) {
        this.terms.addEventListener('click', event => {
            if (event.target.className === 'delete') {
                const id = parseInt(event.target.parentElement.id)
                handler(id)
            }
        })
    }

    bindEditTerms(handler) {
        this.terms.addEventListener('focusout', event => {
            if (this._temporaryTermText) {
                const id = parseInt(event.target.parentElement.id)
                
                handler(id, this._temporaryTermText)
                this._temporaryTermText = ''
            }
        })
    }

}

