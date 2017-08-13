// functions
var forEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]); 
  }
}

// initialize smooth scroll
var scroll = new SmoothScroll('a[href*="#"]')

// initialize in view
inView.offset({
    top: 200,
    bottom: 200,
})
inView('section')
.on('enter', el => {
    if (el.id.substring(0, 7) == "section") {
        var link = document.querySelectorAll("a[href='#" + el.id + "']")[0]
        var links = document.querySelectorAll("nav a")
        forEach(links, (index, link) => {
            link.classList.remove('active')
        })
        link.classList.add('active')
        if(history.pushState) {
            history.pushState(null, null, '#' + el.id)
        }
    }
})