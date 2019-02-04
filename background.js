/* global chrome */

const selectedMirrorKey = 'selectedMirror';
const onOffKey = 'active';

// Stay active as a default
let active = true;
let selectedMirror;

function WikiMirror(name, mirrorType) {
  this.name = name;
  this.mirrorType = mirrorType;
}

// eslint-disable-next-line func-names
WikiMirror.prototype.getModifiedUrl = function (actualUrlParts, domainIndex, stubParts) {
  let stub;
  switch (this.mirrorType) {
    case 0:
      stubParts.splice(domainIndex, 2, this.name);
      stub = stubParts.join('.');
      actualUrlParts.splice(2, 1, stub);
      return actualUrlParts.join('/');
    // eslint-disable-next-line no-case-declarations
    default:
      if (stubParts[0] === 'www') {
        stubParts.splice(domainIndex, 2, this.name);
        stub = stubParts.join('.');
        actualUrlParts.splice(2, 1, stub);
        return actualUrlParts.join('/');
      }
      let newUrl = `https://www.${this.name}/${stubParts[0]}/`;
      const lastPart = actualUrlParts[actualUrlParts.length - 1];
      if (lastPart !== '') {
        newUrl += `${lastPart}`;
      }
      return newUrl;
  }
};

const allMirrors = [
  new WikiMirror('0wikipedia.org', 0),
  new WikiMirror('wikizero.com', 1),
  new WikiMirror('wikiwand.com', 1),
  new WikiMirror('wikipedi0.org', 0),
];

function setSelectedMirror(selectedMirrorName) {
  [selectedMirror] = allMirrors.filter(mirror => mirror.name === selectedMirrorName);
}

function getAllMirrorsNames(){
  return allMirrors.map((mirror) => mirror.name)
}

chrome.storage.local.get([selectedMirrorKey, onOffKey], (data) => {
  let selectedMirrorName = data[selectedMirrorKey];
  active = data[onOffKey]

  if (!selectedMirrorName) {
    selectedMirrorName = allMirrors[0].name;
    const mirrorData = {};
    mirrorData[selectedMirrorKey] = selectedMirrorName;
    mirrorData[onOffKey] = true
    active = true
    chrome.storage.local.set(mirrorData);
  }
  setSelectedMirror(selectedMirrorName);
});

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	if(message.data == "refresh") {
    chrome.storage.local.get([onOffKey], (data) => {
      active = data[onOffKey]
    })
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {

    if (!active)
      return {}

    const actualUrl = details.url;
    const actualUrlParts = actualUrl.split('/');
    const stub = actualUrlParts[2];
    const stubParts = stub.split('.');
    const domainIndex = stubParts.length - 2;
    if (stubParts[domainIndex] === 'wikipedia') {
      const newUrl = selectedMirror.getModifiedUrl(actualUrlParts, domainIndex, stubParts);
      return { redirectUrl: newUrl };
    }
    return { redirectUrl: actualUrl };
  },
  { urls: ['*://*.wikipedia.org/*'] },
  ['blocking'],
);
