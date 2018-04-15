$(function(){
  setInterval(function(){
    console.log("自動更新");

    var url = $(location).attr('pathname');
    console.log(url)
    var latest_message = $('.right-content-message__user-name:last')
    if(latest_message.length){
      var message_id = latest_message.data("message-id")
    }else{
      var message_id = 0
    }
    console.log(message_id)

    $.ajax({
      url: url,
      type: 'GET',
      data: { message: { id: message_id } },
      dataType: 'json'
    })

    .done(function(data){
      console.log("ajax_done")
      console.log(data)
    })

    .fail(function(){
      console.log("ajax_fail")
      // alert("自動更新が失敗しました")
    })
  },5000);
});
