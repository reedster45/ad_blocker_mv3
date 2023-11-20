// run blocking scripts on window load
window.addEventListener('DOMContentLoaded', block);


function block() {
    console.log("window loaded.");

    // block ads, cookies and trackers
    remove_ads();
    remove_cookies();
    remove_trackers();
    document.body.style.border = "5px solid red";
}


function remove_ads() {
    var all = document.getElementsByTagName("*");

    for (var i=0, max=all.length; i < max; i++) {
      // check id and hide if it matches google-ad-*
      console.log("removing ads...");
    }


    // should I use timeouts & intervals or can I do it with listeners so it only activates when it has to
    // e.g. when domcontentloaded, when new js is loaded, etc...
    setTimeout(function () {
        remove_more_ads();
    }, 100);

    setInterval(function () {
        remove_more_ads();
    }, 10000);
}


function remove_more_ads() {
    console.log("removing more ads...");
    var ads = document.getElementsByClassName("example-suspected-class");

    if (ads.length == 1) {

        ads[0].remove();
    }
}








function remove_cookies() {
    console.log("removing cookies...");
}

function remove_trackers() {
    console.log("removing trackers...");
}


browser.runtime.sendMessage({counter: 1});