$(function(){
  $(document).on('keyup', '#user-search-field', function(){
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      datatype: 'json',
    })

    .done(function(users) {
      console.log(users)
    });
  });
});

