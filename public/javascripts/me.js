var hchart = null;

$(function() {

    var moralityStrArray = ['作奸犯科', '坑蒙拐骗', '睚眦必报', '光风霁月', '浩然正气', '德高望重'];
    var intelligenceStrArray = ['基本弱智', '憨头憨脑', '聪明伶俐', '大巧若拙', 'IQ 150', '万中无一'];
    var shapeStrArray = ['嘻！武大郎', '潘长江', '郭德纲', '穿衣显瘦', '脱衣有肉', '孙杨'];
    var lookStrArray = ['嘿！武大郎', '王宝强', '葛优', '梁朝伟', '金城武', '吴彦祖'];
    var careerStrArray = ['饥寒交迫', '流离失所', '家徒四壁', '生活无忧', '前途无量', '富甲一方'];

    function refreshLabels(score) {
        $('#moralityRst').text(moralityStrArray[Math.floor(score.morality)]);
        $('#intelligenceRst').text(intelligenceStrArray[Math.floor(score.intelligence)]);
        $('#shapeRst').text(shapeStrArray[Math.floor(score.shape)]);
        $('#lookRst').text(lookStrArray[Math.floor(score.look)]);
        $('#careerRst').text(careerStrArray[Math.floor(score.career)]);
    }

    function tagEventHandler(evt) {
        $('#plusone').css({top: evt.pageY-10, left:evt.pageX}).show()
            .animo({animation: 'fadeOutUp', duration: 0.5}, function(){
                $('#plusone').hide();
            });
        var orig = $(this).text().split(' | ');
        if (orig.length === 2 && parseInt(orig[1])) {
            $(this).text(orig[0] + ' | ' + (parseInt(orig[1])+1) );
        }
        $.post('/proposal/add_comment', {id: 'me', comment: orig[0]});
    }

    $.getJSON('/proposal/get_score/me', function(score){

        $('#radar').highcharts({

            chart: {
                polar: true,
                type: 'area',
                height: '150',
                events: {
                    load: function() {
                        hchart = this;
                    }
                }
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
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.3f}</b><br/>'
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
                name: '平均评分',
                data: [score.data.morality, score.data.intelligence, score.data.shape, score.data.look, score.data.career]
            }]

        });
        refreshLabels(score.data);
    });

    $.getJSON('/proposal/get_comments/me', function(rsp){
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
                tag.text(key + ' | ' + val);
                tag.appendTo('#comments');
            });
        }

        $('.tag').on('click', tagEventHandler);
    });
    $('#morality').slider();
    $('#morality').on('slideStop', function(evt) {
        $('#moralityLabel').text(moralityStrArray[evt.value]);
    });
    $('#intelligence').slider();
    $('#intelligence').on('slideStop', function(evt) {
        $('#intelligenceLabel').text(intelligenceStrArray[evt.value]);
    });
    $('#shape').slider();
    $('#shape').on('slideStop', function(evt) {
        $('#shapeLabel').text(shapeStrArray[evt.value]);
    });
    $('#look').slider();
    $('#look').on('slideStop', function(evt) {
        $('#lookLabel').text(lookStrArray[evt.value]);
    });
    $('#career').slider();
    $('#career').on('slideStop', function(evt) {
        $('#careerLabel').text(careerStrArray[evt.value]);
    });

    $('#radar-form').submit(function(event){
        event.preventDefault();
        var new_score = {
            id: $('#scoreId').val(),
            morality: parseInt($('#morality').val()),
            intelligence: parseInt($('#intelligence').val()),
            shape: parseInt($('#shape').val()),
            look: parseInt($('#look').val()),
            career: parseInt($('#career').val())
        };
        $.post($(this).attr('action'), new_score);
        $('#myModal').modal('hide');
        if (hchart.series.length > 1) {
            hchart.series[1].setData([new_score.morality, new_score.intelligence, new_score.shape, new_score.look, new_score.career]);
        } else {
            hchart.addSeries({
                name: '您的评分',
                data: [new_score.morality, new_score.intelligence, new_score.shape, new_score.look, new_score.career],
                color: '#eb685a'
            });
        }


        $.getJSON('/proposal/get_score/me', function(rst){
            var avg_score = rst.data;
            hchart.series[0].setData([avg_score.morality, avg_score.intelligence, avg_score.shape, avg_score.look, avg_score.career]);
            refreshLabels(rst.data);
        });

    });

    $('#comment-form').submit(function(evt) {
        event.preventDefault();
        $.post('/proposal/add_comment', {id:'me', comment:$('#textField').val()});
        $('#tagBox').modal('hide');

        var tag = $("<span>", {
            class: "label label-warning tag"
        })
        tag.text($('#textField').val() + ' | ' + 1);
        tag.on('click', tagEventHandler);
        tag.appendTo('#comments');
    });
});