/* global chrome */

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const actualUrl = details.url;
    const actualUrlParts = actualUrl.split('/');
    let stub = actualUrlParts[2];
    const stubParts = stub.split('.');
    const domainIndex = stubParts.length - 2;
    if (stubParts[domainIndex] === 'wikipedia') {
      stubParts.splice(domainIndex, 1, '0wikipedia');
      stub = stubParts.join('.');
      actualUrlParts.splice(2, 1, stub);
      const newUrl = actualUrlParts.join('/');
      return { redirectUrl: newUrl };
    }
    return { redirectUrl: actualUrl };
  },
  { urls: ['*://*.wikipedia.org/*'] },
  ['blocking'],
);

const mirrorFile = '';

function getCurrentMirror() {
  const lol = 3;
}
