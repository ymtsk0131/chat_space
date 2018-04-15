$(function(){
  // メッセージのHTMLを生成する
  function messageHTML(message){
    var html = `<div class="right-content-message__user-name" data-message-id="${message.id}">${message.user_name}</div>
                <div class="right-content-message__date">${message.created_at}</div>
                <div class="right-content-message__message-text">${message.content}</div>`
    return html;
  }

  function imageHTML(message){
    var html = `<div class="right-content-message__message-text"><img src="${message.image_url}"></div>`
    return html;
  }

  $(document).on('submit', '#new_message', function(e){
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
      var img = data.image_url ? imageHTML(data) : '';
      var html = messageHTML(data)
      $('.right-content-message').append(html).append(img)
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
