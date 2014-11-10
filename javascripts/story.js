$(function() {
    $('#carouselStory').carousel({interval: 6000, wrap: false});
    $('#carouselStory').on('slid.bs.carousel', function (e) {
        if($('#lastPage').hasClass('active')) {
            $('#rightBtn').click(function(event){
                event.preventDefault();
                window.location.href = '/'; 
            });
        }
    });
});