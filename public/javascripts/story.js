$(function() {
    $('#carouselStory').carousel({interval: 4000});
    $('#rightBtn').click(function(event){
        if ($('#lastPage').hasClass('active')) {
            event.preventDefault();
            window.location.href = '/';
        }
    });
});