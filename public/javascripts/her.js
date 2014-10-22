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

    $('.tag').on('click', function(evt) {
        $('#plusone').css({top: evt.pageY-10, left:evt.pageX}).show()
            .animo({animation: 'fadeOutUp', duration: 0.5}, function(){
                $('#plusone').hide();
            });
    })
});