$(function(){
	$('.portfolio-item-thumbnail-wrap').tooltip();
	$("a[rel^='prettyPhoto']").prettyPhoto();
	
	
	$('.open-skin-changer p').click(function(){
		$('#skins').slideToggle();
	});
	
	$('#skins li.skin a').click(function () {
		var skin = $(this).attr('title')
		$('.active-skin').removeClass('active-skin');
		$(this).parent().addClass('active-skin');
        $('head').append('<link rel="stylesheet" href="skins/' + skin + '.css" type="text/css" />');
    });	
	
	$('#skins li.mirror-mode-switch a').click(function () {
		$('body').toggleClass('mirror-mode');
		$('.main-wrap').toggleClass('pull-left');
		$('.vcard').toggleClass('pull-right');
		$(this).parent().toggleClass('mirror-mode-on');
    });
});

