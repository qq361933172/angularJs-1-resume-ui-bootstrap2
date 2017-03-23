//Civi Template Custom Script, v2.5, @hendrijuhanda, ©2013-2015

$(document).ready(function() {
	
  /*-------------------------------
    PRELOADER
  -------------------------------*/
  $(window).load(function() {
    $('#preloader').fadeOut(500);
  });
	
	
  /*-------------------------------
    SMOOTH SCROLL
  -------------------------------*/
  $('a.smooth-scroll').click(function(e) {
    e.preventDefault();
	
    var attr = $(this).attr('data-scroll-offset');
	
    if (typeof attr !== 'undefined' && attr !== false) { 
      var offset = $(this).data('scroll-offset'); 
    } 
	
    else { 
      var offset = 0; 
    }
	
    $(document).scrollTo(this.hash, 1000, {
      offset: -(offset)
    });
  });
  
  
  /*-------------------------------
    NAVBAR COLLAPSE
  -------------------------------*/
  $(document).on('click', '.navbar-collapse.in', function(e) {
    if($(e.target).is('a') && ($(e.target).attr('class') != 'dropdown-toggle')) {
      $(this).collapse('hide');
    }
  });
  
  
  /*-------------------------------
    CENTER HERO CONTENT VERTICALY
  -------------------------------*/
  function heroContent() {	
    var winHeight = $(window).innerHeight();
	
    // @screen width => 992px
    if ($(window).width() >= 992) {
      var heroContentMargin = -($('.hero-content').height() / 2);
			
      $('.hero-content').css('margin-top', heroContentMargin);
    }
	
	// @screen width => 768px and <= 991px
	else if ($(window).width() >= 768 && $(window).width() <= 991) {
      var heroContainerHeight = $('#hero > .container').height();  
		
      if ((winHeight - 100) <= heroContainerHeight) {
        $('#hero > .container').css('margin', '110px 0 60px');
      }
		
      else {
        var heroContainerMargin = (50 + ((winHeight - 100) - heroContainerHeight)) / 2;
		
        $('#hero > .container').css('margin-top', heroContainerMargin);
      }
	}
	
	// @screen width <= 767px
	else {
      var heroContainerHeight = $('#hero > .container').height(); 
		
      if ((winHeight - 50) <= heroContainerHeight) {
        
      }
		
      else {
        var heroContainerMargin = (50 + (winHeight - heroContainerHeight)) / 2;
		
        $('#hero > .container').css('margin-top', heroContainerMargin);
      }
	};
  };
  
  heroContent();
  
  $(window).resize(function() {
	heroContent();
  });
  
  
  /*-------------------------------
    PARALLAX HERO
  -------------------------------*/
  $(window).bind("load scroll", function() {
    var bgPosOffY = -($(window).scrollTop() / 3),
	    bgPos = '50%' + bgPosOffY + 'px';
			
	$('#hero.bg-parallax').css({"background-attachment": "fixed", "background-position": bgPos});
  });

  
  /*-------------------------------
    SKILL CHART
  -------------------------------*/
  $('.chart').easyPieChart({
    barColor: '#b5b5b5',
    lineWidth: 18,
    scaleColor: false,
    size: 150,
    trackColor: '#f5f5f5',
    animate: 1000,
    onStep: function(from, to, percent) {
      $(this.el).find('.percent').text(Math.round(percent));
    }	
  });
	

  /*-------------------------------
    LIGHTBOX POPUP
  -------------------------------*/
  $('.image-link').magnificPopup({
    type: 'image',
    mainClass: 'mfp-fade',
    removalDelay: 500,
    fixedContentPos: false,
  });
  
  
  /*-------------------------------
    GALLERY
  -------------------------------*/
  var $grid = $('#grid');
 
  $grid.shuffle({
    itemSelector: '.gallery-item',
    speed: 500
  });
	
  $('.gallery-control .filter > span').click(function(e) {
    e.preventDefault();
 
    $('.gallery-control .filter > span').parent().removeClass('active');
    $(this).parent().addClass('active');
 
    var category = $(this).parent().attr('data-group');
 
    $grid.shuffle('shuffle', category);
  });
  
  
  /*-------------------------------
    REFRESH
  -------------------------------*/
  var timer;
  var refresh = function() { 
    $('#main-nav li > a').blur();
	$('[data-spy="scroll"]').each(function() {
		$(this).scrollspy('refresh');
	});
  };
    
  $(window).bind('scroll', function() {
    clearTimeout(timer);
    timer = setTimeout(refresh , 200);	
  });
  
  
  /*-------------------------------
    COLLAPSE INDICATOR
  -------------------------------*/
  $('.panel-custom').each(function() {
    var $this = $(this);
	
	if ($this.children('.panel-collapse').hasClass('in')) { 
	  $this.find('a[data-toggle="collapse"]').removeClass('collapsed'); 
	}
	
	else { 
	  $this.find('a[data-toggle="collapse"]').addClass('collapsed'); 
	}
  });
  
  
  /*-------------------------------
    RESPONSIVE VIDEO
  -------------------------------*/
  $('.video-wrap').fitVids();
  
  
  /*-------------------------------
    TOOLTIP/POPOVER
  -------------------------------*/
  $('*[data-toggle="tooltip"]').tooltip();
  $('*[data-toggle="popover"]').popover();
  
  
  /*-------------------------------
    TWITTER WIDGET
  -------------------------------*/
  $.fn.twitterWidget = function() {

    this.each(function() {
		
      var htmlEl = $(this).attr('id'),
	      tweetsLength = $(this).data('widget-length'),
	      widgetId = $(this).data('widget-id');
		  
	  var config = {
            "id": widgetId,
            "domId": '',
            "maxTweets": tweetsLength,
            "enableLinks": true,
            "showUser": true,
            "showTime": true,
            "dateFunction": '',
            "showRetweet": false,
            "customCallback": handleTweets,
            "showInteraction": true
      };

      function handleTweets(tweets) {
        var x = tweets.length;
        var n = 0;
        var element = document.getElementById(htmlEl);
        var html = '<ul>';
        
		while(n < x) {
          html += '<li>' + tweets[n] + '</li>';
          n++;
        }
		
        html += '</ul>';
        element.innerHTML = html;
		
		$('.twitter-widget ul > li').each(function() {
		  $(this).find('.timePosted, .interact').wrapAll('<div class="twitter-meta" />');
	    });
	
	    $('.timePosted').each(function() {
		  $(this).html($(this).html().replace('Posted on', '').replace('Posted', ''));
	    });
	
	    $('.twitter_reply_icon').html('<i class="fa fa-reply"></i>').attr('title', 'Reply');
	    $('.twitter_retweet_icon').html('<i class="fa fa-retweet"></i>').attr('title', 'Retweet');
	    $('.twitter_fav_icon').html('<i class="fa fa-star"></i>').attr('title', 'Favorite');
      }

      twitterFetcher.fetch(config);

    });
  };
  
  $('.twitter-widget').twitterWidget();
	
});