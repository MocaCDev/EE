/* Detect web browser being used. If it is Safari, alert the user that signing up/logging in via the webpage might be buggy
 * due to the webpage being visited on Safari.
 * */
var ua = navigator.userAgent.toLowerCase(); 
var isSafari = false;
try {
  isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
}
catch(err) {}
isSafari = (isSafari || ((ua.indexOf('safari') != -1)&& (!(ua.indexOf('chrome')!= -1) && (ua.indexOf('version/')!= -1))));

if (isSafari)
{
    alert("Hi!\n\nYou are using Safari which may lead to some bugs in regards to signing up/logging in via the web (cookies). We recommend signing up/logging in via the app instead of via the website.\n\nThanks - EZNotes Team.");
}