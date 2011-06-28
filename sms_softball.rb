require "google_spreadsheet"
require "sinatra"
require "json"
require "smsified"

post '/' do
   response = JSON.parse(request.env["rack.input"].read)
                             
   message =  response["inboundSMSMessageNotification"]["inboundSMSMessage"]["message"]
   callerID =  response["inboundSMSMessageNotification"]["inboundSMSMessage"]["senderAddress"]
   trigger = message[0..1]
   datetime = message[3..message.length]
   
   if trigger == "Go"
    
    smsified = Smsified::OneAPI.new(:username => 'sms_user', :password => 'sms_pass')
    oneapi.send_sms :sender_address => '13215550100', :address => ['14075550100', '19545550100', '13055550100'], :message => "Can you make it to the game on #{datetime}?"

   else
    session = GoogleSpreadsheet.login("goog_user", "goog_pass")
    ws = session.spreadsheet_by_key("YOUR_SPREADSHEET_KEY").worksheets[0]

    if callerID == "tel:+14075550100" 
      ws[2, 1] = message
      ws.save()
    elsif callerID == "tel:+19545550100" 
      ws[2, 2] = message
      ws.save()
    elsif callerID == "tel:+13055550100" 
      ws[2, 3] = message
      ws.save()
    else
      p "Not on the list"
    end
    
  end
  
end