$(function(){
  // メッセージのHTMLを生成する
  function messageHTML(message){
    var html = `<div class="right-content-message__user-name">${message.user_name}</div>
                <div class="right-content-message__date">${message.created_at}</div>
                <div class="right-content-message__message-text">${message.content}</div>`
    return html;
  }

  function imageHTML(message){
    var html = `<div class="right-content-message__user-name">${message.user_name}</div>
                <div class="right-content-message__date">${message.created_at}</div>
                <div class="right-content-message__message-text"><img src="${message.image_url}"></div>`
    return html;
  }

    function bothHTML(message){
    var html = `<div class="right-content-message__user-name">${message.user_name}</div>
                <div class="right-content-message__date">${message.created_at}</div>
                <div class="right-content-message__message-text">${message.content}</div>
                <div class="right-content-message__message-text"><img src="${message.image_url}"></div>`
    return html;
  }

  $(document).on('submit', '#new_message', function(e){
    console.log(1);
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      datatype: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      if(data.content && data.image_url){
        var html = bothHTML(data);
      }else if(data.content){
        var html = messageHTML(data);
      }else if(data.image_url){
        var html = imageHTML(data);
      }
      $('.right-content-message').append(html)
      $('html, body').animate({
          scrollTop: $(document).height()
        },1500);
      $('#message_content').val('');
      $('#new_message input.form__mask__submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
  })
})
