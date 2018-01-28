chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    var actualUrl = details.url;
    var actualUrlParts = actualUrl.split("/");
    var stub = actualUrlParts[2];
    var stubParts = stub.split("\.");
    var domainIndex = stubParts.length - 2;
    if (stubParts[domainIndex] == "wikipedia") {
      stubParts.splice(domainIndex, 1, "0wikipedia");
      stub = stubParts.join(".");
      actualUrlParts.splice(2, 1, stub);
      var newUrl = actualUrlParts.join("/");
      return { redirectUrl: newUrl };
    }
    else if (stubParts[domainIndex] == "imgur"){
      stubParts.splice(domainIndex, 1, "0imgur");
      stub = stubParts.join(".");
      actualUrlParts.splice(2, 1, stub);
      var newUrl = actualUrlParts.join("/");
      return { redirectUrl: newUrl };
    }
  },
  {urls: ["*://*.wikipedia.org/*", "*://*.imgur.com/*"]},
  ["blocking"]
);