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
	var complete_msg = "Caller: " + callerID + " -- Message: " + message;
	var sender = '15855550100';
	
	var reply_id = message.substr(0,11);
	var reply_msg = message.substr(12);
	
	var sms = new SMSified('username', 'password');
	
	if(callerID == "tel:+" + my_number) {
		var options1 = {senderAddress: sender, address: reply_id, message: reply_msg};

		sms.sendMessage(options1, function(result) {
			sys.puts(sys.inspect(result));
		});

		res.end();
	}
	
	else {
	
		var options2 = {senderAddress: sender, address: my_number, message: complete_msg};
	
		sms.sendMessage(options2, function(result) {
			sys.puts(sys.inspect(result));
		});
	
		res.end();
	}
});
 
app.listen(10056);