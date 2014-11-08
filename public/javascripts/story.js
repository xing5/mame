$(function() {
    $('#carouselStory').carousel({interval: 5000, wrap: false});
    $('#carouselStory').on('slid.bs.carousel', function (e) {
        if($('#lastPage').hasClass('active')) {
            $('#rightBtn').click(function(event){
                event.preventDefault();
                window.location.href = '/'; 
            });
        }
    });
});