$(document).ready(function() {
  
  var options = {
    successClass: 'has-success',
    errorClass: 'has-error',
	trigger: 'keyup change',
	classHandler: function(el) {
      return el.$element.closest('.form-group');
    }
  };
  
  parsleyForm = new Parsley('#contact-form', options);
	
  $('#contact-form').submit(function(e) {
    var contactForm = $(this);
		
    if (!$(this).parsley('isValid')) {
      return false
    }
		
    else {		

      $('#contact-sending').fadeIn(200); 
			
      $.ajax({
        type: contactForm.attr('method'),
        url: contactForm.attr('action') + '?ajax=true',
        data: contactForm.serialize(),
        success: function(response) {
          response = $.trim(response);
					
          $('#contact-sending').delay(1000).fadeOut(200);
					
          if (response == 'success') {
						
            $('#contact-sending-success').delay(1000).fadeIn(200);
            $('#contact-form')[0].reset();
            $('.form-group').removeClass('has-success has-error');
			$('#contact-sending-success').delay(5000).fadeOut(200);
          } 
	
          else {
            $('#contact-sending-error').delay(1000).fadeIn(250);
			$('#contact-sending-error').delay(5000).fadeOut(200);
          }
        }
      });
    }
		
    return false
	
  });
	
});