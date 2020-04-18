class Interactions {
    constructor(editor) {
        this.editor = editor;
        this.isShowing = true;
        this.buildInteractionsEditor();
    }

    findPanel() {
        const pn = this.editor.Panels
        const id = 'views-container'
        return pn.getPanel(id) || pn.addPanel({
            id
        })
    }

    buildInteractionsEditor() {
        const panel = this.findPanel()
        this.interactionsPanel = document.createElement('div')
        this.interactionsPanel.classList.add('code-panel')
        const n = document.createElement('div')
        n.style.textAlign = 'center'
        n.style.fontSize = '.75rem'
        n.style.fontFamily = 'Helvetica,sans-serif'
        n.style.fontWeight = 'lighter'
        n.innerHTML = "Not Yet Available"
        this.interactionsPanel.appendChild(n)
        panel.set('appendContent', this.interactionsPanel).trigger('change:appendContent')
        return this.interactionsPanel;
    }

    showInteractionsPanel() {
        this.isShowing = true
        this.interactionsPanel.style.display = 'block'
    }

    hideInteractionsPanel() {
        if (this.interactionsPanel) this.interactionsPanel.style.display = 'none'
        this.isShowing = false
    }
}

export default Interactions;