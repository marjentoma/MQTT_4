
// var client  = mqtt.connect({ host:'test.mosquitto.org', port: 8081})
// or
var client = mqtt.connect($('#broker-input').val());

// var client  = mqtt.connect({ host:'mqtt.eclipse.org/mqtt', port: 443})
// or
// var client  = mqtt.connect('wss://mqtt.eclipse.org:443/mqtt')

$('#connector').click(function(){
  client.on('connect', function () {
    $('#connector').html("Connected");
    console.log("Connected");
    $('#subscribeButton').on('click', () => {
      client.subscribe($('#subscribeTopic').val(), function (err) {
        $('#topic3').append("<p>"+$('#subscribeTopic').val().toString()+"</p>");
        $('#message3').append("<p>"+new Date().toString()+"</p>");
        if (!err) {
          client.publish($('#publishTopic').val(), $('#publishPayload').val());
          console.log($('#publishTopic').val()+" "+$('#publishpayload').val())
          console.log("Topic exist");
        } else {
          alert("Topic does not exist");
        }
      })

    })
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(topic.toString())
  console.log(message.toString())
  $('#topic1').append("<p>"+topic.toString()+"</p>");
  $('#payload1').append("<p>"+message.toString()+"</p>");
  $('#message1').append("<p>"+new Date().toString()+"</p>")
  //   client.end()
})


$('#publishButton').on('click', () => {

  client.publish($('#publishTopic').val(), $('#publishPayload').val());
  $('#topic2').append("<p>"+$('#publishTopic').val().toString()+"</p>");
  $('#payload2').append("<p>"+$('#publishPayload').val().toString()+"</p>");
  $('#message2').append("<p>"+new Date().toString()+"</p>");
})