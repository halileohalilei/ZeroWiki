/* global document chrome */

const selectedMirrorKey = 'selectedMirror';
const onOffKey = 'active';
const mirrorNames = chrome.extension.getBackgroundPage().getAllMirrorsNames()
let selectedMirrorName;

function setSelectedMirror(mirrorName) {
  chrome.extension.getBackgroundPage().setSelectedMirror(mirrorName);
}

function setOnOffTitle(value) {

  let message = !value
                ? chrome.i18n.getMessage("clickOnButtonMessage")
                : chrome.i18n.getMessage("clickOffButtonMessage");

  document.getElementsByClassName('switch')[0].title = message;
}

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('infoMirror').innerText = chrome.i18n.getMessage("dropdownText");
  document.getElementById('infoMirror').href = chrome.i18n.getMessage("wikipediaMirrorUrl");

  chrome.storage.local.get([selectedMirrorKey, onOffKey], (data) => {
    selectedMirrorName = data[selectedMirrorKey];

    const onoffbutton = document.getElementById('onoffbutton');
    const dropdown = document.getElementById('dropdown');

    onoffbutton.checked=data[onOffKey]

    setOnOffTitle(onoffbutton.checked)

  if (dropdown) {
    // $FlowFixMe
    mirrorNames.forEach((mirrorName) => {
      // <input type="radio" name="gender" value="male" checked> Male<br>
      const mirrorOption = document.createElement('input');
      mirrorOption.type = 'radio';
      mirrorOption.name = 'wiki';
      mirrorOption.value = mirrorName;
      mirrorOption.disabled = !onoffbutton.checked

      const mirrorLabel = document.createElement('label');
      mirrorLabel.innerHTML = mirrorName;

      dropdown.appendChild(mirrorOption);
      dropdown.appendChild(mirrorLabel);
      dropdown.appendChild(document.createElement('br'));

    });

    onoffbutton.addEventListener('change', () => {
      // Notify background of the update
      chrome.storage.local.set({"active": onoffbutton.checked}, ()=> {
        chrome.runtime.sendMessage({data:"refresh"})
      })

      setOnOffTitle(onoffbutton.checked)

      dropdown.querySelectorAll("input").forEach((input)=>{
        input.disabled = !onoffbutton.checked
      })
    })

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

    dropdown.querySelectorAll("input").forEach((input)=>{
      input.disabled = !onoffbutton.checked
    })
  }

  if (!selectedMirrorName) {
    [selectedMirrorName] = mirrorNames;
    const mirrorData = {};
    mirrorData[selectedMirrorKey] = selectedMirrorName;
    chrome.storage.local.set(mirrorData);
  }

  dropdown.childNodes.forEach((mirrorOption) => {
    if (mirrorOption.value === selectedMirrorName) {
      // eslint-disable-next-line no-param-reassign
      mirrorOption.checked='checked';
    }
  });
  setSelectedMirror(selectedMirrorName);
});

});
