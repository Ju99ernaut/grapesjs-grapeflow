import Split from 'split.js';

const $ = document.getElementById.bind(document);

class CodeEditor {
    constructor(editor) {
        this.editor = editor;
        this.isShowing = true;
        this.properties = {
            category: '',
            name: '',
            description: '',
            preview: '',
            html: '',
            css: '',
            script: ''
        };
        this.buildCodePanel();
    }

    findPanel() {
        const pn = this.editor.Panels;
        const id = 'views-container';
        return pn.getPanel(id) || pn.addPanel({
            id
        });
    }

    /**
     * Triggered inside buildCodePanel
     * @param {String} type Code editor type ,html or css
     */
    buildCodeEditor(type) {
        let codeEditor = this.editor.CodeManager.getViewer('CodeMirror').clone();
        codeEditor.set({
            codeName: type === 'html' ? 'htmlmixed' : 'css',
            readOnly: false,
            theme: 'hopscotch',
            autoBeautify: true,
            autoCloseTags: true,
            autoCloseBrackets: true,
            styleActiveLine: true,
            smartIndent: true
        });
        return codeEditor;
    }

    /**
     * Triggered in buildCodePanel
     * @param {String} type 
     * @param {Object} editor 
     * @param {Object} textArea Text area DOM element 
     */
    buildSection(type, editor, textArea) {
        const section = document.createElement('section');
        section.innerHTML = `<div class="codepanel-separator">
        <div class="codepanel-label">${type}</div>
        <button class="gjs-btn-prim" id="cp-save-${type}"><i class="fa fa-link-floppy-o"></i>Save</button>
        </div>`;
        if (type == "html") {
            section.innerHTML = `<div class="codepanel-separator">
            <div class="codepanel-label">${type}</div>
            <button class="gjs-btn-prim" id="save-component"><i class="fa fa-link-floppy-o"></i>Save Component</button>
            <button class="gjs-btn-prim" id="cp-save-${type}"><i class="fa fa-link-floppy-o"></i>Save</button>
            </div>`;
        }
        section.appendChild(textArea);
        this.codePanel.appendChild(section);
        return section;
    }

    buildCodePanel() {
        const panel = this.findPanel();
        this.codePanel = document.createElement('div');
        this.codePanel.classList.add('code-panel');

        this.htmlCodeEditor = this.buildCodeEditor('html');
        this.cssCodeEditor = this.buildCodeEditor('css');
        const htmlTextArea = document.createElement('textarea');
        const cssTextArea = document.createElement('textarea');
        const sections = [
            this.buildSection('html', this.htmlCodeEditor, htmlTextArea),
            this.buildSection('css', this.cssCodeEditor, cssTextArea)
        ];
        panel.set('appendContent', this.codePanel).trigger('change:appendContent');
        this.htmlCodeEditor.init(htmlTextArea);
        this.cssCodeEditor.init(cssTextArea);
        this.updateEditorContents();

        $('cp-save-html').addEventListener('click', this.updateHtml.bind(this));
        $('cp-save-css').addEventListener('click', this.updateCss.bind(this));
        $('save-component').addEventListener('click', this.openAddModal.bind(this));

        Split(sections, {
            direction: 'vertical',
            sizes: [50, 50],
            minSize: 100,
            gutterSize: 2,
            onDragEnd: this.refreshEditors.bind(this)
        });

        this.editor.on('component:add', model => {
            this.updateEditorContents()
        });
        this.editor.on('component:remove', model => {
            this.updateEditorContents()
        });
        this.editor.on('component:update', model => {
            this.updateEditorContents()
        });

        return this.codePanel;
    }

    showCodePanel() {
        this.isShowing = true;
        this.updateEditorContents();
        this.codePanel.style.display = 'block';
        // make sure editor is aware of width change after the 300ms effect ends
        setTimeout(this.refreshEditors.bind(this), 320);
        this.editor.$('.gjs-pn-views-container').get(0).style.width = '35%';
        this.editor.$('.gjs-cv-canvas').get(0).style.width = '65%';
    }

    hideCodePanel() {
        if (this.codePanel) this.codePanel.style.display = 'none';
        this.editor.$('.gjs-pn-views-container').get(0).style.width = '15%';
        this.editor.$('.gjs-cv-canvas').get(0).style.width = '85%';
        this.isShowing = false;
    }

    refreshEditors() {
        this.htmlCodeEditor.editor.refresh();
        this.cssCodeEditor.editor.refresh();
    }

    updateHtml() {
        const htmlCode = this.htmlCodeEditor.editor.getValue();
        if (!htmlCode || htmlCode === this.previousHtmlCode) return;
        this.previousHtmlCode = htmlCode;
        this.editor.setComponents(htmlCode);
        const component = this.editor.getSelected();
        const coll = component.collection;
        const at = coll.indexOf(component);
        coll.remove(component);
        coll.add(htmlCode, {
            at
        });
        //?this.editor.getSelected().components(htmlCode); method duplicates components
        console.log("Component html updated");
    }

    updateCss() {
        const cssCode = this.cssCodeEditor.editor.getValue();
        if (!cssCode || cssCode === this.previousCssCode) return;
        this.previousCssCode = cssCode;
        //this.editor.setStyle(cssCode)
        const cc = this.editor.CssComposer;
        const selectorRules = cssCode.split(/(?<=}\n)/g);
        for (let pair in selectorRules) {
            let rulePair = selectorRules[pair].split(/(?={)/g);
            //? selector eg. #id, rule eg. {color: 'red'}
            cc.setRule(rulePair[0], rulePair[1].replace("{", ""));
        }
        console.log("Component css rules updated");
    }

    updateEditorContents() {
        if (!this.isShowing) return;
        const component = this.editor.getSelected();
        if (component !== undefined) {
            this.htmlCodeEditor.setContent(component.toHTML());
            this.cssCodeEditor.setContent(this.editor.CodeManager.getCode(component, 'css', {
                cssc: this.editor.CssComposer
            }));
        }
        //this.htmlCodeEditor.setContent(this.editor.getHtml())
        //this.cssCodeEditor.setContent(this.editor.getCss({
        //  avoidProtected: true
        //}))
    }

    openAddModal() {
        const modal = editor.Modal;
        //const mdlClass = 'gjs-mdl-dialog-sm';
        //var mdlDialog = document.querySelector('.gjs-mdl-dialog');
        //mdlDialog.className += ' ' + mdlClass;
        infoContainer.style.display = 'block';
        modal.setTitle('<div>Save Template</div>');
        modal.setContent(this.buildAddModal());
        document.getElementById('info-panel').style.display = "none";
        modal.open();
        modal.getModel().once('change:open', function () {
            //mdlDialog.className = mdlDialog.className.replace(mdlClass, '');
            document.getElementById('info-panel').style.display = "none";
        });
    }

    buildAddModal() {
        const cont = document.createElement('div');
        cont.className += "gjs-export-dl";
        const left = document.createElement('div');
        left.className += "gjs-cm-editor-c";
        const right = document.createElement('div');
        right.className += "gjs-cm-editor-c";
        const properties = [{
                name: 'category',
                label: 'Category <i class="fa fa-info-circle"></i>',
                placeholder: 'eg. card'
            },
            {
                name: 'name',
                label: 'Name <i class="fa fa-info-circle"></i>',
                placeholder: 'eg. name'
            },
            {
                name: 'description',
                label: 'Description <i class="fa fa-info-circle"></i>',
                placeholder: 'eg. description'
            },
        ];
        for (let prop in properties) {
            const iField = document.createElement('div');
            iField.className += "gjs-field";
            iField.style.margin = "5px 5px 10px 5px";
            const label = document.createElement('div');
            label.innerHTML = properties[prop].label;
            label.style.marginLeft = "8px";
            label.style.fontSize = "16px";
            const input = document.createElement('input');
            if (properties[prop].name == 'description') {
                input = document.createElement('textarea');
                input.style.minHeight = "330px";
            } else
                iField.style.maxWidth = "100%";
            input.placeholder = properties[prop].placeholder;
            input.name = properties[prop].name;
            //input.value = this.properties[properties[prop].name];
            input.addEventListener('change', e => {
                if (e.target.value !== "")
                    this.properties[e.target.name] = e.target.value;
            });

            iField.appendChild(input);
            left.appendChild(label);
            left.appendChild(iField);
        }
        const iField = document.createElement('div');
        iField.className += "gjs-field";
        iField.style.margin = "5px 5px 10px 5px";
        const label = document.createElement('div');
        label.innerHTML = 'Preview <i class="fa fa-camera"></i>';
        label.style.marginLeft = "8px";
        label.style.fontSize = "16px";
        const pr = document.createElement('textarea');
        pr.style.minHeight = "446px";
        iField.appendChild(pr);
        right.appendChild(label);
        right.appendChild(iField);
        const b = document.createElement('button');
        b.id = "save-template";
        b.innerHTML = '<i class="fa fa-link-cloud-upload"></i>Save Template';
        b.style.margin = "10px 5px 0px 5px";
        b.style.float = "right";
        b.className += "gjs-btn-prim";
        b.addEventListener('click', (e) => { //todo ensure request is called if there are changes
            const clb = (res) => {
                console.log("Block saved...");
            }
            const clbErr = (err) => {
                console.error(err);
            }
            const fs = editor.StorageManager.get('flow-storage');
            fs.storeBlock(this.properties, clb, clbErr);
        });
        cont.appendChild(left);
        cont.appendChild(right);
        cont.appendChild(b);
        return cont;
    }
}

export default CodeEditor;