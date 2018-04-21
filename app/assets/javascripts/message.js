$(function(){
  // メッセージのHTMLを生成する
  function messageHTML(message){
    var html = `<div class="right-content-main-message" id="${message.id}" data-id="${message.id}">
                  <div class="right-content-main-message__user-name">${message.user_name}</div>
                  <div class="right-content-main-message__date">${message.created_at}</div>
                  <div class="right-content-main-message__message-text">${message.content}</div>
                </div>`
    return html;
  }

  function imageHTML(message){
    var html = `<div class="right-content-main-message__message-text"><img src="${message.image_url}"></div>`
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
      var id = data.id
      $('.right-content-main').append(html)
      $('.right-content-main-message#'+ id).append(img)
      var scrollHeight = $('.right-content-main').get(0).scrollHeight
      $('body, html').animate({scrollTop: scrollHeight},1500);
      $('#message_content').val('');
      $('#new_message input.form__mask__submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
  })

  setInterval(function(){
    var latest_message = $('.right-content-main-message:last')
    var message_id = latest_message.length ? latest_message.data("id") : 0
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      $.ajax({
        url: location.href,
        type: 'GET',
        data: { id: message_id },
        dataType: 'json'
      })
      .done(function(data){
        if (data.length){
          data.forEach(function(new_message){
            var img = new_message.image_url ? imageHTML(new_message) : '';
            var html = messageHTML(new_message)
            var id = new_message.id
            $('.right-content-main').append(html)
            $('.right-content-main-message#'+ id).append(img)
          })
          var scrollHeight = $('.right-content-main').get(0).scrollHeight
          $('body, html').animate({scrollTop: scrollHeight},1500);
        }
      })
      .fail(function(){
        alert("自動更新に失敗しました")
      })
    }
  },5000);
})
