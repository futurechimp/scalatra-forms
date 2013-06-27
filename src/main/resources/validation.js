$(function(){
  $.each($('form[validate=true]'), function(i, form){
    $(form).submit(validate);
  });
});

function validate(e){
  var form = $(e.target);
  
  if(form.data('validated') == true){
    return true;
  }

  $.post(form.attr('action') + '/validate', $(e.target).serialize(), function(data){
    // clear all error messages
    $('.error-message').text('');
    
    if($.isEmptyObject(data)){
      form.data('validated', true);
      form.submit();
    } else {
      displayErrors(data);
    }
  }, 'json');
  return false;
}

function displayErrors(data){
  $.each(data, function(key, value){
    $('#error-' + key).text(value);
  });
}