// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// The function below is executed in the context of the inspected page.
var page_getProperties = function () {
    var data = egret ? egret.MainContext.instance : {};
    // Make a shallow copy with a null prototype, so that sidebar does not
    // expose prototype.
    var props = Object.getOwnPropertyNames(data);
    var copy = { __proto__: null };
    for (var i = 0; i < props.length; ++i)
        copy[props[i]] = data[props[i]];
    return copy;
};
chrome.devtools.panels.elements.createSidebarPane("Egret Properties", function (sidebar) {
    function updateElementProperties() {
        sidebar.setExpression("(" + page_getProperties.toString() + ")()");
    }
    updateElementProperties();
    chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties);
});
//(function () {    var t = window.setInterval(function () { var a = egret && (window.clearInterval(t) || egret.devtool.start()); console.log("waiting") }, 100);egret && egret.devtool && (window.clearInterval(t) || egret.devtool.start());})();
chrome.devtools.panels.create("Egret", "icon.png", "ipt/panel/index.html", function (panel) {
    var connected = false;
    panel.onShown.addListener(function (w) {
        if (!connected)
            chrome.devtools.inspectedWindow.eval('(function () {    var t = window.setInterval(function () { var a = egret && egret.devtool && egret.devtool.start&& (window.clearInterval(t) || egret.devtool.start()); console.log("waiting") }, 100);egret && egret.devtool && egret.devtool.start&&(window.clearInterval(t) || egret.devtool.start());})();');
        backgroundPageConnection.postMessage({
            toDevTool: true,
            toggleMask: true,
            devToolHidden: false
        });
        connected = true;
    });
    panel.onHidden.addListener(function (w) {
        backgroundPageConnection.postMessage({
            toDevTool: true,
            toggleMask: true,
            devToolHidden: true
        });
    });
    var backgroundPageConnection = chrome.runtime.connect({
        name: btoa("for" + String(chrome.devtools.inspectedWindow.tabId))
    });
    backgroundPageConnection.onMessage.addListener(function (message) {
        // Handle responses from the background page, if any
    });
    backgroundPageConnection.postMessage({
        tabId: chrome.devtools.inspectedWindow.tabId
    });
    panel.onSearch.addListener(function (action, query) {
        return false;
    });
});
