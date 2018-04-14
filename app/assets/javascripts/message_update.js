$(function(){
  setInterval(function(){
    console.log("自動更新");
    var url = $(location).attr('search');
    $.ajax({
      url: url,
      type: "GET",
      datatype: 'json'
    })

    .done(function(message){
      console.log("ajax_done")
      // var img = data.image_url ? imageHTML(data) : '';
      // var html = messageHTML(data)
      // $('.right-content-message').append(html).append(img)
      // $('html, body').animate({
      //     scrollTop: $(document).height()
        // },1500);
    })

    .fail(function(){
      console.log("ajax_fail")
      alert("自動更新が失敗しました")
    })
  },5000);
});
