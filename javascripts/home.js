$(function() {
    // $('a.btn-danger').animo({
    //         animation: 'flash',
    //         duration: 2,
    //         iterate: "infinite",
    //         keep:true,
    //         timing:"ease-in-out"
    // });
    //$('#roseNum').text($('#roseCanvas').outerHeight());
    $.getJSON("http://api.xingwu.me/proposal/get_rose", function(data){
        if (data.ret == 0) {
            $('#roseNum').text(data.roseNum);
        }
    });
    $('#roseBtn').on('click', function(e) {
        $.post("http://api.xingwu.me/proposal/add_rose");
        $('#roseIcon').animo({
            animation: 'tada',
            duration: 2,
            iterate: 1,
            keep:false,
            timing:"ease-in-out"
        }, function() {
            var rn = $('#roseNum');
            rn.text(parseInt(rn.text())+1);
        });
        var roseInstance = document.createElement('img');
        roseInstance.src = '/images/rose.png';
        roseInstance.style.top = '0';
        roseInstance.style.left= Math.floor(Math.random()*80) + '%';

        $('#roseCanvas').append(roseInstance);

        $(roseInstance).animo({
            animation: 'rotateFadeOutDown'+(Math.random()>0.5?1:2),
            duration: 5,
            iterate: 1,
            keep:true,
            timing:"linear"
        }, function() {
            $(roseInstance).remove();
        })
    })
});
