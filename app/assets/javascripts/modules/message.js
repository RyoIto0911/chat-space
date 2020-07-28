$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="message" data-message-id=${message.id}>
          <div class="message-box">
            <div class="message-username">
              ${message.user_name}
            </div>
            <div class="message-date">
              ${message.created_at}
            </div>
          </div>
            <p class="message-log">
              ${message.content}
            </p>
            <img class="image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="message" data-message-id=${message.id}>
        <div class="message-box">
          <div class="message-username">
            ${message.user_name}
          </div>
          <div class="message-date">
            ${message.created_at}
          </div>
        </div>
        <div class="message-box">
          <p class="message-log">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main-message').append(html);
      $('.main-message').animate({ scrollTop: $('.main-message')[0].scrollHeight});
      $('form')[0].reset();
      $('.form-submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});