var sys = require('sys');
var express = require('express');
var app = express.createServer();
var smsified = require('smsified');
 
app.configure(function(){
    app.use(express.bodyParser());
});
 
app.post('/', function(req, res){
     
	var callerID = req.body['inboundSMSMessageNotification']['inboundSMSMessage']['senderAddress'];
	var message = req.body['inboundSMSMessageNotification']['inboundSMSMessage']['message'];
	var my_number = '14075550100';
	var complete_msg = "The callerID is " + callerID + " and they said " + message;

	var sms = new SMSified('username', 'password');
	var options = {senderAddress: '15855550100', address: my_number, message: complete_msg};
	
	sms.sendMessage(options, function(result) {
		sys.puts(sys.inspect(result));
	});
	
	res.end();
});
 
app.listen(10056);