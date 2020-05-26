import {
    pfx,
    animations
} from '../consts';

export default (editor, sm) => {
    const typeSelect = sm.getType('select');
    const propModel = typeSelect.model;

    sm.addType('animations-select', {
        model: propModel,
        view: typeSelect.view.extend({
            templateInput() {
                return `
                  <div class="${pfx}field ${pfx}select">
                    <span id="${pfx}input-holder"></span>
                    <div class="${pfx}sel-arrow">
                      <div class="${pfx}d-s-arrow"></div>
                    </div>
                  </div>
                `;
            },
            updateOptions() {
                this.input = null;
                this.onRender();
            },
            onRender() {
                const groups = animations;

                if (!this.input) {
                    let optGroupStr = '';

                    groups.forEach(group => {
                        let groupStyle = group.style ? group.style.replace(/"/g, '&quot;') : '';
                        let groupStyleAttr = groupStyle ? `style="${groupStyle}"` : '';
                        let groupLabel = group.label.replace(/"/g, '&quot;');
                        let optionsStr = '';
                        group.options.forEach(option => {
                            let name = option.name || option.value;
                            let style = option.style ? option.style.replace(/"/g, '&quot;') : '';
                            let styleAttr = style ? `style="${style}"` : '';
                            let value = option.value.replace(/"/g, '&quot;');
                            optionsStr += `<option value="${value}" ${styleAttr}>${name}</option>`;
                        });
                        optGroupStr += `<optgroup label="${groupLabel}" ${groupStyleAttr}>${optionsStr}</optgroup>`;
                    });

                    const inputH = this.el.querySelector(`#${pfx}input-holder`);
                    inputH.innerHTML = `<select>${optGroupStr}</select>`;
                    this.input = inputH.firstChild;
                }
            }
        })
    })
};