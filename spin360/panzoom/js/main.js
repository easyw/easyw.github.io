$( document ).ready(function() {
    //fn executed on full screen button click
    //  var isZoomed = false;
    var extendApi = null;
    // var maxWidth = $('.carContainer').innerWidth();
    var obj = {
 
    source: SpriteSpin.sourceArray('images/{frame}.png', { frame: [1,4], digits: 4 }),
    /* 
        // slternatively use this property if your zoom images are very large and should not be downloaded
            // on start
        // sourceZoom: ...
    */

        width   : 600,  // width in pixels of the window/frame
        height  : 400,  // height in pixels of the window/frame
        sense: 1, // changing this value to -1 will make rotation inverse on mouse drag
        animate: false, // true will make car to spin on page load
        sizeMode: 'stretch', // true diffvalues for different zoom sizes on load values: fill/fit/original/stretch
        mods: [
            // change frame on mouse move
            'move', //change values to have different options values: 'drag'
            // display module
            '360'
            // , 
            // 'zoom'
        ],
        target: $('.carContainer'),
        renderer: 'canvas',
        frame: 3,
        frameTime: 40, //changing the number increases or decreases the speed of rotation
        scrollThreshold: 50, // Number of pixels the user must drag within a frame to enable page scroll (for touch devices)
        //orientation: 'vertical', //'horizontal', //vertical value will make animation on mouse up/dowm movenemt
        loop: true // If true loops the animation, applicable only if animation property is true
    };
    document.addEventListener("fullscreenchange", onFullScreenChange, false);
    document.addEventListener("mozfullscreenchange", onFullScreenChange, false);
    document.addEventListener("webkitfullscreenchange", onFullScreenChange, false);
    //document.addEventListener('MSFullscreenChange', onFullScreenChange, false);

    function onFullScreenChange() {
        var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
        if (!fullscreenElement) {
             $('.carContainer').css('pointer-events', 'all');
            $('.inner-car-images').hide();
        };
    };
    //fn executed on click of full screen button
    $('a.fullscreen').on('click', function(e){
        e.preventDefault();
        // if (isZoomed) {
        //     isZoomed = $('.carContainer').spritespin('api').toggleZoom();
        // };
        $('.carContainer').spritespin('api').requestFullscreen();
    });
    //fn executed on clcik for zoom
    // $('a.zoom').on('click', function(e){
    //     e.preventDefault();
    //     isZoomed = $('.carContainer').spritespin('api').toggleZoom();
    // });
    //fn executed on click of animate button
    $('a.animate').on('click',function(e){
        e.preventDefault();
        extendApi.toggleAnimation();
        $('.showOnAnimation').toggle();
    });
    //fn executed on click of rotate button
    $('.rotate').on('click', function(e){
        e.preventDefault();
        extendApi.data.reverse = !extendApi.data.reverse;
    });
    //fn executed on number change
    $('#rotSpeed').on('keyup', function (e){
        e.preventDefault();
        extendApi.speedControl();
    });

    $('.carContainer').on('mouseenter', function() {
        $('.showOnAnimation').fadeOut();
    });
    var carSpin = $('.carContainer');
    carSpin.bind("onLoad", function(){
        // operations onload happen here
        extendApi = $('.carContainer').spritespin('api');
        
        if (!extendApi.speedControl) {
            SpriteSpin.extendApi({
                speedControl: function() {
                    // we need to stop and start animation to reflect speed change
                    this.data.frameTime = parseInt($('#rotSpeed').val());
                    extendApi.stopAnimation();
                    extendApi.startAnimation();
                }
            });
        };
    }).bind("onFrameChanged", function(event, data){
        //event fired evenry time frame changes 
        (data.frame == 3) ? $('.carContainer').css('cursor','pointer') : $('.carContainer').css('cursor','auto');
    });

    $(".carContainer").spritespin(obj);

    $('.carContainer').on('click', switchCase);
    $('.inner-images').on('click', function () {
        $('.carContainer').css('pointer-events', 'all');
        $('.inner-car-images').fadeOut();
    });
    //zoom effect

    $(".spritespin-canvas").panzoom({
        panOnlyWhenZoomed: true,
        //disablePan: true,
        duration: 200, // duration of the zoom to effect
        easing: 'ease-in-out', // type of zoom animation
        //contain: "invert",
        minScale: 1,
        linearZoom: true,
        which: 1, // changing this values makes pan possible on right lcick of mouse value : 1(left),2(middle),3(right clcik)
        // Pan only on the X or Y axes
		disableXAxis: false,
		disableYAxis: false,
        //$set: $(".spritespin-canvas"),
        $zoomIn: $(".zoom-in"),
        $zoomOut: $(".zoom-out"),
        $reset: $(".reset"),
        $zoomRange: $(".zoom-range"),
        onStart: undefined,
        onChange: function(){},
        onZoom: undefined,
        onPan: undefined,
        onEnd: function(){},
        onReset: function(){}
    });

    var panzoom = $(".spritespin-canvas").panzoom("instance");

    $('.zoom-in, .zoom-out, .reset').on('click', function () {
        setTimeout(function(){
            if (panzoom.$zoomRange.val() == 1) {
                panzoom.reset();
                extendApi.data.mods=['360','move'];
                //$('.inner-images').on('click');
                //console.log(panzoom);
                $(".carContainer").spritespin(extendApi.data);
                //$(".spritespin-canvas").panzoom('resetPan(panzoom)');

            } else {
                //$('.inner-images').off('click');
                extendApi.data.mods=['360'];
                $(".carContainer").spritespin(extendApi.data);
            };
        },0)
        
    });

    function switchCase() {
        if (panzoom.$zoomRange.val() == 1) {
            switch (extendApi.currentFrame()) {
                case 3:
                    $('.carContainer').css('pointer-events', 'none');
                    $('.inner-car-images').css('pointer-events', 'all');
                    $('.inner-car-images').fadeIn();       
                    break;
            };
        }
    };



});


/* --------FOR REFERRENCE--------------
http://spritespin.ginie.eu/docs/spritespin.api.html
*/