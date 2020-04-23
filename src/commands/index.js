import openImport from './openImport';
import {
  cmdImport,
  cmdDeviceDesktop,
  cmdDeviceTablet,
  cmdDeviceMobile,
  cmdClear,
  cmdInteractions,
  cmdEdit,
  cmdSave,
  cmdLaunch,
} from './../consts';
import CodeEditor from './../code-editor'
import Interactions from './../interactions'

export default (editor, config) => {
  const cm = editor.Commands;
  const txtConfirm = config.textCleanCanvas;
  let interactions = null;
  let codeEditor = null;
  let modal = editor.Modal;
  let mdlClass = 'gjs-mdl-dialog-sm';

  cm.add(cmdImport, openImport(editor, config));
  cm.add(cmdDeviceDesktop, {
    run: function (ed) {
      ed.setDevice('Desktop')
    },
    stop: function () {},
  });
  cm.add(cmdDeviceTablet, {
    run: function (ed) {
      ed.setDevice('Tablet')
    },
    stop: function () {},
  });
  cm.add(cmdDeviceMobile, {
    run: function (ed) {
      ed.setDevice('Mobile portrait')
    },
    stop: function () {},
  });
  cm.add(cmdInteractions, {
    run: function (ed) {
      if (!interactions) interactions = new Interactions(ed)
      interactions.showInteractionsPanel()
    },
    stop: function () {
      if (interactions) interactions.hideInteractionsPanel()
      //Open Style Manager
    }
  });
  cm.add(cmdEdit, {
    run: function (ed) {
      if (!codeEditor) codeEditor = new CodeEditor(ed)
      codeEditor.showCodePanel()
    },
    stop: function () {
      if (codeEditor) codeEditor.hideCodePanel()
      //Open Style Manager
    }
  });
  cm.add(cmdSave, {
    run: function (ed) {
      ed.store(res => {
        console.log("Saved...")
      });
    },
    stop: function () {}
  });
  cm.add(cmdClear, e => {
    var mdlDialog = document.querySelector('.gjs-mdl-dialog');
    mdlDialog.className += ' ' + mdlClass;
    infoContainer.style.display = 'block';
    modal.setTitle('<div>Canvas</div>');
    const div = document.createElement('div');
    div.innerHTML = "<div>Are you sure you want to clear the canvas?</div><br>";
    const b = document.createElement('button');
    b.className += "gjs-btn-prim";
    b.innerHTML = "Clear";
    b.addEventListener('click', () => {
      editor.runCommand('core:canvas-clear');
      editor.Modal.close();
      console.log("Canvas cleared...use 'undo' to undo");
    });
    div.appendChild(b);
    modal.setContent(div);
    document.getElementById('info-panel').style.display = "none";
    modal.open();
    modal.getModel().once('change:open', function () {
      mdlDialog.className = mdlDialog.className.replace(mdlClass, '');
    });
  });
  cm.add(cmdLaunch, e => {
    var mdlDialog = document.querySelector('.gjs-mdl-dialog');
    mdlDialog.className += ' ' + mdlClass;
    infoContainer.style.display = 'block';
    modal.setTitle('<div>Launch Settings</div>');
    const div = document.createElement('div');
    div.innerHTML = "<div>This is supposed to show some settings before publish, publish button should commit changes to website</div><br>";
    const b = document.createElement('button');
    b.className += "gjs-btn-prim";
    b.innerHTML = "Publish";
    b.addEventListener('click', () => {
      editor.Modal.close();
      console.log("Blast off");
    });
    div.appendChild(b);
    modal.setContent(div); //todo button styling
    document.getElementById('info-panel').style.display = "none";
    modal.open();
    modal.getModel().once('change:open', function () {
      mdlDialog.className = mdlDialog.className.replace(mdlClass, '');
    });
  });
  //cm.add(cmdClear, e => confirm(txtConfirm) && e.runCommand('core:canvas-clear'));
}