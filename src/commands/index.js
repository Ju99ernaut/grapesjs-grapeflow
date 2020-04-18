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
  cm.add(cmdClear, e => confirm(txtConfirm) && e.runCommand('core:canvas-clear'));
  cm.add(cmdLaunch, e => confirm(txtConfirm) && e.runCommand('core:canvas-clear'));
}