
export default class UrlView {
    constructor() {
        this.app = this.getElement('#urlDiv')
        this.form = this.getElement('#urlForm')
        this.input = this.getElement('#urlInput')
        this.submitButton = this.getElement("#addUrlBtn")
        this.urls = this.getElement('#url-list')
        
        
        this._temporaryUrlText = ''
        this._initLocalListeners()
    }

    get _urlText() {
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

    displayUrls(urls_) {
        
        while (this.urls.firstChild) {
            this.urls.removeChild(this.urls.firstChild)
        }
        
        if (urls_?.length === 0) {
            const p = this.createElement('p')
            p.textContent = 'Немає пошукових слів! Хотіли б додати?'
            this.urls.append(p)
        } else {
            // Create nodes
            urls_?.forEach(t => {
                const li = this.createElement('li')
                li.id = t.id
                const span = this.createElement('span')
                const link = this.createElement("a");
                link.setAttribute('href', `${t.urls}`);
                link.textContent = t.urls;
                span.appendChild(link);
                span.contentEditable = false
                
                const deleteButton = this.createElement('button', 'delete')
                deleteButton.textContent = 'Видалити'
                li.append(span, deleteButton)

                // Append nodes
                this.urls.append(li)
            })
        
    }
    }

    _initLocalListeners() {
        this.urls.addEventListener('input', event => {
            if (event.target.className === 'editable') {
                this._temporaryUrlText = event.target.innerText
            }
        })
    }

    bindAddUrls(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault()

            if (this._urlText) {
                handler(this._urlText)
                this._resetInput()
            }
        })
    }

    bindDeleteUrls(handler) {
        this.urls.addEventListener('click', event => {
            if (event.target.className === 'delete') {
                const id = parseInt(event.target.parentElement.id)
                handler(id)
            }
        })
    }

}

