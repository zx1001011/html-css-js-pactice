window.onload = function () {
    var zr = zrender.init(document.getElementById('main'));
    var circle = new zrender.Circle({
        shape: {
            cx: 150,
            cy: 50,
            r: 40
        },
        style: {
            fill: 'none',
            stroke: '#F00'
        }
    });
    zr.add(circle);
    setTimeout(function () {
        console.log(circle)
        console.log(circle.shape)
        circle.attr('shape', {
            r: circle.shape.r + 10
        })
    }, 1000)
    // console.log(circle.shape)
    // circle.attr('shape', {
    //     r: 50
    // })
    // console.log(circle.shape.r)
    // circle.attr('style', {
    //     stroke: 'white'
    // })
}