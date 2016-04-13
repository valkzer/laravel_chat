jQuery(document).ready(function(){
    var animating_scroll_to_message_input = false;
    window.processing_messages  = false;
    window.displayed_messages   = [];
    var last_message_id         = 0;
    var history_container       = jQuery('#message-history');
    var message_input           = jQuery('#message');
    var error_container         = jQuery('#error-container');

    function fetchMessages(){
        if(window.processing_messages){
            return;
        }
        var url = '/api/v1/messages/'+last_message_id;
        jQuery.get(url,{}, function (data) {
            clearErrors();
            displayMessages(data);
        }).fail(
            function(){
                notifyError('Oops! Currently unable to fetch messages.');
            }
        );
    }

    function displayMessages(messages){
        messages.forEach(
            function(message,index,array){
                displayMessage(message);
                if(index == (array.length -1)){
                    last_message_id = message.id;
                }
            }
        );

        has_new_messages = messages.length > 0;
        finishedMessageProcessing(has_new_messages);
    }

    function displayMessage(message){
        if(window.displayed_messages.indexOf(message.id) == -1){
            history_container.append(createMessageDiv(message));
            window.displayed_messages.push(message.id);
        }
    }

    function createMessageDiv(message){
        var html = "<div class='col-xs-12'>" +
            message.user.name + " @ " + message.created_at + " : " +message.message
        "</div>";
        return html;
    }

    function finishedMessageProcessing(has_new_messages){
        if(has_new_messages && !animating_scroll_to_message_input){
            animating_scroll_to_message_input = true;
            jQuery('html, body').animate({
                scrollTop: message_input.offset().top
            }, 1000, 'swing', function(){ animating_scroll_to_message_input = false });
            message_input.trigger('focus');
        }
        window.processing_messages = false;
    }

    function sendMessage(){
        message = message_input.val();
        jQuery.post('/api/v1/messages/send',
            {'message':message},
            function(){
                clearErrors();
                fetchMessages();
            }
        ).fail(
            function(){
                notifyError("Message couldn't be sent");
            }
        );
    }

    function notifyError(error){
        var alert_html =
            "<div class='alert alert-fixed alert-danger fade in'>"+
            "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+
            "<p class='text-center'>"+error.toUpperCase()+"</p>"+
            "</div>";
        clearErrors();
        error_container.append(alert_html);
    }

    function clearErrors(){
        error_container.empty();
    }

    message_input.keypress(function(e) {
        if(e.which == 13) {
            if(e.target.value.trim().length == 0){
                return;
            }
            sendMessage();
            e.target.value = '';
        }
    });
    setInterval(function(){fetchMessages();},500);
});
