var $img = $('img');
var len = $img.length;
var initIndex = 0;
var timer;
var flag = true;
var $wrap = $('wrap');
function init() {
    changeFront(initIndex);
    turnImg();
    bindEvent();
}
init();
function turnImg() {
    timer = setInterval(function () {
        flag = false;
        initIndex = (initIndex + 1) % 5;
        changeFront(initIndex);
    }, 1000)
}

function changeFront(frontIndex) {
    var halfLen = Math.floor(len/2);
    $img.eq(frontIndex).css({
        transform: 'translateZ(300px)'
    })
    for(let i = 0 ; i < halfLen ; i++ ) {
        var lNum = frontIndex - i - 1;
        var rNum = (frontIndex + i + 1)%5;
        $img.eq(lNum).css({
            transform: 'translateX(' + (-200 * ( i + 1))+ 'px) translateZ(' + 100 * (1 - i) + 'px) rotateY(30deg)'
        })
        $img.eq(rNum).css({
            transform: 'translateX(' + (200 * ( i + 1))+ 'px) translateZ(' + 100 * (1 - i) + 'px) rotateY(-30deg)'
        })
    }
}

function bindEvent() {
    $img.hover(function () {
        clearInterval(timer);
        flag = true;
    },function () {
        turnImg();
    })

    $img.on('click', function (e) {
        if(flag) {
            initIndex = $(this).index();
            changeFront(initIndex);
        }
    })
    $wrap.on('transitionend', function (e) {
        flag = true;
    })
}