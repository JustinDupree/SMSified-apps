var http = require('http');
var express = require('express');
var querystring = require('querystring'); 
var app = express.createServer();
 
app.configure(function(){
    app.use(express.bodyParser());
});
 
app.post('/', function(req, res){
     
	var callerID = req.body['inboundSMSMessageNotification']['inboundSMSMessage']['senderAddress'];
	var message = req.body['inboundSMSMessageNotification']['inboundSMSMessage']['message'];
	var my_number = '14075550100';
	var complete_msg = "The callerID is " + callerID + " and they said " + message;

	var post_data = querystring.stringify({  
		'address' : my_number,  
		'message': complete_msg  
	});  
    
	var post_options = {  
		host: 'api.smsified.com',  
		port: '80',  
		path: '/v1/smsmessaging/outbound/15855550100/requests',  
		method: 'POST',  
		headers: {  
			'Content-Type': 'application/x-www-form-urlencoded',  
			'Content-Length': post_data.length,
			'Authorization':"Basic "+ new Buffer('username' + ":" + "password").toString('base64') 
		}  
	};  


	var post_req = http.request(post_options, function(res) {  
		res.setEncoding('utf8');  
		res.on('data', function (chunk) {  
			console.log('Response: ' + chunk);  
		});  
	});  
  
	// write parameters to post body  
	post_req.write(post_data);  
	post_req.end();  
	res.end();
	
});
 
app.listen(10056);