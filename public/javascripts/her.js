$(function() {
    $('#radar').highcharts({

        chart: {
            polar: true,
            type: 'area',
            height: '150'
        },

        title: {
            text: null
        },

        pane: {
            size: '95%'
        },

        xAxis: {
            categories: ['德', '智', '体', '美','劳'],
            tickmarkPlacement: 'on',
            lineWidth: 0,
            labels: {
                enabled: true,
                distance: 5
            }
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0,
            max: 5,
            showFirstLabel: false
        },

        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
        },

        legend: {
            enabled: false
        },

        credits: {
            enabled: false
        },

        navigation: {
            buttonOptions: {
                enabled: false
            }
        },

        exporting: {
            enabled: false
        },

        series: [{
            name: '伍行评分',
            data: [5, 5, 5, 5, 5],
            pointPlacement: 'on',
            ceiling: 5
        }]

    });


    function tagEventHandler(evt) {
        $('#plusone').css({top: evt.pageY-10, left:evt.pageX}).show()
            .animo({animation: 'fadeOutUp', duration: 0.5}, function(){
                $('#plusone').hide();
            });
        var orig = $(this).text().split(' x ');
        if (orig.length === 2 && parseInt(orig[1])) {
            $(this).text(orig[0] + ' x ' + (parseInt(orig[1])+1) );
        }
        $.post('/proposal/add_comment', {id: 'yy', comment: orig[0]});
    }
    
    $.getJSON('/proposal/get_comments/yy', function(rsp){
        if (rsp.ret === 0) {

            var gradient = new Rainbow();
            gradient.setSpectrum('#a3a3a3', '#d9534f');
            var maxNum = null;
            $.each(rsp.data, function(key, val){
                if (!maxNum) {
                    maxNum = val;
                    gradient.setNumberRange(0, val);    
                }
                var tag = $("<span>", {
                    class: "label tag"
                })
                tag.css({'background-color': '#'+gradient.colorAt(val)});
                tag.text(key + ' x ' + val);
                tag.appendTo('#comments');
            });
        }

        $('.tag').on('click', tagEventHandler);
    });

    $('#comment-form').submit(function(evt) {
        evt.preventDefault();
        $.post('/proposal/add_comment', {id:'yy', comment:$('#textField').val()});
        $('#tagBox').modal('hide');

        var tag = $("<span>", {
            class: "label label-warning tag"
        })
        tag.text($('#textField').val() + ' x ' + 1);
        tag.on('click', tagEventHandler);
        tag.appendTo('#comments');
    });
});