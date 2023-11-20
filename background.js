// store in session
var state = {};
var domains = {};
var counter = 0;
var protected = true;
var site;
check_domain();

// trigger when swithcing tabs (activates background.js)
browser.tabs.onActivated.addListener(async function (tab) {
    await check_domain();
    update_badge();
});

// trigger when committed to loading a webpage (activates background.js)
browser.webNavigation.onCommitted.addListener(async function (tab) {
    await check_domain();
    update_badge();
});

// trigger when popup.js sends message (does not activate background.js)
browser.runtime.onMessage.addListener(async function (request) {
    check_counter(request.counter);
    check_protected(request.frog);
    await update_domain();
    update_badge();
});


// checks current domain and sets corresponding values
async function check_domain() {
    let tab = await get_tab();
    set_domain(tab.url);
    if (site in domains) {
        counter = domains[site].c;
        protected = domains[site].p;
    } else {
        counter = 0;
        protected = true;
        domains[site] = {
            c: counter,
            p: protected
        };
    }

    check_protected(protected);
    await update_session();
    return;
}

// updates current domains values
async function update_domain() {
    let tab = await get_tab();
    set_domain(tab.url);
    domains[site].c = counter,
    domains[site].p = protected;

    await update_session();
    return;
}

// returns current tab object
async function get_tab() {
    let [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    return tab;
}

async function update_session() {
    await browser.storage.session.set({ c: counter, p: protected, s: site });
    return;
}



// takes tab.url and return a parsed url string in desired format
function set_domain(url) {
    let parsedUrl = url.replace("https://", "").replace("http://", "").replace("www.", "");
    let domain = parsedUrl.slice(0, parsedUrl.indexOf('/') == -1 ? parsedUrl.length : parsedUrl.indexOf('/'))
    .slice(0, parsedUrl.indexOf('?') == -1 ? parsedUrl.length : parsedUrl.indexOf('?'));
    site = domain;
}

// update badge number
function update_badge() {
    if (counter > 0) {
        browser.action.setBadgeText({text: counter.toString()});
        browser.action.setBadgeBackgroundColor({color: "#40a6ce"});
    } else {
        browser.action.setBadgeText({text: ""});
    }
}

// update icon based on protection status
function check_protected(frog) {
    if (frog != undefined) {
        if (frog) {
            protected = true;
            browser.action.setIcon({path: './popup/Imgs/frog_on.png'});
        } else {
            protected = false;
            browser.action.setIcon({path: './popup/Imgs/frog_off.png'});
        }
    }
}

// update counter value
function check_counter(c) {
    if (c != undefined) {
        counter += c;
    }
}

