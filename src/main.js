
// initialize smooth scroll
var scroll = new SmoothScroll('a[href*="#"]');

// initialize in view
inView.offset({
    top: 200,
    bottom: 200,
});
inView('section')
.on('enter', el => {
    if (el.id.substring(0, 7) == "section") {
        var link = document.querySelectorAll("a[href='#" + el.id + "']")[0];
        link.classList.add('active');
        if(history.pushState) {
            history.pushState(null, null, '#' + el.id);
        }
    }
})
.on('exit', el => {
    if (el.id.substring(0, 7) == "section") {
        var link = document.querySelectorAll("a[href='#" + el.id + "']")[0];
        link.classList.remove('active');
    }
})