// create variables for current session
var booted = false;
var counter;
var protected;
var site;
get_items();

// listen for updates to session storage
browser.storage.session.onChanged.addListener(get_items);

// retrieve items from session storage
function get_items() {
    browser.storage.session.get().then(got_items);
}

// set corresponding values from session storage
function got_items(items) {
    counter = items.c;
    protected = items.p;
    site = items.s;
    load_frog();
}




// create listener for frog click
var frog = document.getElementById("toggle");
frog.addEventListener('click', toggle_frog, false);

// toggle frog everytime frog is clicked
// plays animation and sets corresponding disabled/enabled text
// sends message to background.js
function toggle_frog() {
    if (!protected) {
        browser.runtime.sendMessage({frog: true});
        frog.style.backgroundImage = "url('./Imgs/frog_anim.gif?a=" + Math.random() + "')";
        document.getElementById("status").innerHTML = "enabled";
    } else if (protected) {
        browser.runtime.sendMessage({frog: false});
        frog.style.backgroundImage = "url('./Imgs/frog_anim_reverse.gif?a=" + Math.random() + "')";
        document.getElementById("status").innerHTML = "disabled";
    }
}

// load frog everytime popup is opened or frog is clicked
// sets corresponding disabled/enabled text
function load_frog() {
    document.getElementById("blocked").innerHTML = counter.toString();
    document.getElementById("website").innerHTML = site;

    if (protected) {
        img_on_startup("url('./Imgs/frog_on.png')");
        document.getElementById("status").innerHTML = "enabled";
    } else if (!protected) {
        img_on_startup("url('./Imgs/frog_off.png')");
        document.getElementById("status").innerHTML = "disabled";
    }
}

// if on startup -> set image
function img_on_startup(url) {
    if (!booted) {
        booted = true;
        frog.style.backgroundImage = url;
    }
}