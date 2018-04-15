$(function(){

  function messageHTML(message){
    var html = `<div class="right-content-message__user-name" data-message-id="${message.id}">${message.user.name}</div>
                <div class="right-content-message__date">${message.created_at}</div>
                <div class="right-content-message__message-text">${message.content}</div>`
    return html;
  }

  function imageHTML(message){
    var html = `<div class="right-content-message__message-text"><img src="${message.image_url}"></div>`
    return html;
  }

  setInterval(function(){

    var url = $(location).attr('pathname');
    var latest_message = $('.right-content-message__user-name:last')
    if(latest_message.length){
      var message_id = latest_message.data("message-id")
    }else{
      var message_id = 0
    }

    $.ajax({
      url: url,
      type: 'GET',
      data: { message: { id: message_id } },
      dataType: 'json'
    })

    .done(function(data){
      if (data.length){
        data.forEach(function(new_message){
          var img = new_message.image_url ? imageHTML(new_message) : '';
          var html = messageHTML(new_message)
          $('.right-content-message').append(html).append(img)
          $('html, body').animate({
              scrollTop: $(document).height()
            },1500);
        })
      }
    })

    .fail(function(){
      alert("自動更新が失敗しました")
    })
  },5000);
});
