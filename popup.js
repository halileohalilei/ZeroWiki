/* global document chrome */

const selectedMirrorKey = 'selectedMirror';

const mirrorNames = chrome.extension.getBackgroundPage().getAllMirrorsNames()

function setSelectedMirror(mirrorName) {
  chrome.extension.getBackgroundPage().setSelectedMirror(mirrorName);
}

let selectedMirrorName;

chrome.storage.local.get(selectedMirrorKey, (data) => {
  selectedMirrorName = data[selectedMirrorKey];
  if (!selectedMirrorName) {
    [selectedMirrorName] = mirrorNames;
    const mirrorData = {};
    mirrorData[selectedMirrorKey] = selectedMirrorName;
    chrome.storage.local.set(mirrorData);
  }

  const dropdown = document.getElementById('dropdown');
  dropdown.childNodes.forEach((mirrorOption) => {
    if (mirrorOption.value === selectedMirrorName) {
      // eslint-disable-next-line no-param-reassign
      mirrorOption.checked='checked';
    }
  });
  setSelectedMirror(selectedMirrorName);
});

document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.getElementById('dropdown');
  if (dropdown) {
    // $FlowFixMe
    mirrorNames.forEach((mirrorName) => {
      // <input type="radio" name="gender" value="male" checked> Male<br>
      const mirrorOption = document.createElement('input');
      mirrorOption.type = 'radio';
      mirrorOption.name = 'wiki';
      mirrorOption.value = mirrorName;

      const mirrorLabel = document.createElement('label');
      mirrorLabel.innerHTML = mirrorName;

      dropdown.appendChild(mirrorOption);
      dropdown.appendChild(mirrorLabel);
      dropdown.appendChild(document.createElement('br'));

    });

    dropdown.addEventListener('change', () => {

      document.getElementsByName('wiki').forEach((radio)=> {

        if(radio.checked) {

          selectedMirrorName = radio.value;
          setSelectedMirror(selectedMirrorName);
          // $FlowFixMe
          const data = {};
          data[selectedMirrorKey] = radio.value;
          chrome.storage.local.set(data, () => {
            if (chrome.runtime.error) {
              console.log(chrome.runtime.error);
            }
          });
        }
      })
    });
  }
});
