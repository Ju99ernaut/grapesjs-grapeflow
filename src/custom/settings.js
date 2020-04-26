class Settings {
    constructor() {
        const fs = editor.StorageManager.get('flow-storage');
        this.settings = {
            name: '',
            description: '',
            preview: '',
            multipage: false,
            customDomain: false,
            customDomainUrl: '',
            domain: '',
            public: false,
            market: false,
            branding: true
        };
        const clbErr = err => {
            console.error("Failed to load settings...");
            //console.error(err);
        };
        fs.viewProject(res => {
            //todo init settings
            this.settings.name = res.name;
            this.settings.description = res.description;
            this.settings.preview = res.preview;
            this.settings.multipage = res.multipage;
            this.settings.customDomain = res.customDomain;
            this.settings.customDomainUrl = res.customDomainUrl;
            this.settings.domain = res.domain;
            this.settings.public = res.public;
            this.settings.market = res.market;
            this.settings.branding = res.branding;
            this.buildSettings();
            console.log("Settings loaded");
        }, clbErr);
    }

    buildSettings() {
        let cont = document.createElement('div');
        const properties = [{
                name: 'name',
                label: 'Name <i class="fa fa-info-circle"></i>',
                placeholder: 'eg. title',
                radio: false
            },
            {
                name: 'description',
                label: 'Description <i class="fa fa-info-circle"></i>',
                placeholder: 'eg. description',
                radio: false
            },
            {
                name: 'preview',
                label: 'Preview <i class="fa fa-link"></i>',
                placeholder: 'eg. http://example.com',
                radio: false
            },
            {
                name: 'multipage',
                label: 'Multipage <i class="fa fa-question-circle"></i>',
                placeholder: 'eg. True',
                radio: true
            },
            {
                name: 'customDomain',
                label: 'Custom Domain <i class="fa fa-question-circle"></i>',
                placeholder: 'eg. True',
                radio: true
            },
            {
                name: 'customDomainUrl',
                label: 'Custom Domain Url <i class="fa fa-link"></i>',
                placeholder: 'eg. http://example.com',
                radio: false
            },
            {
                name: 'domain',
                label: 'Domain Name <i class="fa fa-info-circle"></i>',
                placeholder: 'eg. domain',
                radio: false
            },
            {
                name: 'public',
                label: 'Public <i class="fa fa-question-circle"></i>',
                placeholder: 'eg. True',
                radio: true
            },
            {
                name: 'market',
                label: 'Market <i class="fa fa-question-circle"></i>',
                placeholder: 'eg. True',
                radio: true
            },
            {
                name: 'branding',
                label: 'Branding <i class="fa fa-question-circle"></i>',
                placeholder: 'eg. True',
                radio: true
            },
        ];
        for (let prop in properties) {
            const iField = document.createElement('div');
            iField.className += "gjs-field";
            iField.style.margin = "5px 5px 10px 5px";
            const i = document.createElement('i');
            const label = document.createElement('div');
            label.innerHTML = properties[prop].label;
            label.style.marginLeft = "8px";
            label.style.fontSize = "14px";
            const input = properties[prop].name == 'description' ? document.createElement('textarea') : document.createElement('input');
            input.placeholder = properties[prop].placeholder;
            input.name = properties[prop].name;
            if (properties[prop].radio) {
                iField = document.createElement('label');
                iField.className += "gjs-field gjs-field-checkbox";
                iField.style.margin = "5px 5px 10px 10px";
                input.type = "checkbox";
                input.checked = this.settings[properties[prop].name];
                i.className += "gjs-chk-icon";
            } else
                input.value = this.settings[properties[prop].name];
            input.addEventListener('change', e => {
                let regexQuery = "^(https?|ftp)://[^\s/$.?#.[^\s*$@iS]";
                let regUrl = new RegExp(regexQuery, "i");
                //!regex not working
                if (e.target.value !== "" && e.target.type !== "checkbox") {
                    if (e.target.value.match(regUrl) !== null)
                        this.settings[e.target.name] = e.target.value;
                    else if (e.target.name != "preview" && e.target.name != "customDomainUrl")
                        this.settings[e.target.name] = e.target.value;
                    else {
                        console.warn("Invalid url");
                        e.target.value = "";
                    }
                } else
                    this.settings[e.target.name] = e.target.checked;
            });

            iField.appendChild(input);
            iField.appendChild(i);
            cont.appendChild(label);
            cont.appendChild(iField);
        }
        let b = document.createElement('button');
        b.id = "save-settings";
        b.innerHTML = '<i class="fa fa-link-cloud-upload"></i>Save Settings';
        b.style.margin = "10px 5px 10px 5px";
        b.className += "gjs-btn-prim";
        b.addEventListener('click', (e) => {
            const clb = (res) => {
                console.log("Settings updated...")
            }
            const clbErr = (err) => {
                console.error(err);
            }
            const fs = editor.StorageManager.get('flow-storage');
            //todo modify request, and ensure it is called if there are changes
            fs.storeProject(this.settings, clb, clbErr);
        });
        cont.appendChild(b);
        document.getElementById('settings').appendChild(cont);
    }
}

export default Settings;