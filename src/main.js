// initialize smooth scroll
var scroll = new SmoothScroll('a[href*="#"]',{
    speed: 1000,
    easing: 'easeInOutCubic',
    offset: 0,
    updateURL: true,
    callbackBefore: function ( toggle, anchor ) {},
    callbackAfter: function ( toggle, anchor ) {}
});

// setup in view
var el1 = document.getElementById('section1')
var link1 = document.querySelectorAll("a[href='#section1']")[0];
var view1 = new inView(el1);
view1.onInView(function() {
    el1.classList.add('fadeIn');
    link1.classList.add('active');
});
view1.onOutView(function() {
    el1.classList.remove('fadeIn');
    link1.classList.remove('active');
});