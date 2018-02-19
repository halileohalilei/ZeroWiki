/* global document chrome */

const selectedMirrorKey = 'selectedMirror';

const mirrorNames = ['0wikipedia.org', 'wikizero.com', 'wikiwand.com', 'wikipedi0.org'];

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
      mirrorOption.selected = true;
    }
  });
  setSelectedMirror(selectedMirrorName);
});

document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.getElementById('dropdown');
  if (dropdown) {
    // $FlowFixMe
    mirrorNames.forEach((mirrorName) => {
      const mirrorOption = document.createElement('option');
      mirrorOption.value = mirrorName;
      mirrorOption.innerHTML = mirrorName;
      dropdown.appendChild(mirrorOption);
    });

    dropdown.addEventListener('change', () => {
      selectedMirrorName = dropdown.value;
      setSelectedMirror(selectedMirrorName);
      // $FlowFixMe
      const data = {};
      data[selectedMirrorKey] = dropdown.value;
      chrome.storage.local.set(data, () => {
        if (chrome.runtime.error) {
          console.log(chrome.runtime.error);
        }
      });
    });
  }
});
