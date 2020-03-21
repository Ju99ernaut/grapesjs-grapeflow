import openImport from './openImport';
import {
  cmdImport,
  cmdDeviceDesktop,
  cmdDeviceTablet,
  cmdDeviceMobile,
  cmdClear,
  cmdEdit,
  cmdLaunch,
} from './../consts';
import CodeEditor from './../code-editor'

export default (editor, config) => {
  const cm = editor.Commands;
  const txtConfirm = config.textCleanCanvas;
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
  cm.add(cmdEdit, {
    run: function (ed) {
      if (!codeEditor) codeEditor = new CodeEditor(ed)
      codeEditor.showCodePanel()
    },
    stop: function () {
      if (codeEditor) codeEditor.hideCodePanel()
    }
  });
  cm.add(cmdClear, e => confirm(txtConfirm) && e.runCommand('core:canvas-clear'));
  cm.add(cmdLaunch, e => confirm(txtConfirm) && e.runCommand('core:canvas-clear'));
}