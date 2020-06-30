import {
    pfx,
    timingFunctions
} from '../consts';

export default (editor, sm) => {
    const typeSelect = sm.getType('base'); //base to allow custom animations
    const propModel = typeSelect.model;

    sm.addType('timing-function', {
        model: propModel,
        view: typeSelect.view.extend({
            templateInput() {
                return `<div id="${pfx}sm-tm-input-holder" class="blc-form-group"></div>`;
            },
            updateOptions() {
                this.input = null;
                this.onRender();
            },
            onRender() {
                const options = timingFunctions;

                if (!this.input) {
                    let optionsStr = '';

                    options.forEach(option => {
                        optionsStr += `<option value="${option}">${option}</option>`
                    });

                    const inputH = this.el.querySelector(`#${pfx}sm-tm-input-holder`);
                    inputH.innerHTML = `<input style="background: var(--input-background)"
                    list="timing-functions" class="blc-form-field" placeholder="ease">
                    <datalist id="timing-functions">${optionsStr}</datalist>
                    <span class="function-thumbnail fa fa-sliders" style="width:30px" onclick="openCurve(event);"></span>`;
                    //`<input list="animations" type="text" placeholder="animation-name">
                    //<datalist id="animations">${optGroupStr}</datalist>`;
                    this.input = inputH.firstChild;
                }
            }
        })
    })
};