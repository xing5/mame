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
            name: '好友评分',
            data: [5, 4, 4, 3, 5],
            pointPlacement: 'on',
            ceiling: 5
        }]

    });
    $('#morality').slider();
    $('#morality').on('slideStop', function(evt) {
        moralityStrArray = ['作奸犯科', '坑蒙拐骗', '睚眦必报', '光风霁月', '浩然正气', '德高望重'];
        $('#moralityLabel').text(moralityStrArray[evt.value]);
    });
    $('#intelligence').slider();
    $('#intelligence').on('slideStop', function(evt) {
        intenlligenceStrArray = ['基本弱智', '憨头憨脑', '聪明伶俐', '大巧若拙', 'IQ 150', '万中无一'];
        $('#intelligenceLabel').text(intenlligenceStrArray[evt.value]);
    });
    $('#shape').slider();
    $('#shape').on('slideStop', function(evt) {
        shapeStrArray = ['嘻！武大郎', '潘长江', '郭德纲', '穿衣显瘦', '脱衣有肉', '孙杨'];
        $('#shapeLabel').text(shapeStrArray[evt.value]);
    });
    $('#look').slider();
    $('#look').on('slideStop', function(evt) {
        lookStrArray = ['嘿！武大郎', '王宝强', '葛优', '梁朝伟', '金城武', '吴彦祖'];
        $('#lookLabel').text(lookStrArray[evt.value]);
    });
    $('#career').slider();
    $('#career').on('slideStop', function(evt) {
        careerStrArray = ['饥寒交迫', '流离失所', '家徒四壁', '生活无忧', '前途无量', '富甲一方'];
        $('#careerLabel').text(careerStrArray[evt.value]);
    });

    $('.tag').on('click', function(evt) {
        $('#plusone').css({top: evt.pageY-10, left:evt.pageX}).show()
            .animo({animation: 'fadeOutUp', duration: 0.5}, function(){
                $('#plusone').hide();
            });
    })
});