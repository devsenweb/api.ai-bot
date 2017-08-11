const express = require('express')
var bodyParser = require('body-parser')
var app = express()
var https = require('http');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.post('/webhook', function (req, res) {


   var result = req.body["result"];

    var action = result["action"];
    console.log("which method to call:",action)

    switch (action) {
        case "create.case":
            return createCase (req,res);

        case "get.claimstatus":
          return getClaimStatus (req,res);

        case "get.casestatus":
            return getCaseStatus (req,res);

        default:
            return null;
    }


})

function getCaseStatus (req,res){

    console.log("inside getCasestatus");
    var parameters = req.body.result.contexts[0].parameters;
    var casenumber = parameters.number;
    console.log("case number:" ,casenumber);
//var jsonObject = JSON.stringify({"request": {"PolicyNumber": "3322","IncidentNumber": "CAS-00009-T4R8B7","Data": "Is that My Claim Resolved"}});
	var jsonObject = JSON.stringify({"request": {"PolicyNumber": "11111111","IncidentNumber": casenumber,"Data": "asdfasdf"}});
	//jsonObject = JSON.stringify({"request": {"PolicyNumber": policynumber,"Data": any}});
	// prepare the header
	var postheaders = {
		'Content-Type' : 'application/json'
	};

	// the post options
	var optionspost = {
		host : '5fbafa2f0e824e3989f9627c568c53aa.cloudapp.net',
		path : 'http://5fbafa2f0e824e3989f9627c568c53aa.cloudapp.net/Service1.svc/GetStatus',
		method : 'POST',
		headers : postheaders

	};

	console.info('Options prepared:');
	console.info(optionspost);
	console.info('Do the POST call');

	// do the POST call
	var reqPost = https.request(optionspost, function(response) {
		console.log("statusCode: ", response.statusCode);

		// uncomment it for header details
		//  console.log("headers: ", res.headers);

		var body = '';
		response.on('data', function(d) {
			   body += d;
		});
		response.on('end', function() {

		// Data reception is done, do whatever with it!
		console.log(body);
		var parsed = JSON.parse(body);
		console.log(parsed.GetStatusResult.Status);
		var casestatus = parsed.GetStatusResult.Status;
		//var messagestring = 'Hi Andy, your case for '+ policynumber +' is created and the case number is ' +casenumber;
  	   var messagestring ;
  	    if (casestatus=="unknown")
  	    {
  	          	     messagestring = 'Your case number could not be found. Please check your number';

  	    }
  	    else
  	    {
  	        messagestring = 'Your case status is '+casestatus;
  	    }
  	    //Default response from the webhook to show it's working

	   res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  	    res.send(JSON.stringify({ "speech": messagestring, "displayText": messagestring
  	    //"speech" is the spoken version of the response, "displayText" is the visual version
  	    }));
		});
	});

	// write the json data
	reqPost.write(jsonObject);
	reqPost.end();
// 	reqPost.on('error', function(e) {
//     console.log("code errored");
//     console.error(e);

//      var messagestring = 'Oops!!! Something went wrong';

//   	    //Default response from the webhook to show it's working

// 	   res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
//   	    res.send(JSON.stringify({ "speech": messagestring, "displayText": messagestring
//   	    //"speech" is the spoken version of the response, "displayText" is the visual version
//   	    }));
// 	});

};



function createCase (req,res){

    console.log("inside createcase");
    var parameters = req.body.result.contexts[1].parameters;
    var policynumber = parameters["number-integer"];
	var any = req.body.result.contexts[1].parameters.any;
	var casenumber = getRandomInt(10000000,50000000);


	console.log("policy number", policynumber);
	console.log("case query text", any);

	var jsonObject = JSON.stringify({"request": {"PolicyNumber": policynumber,"IncidentNumber": casenumber,"Data": any}});
	//jsonObject = JSON.stringify({"request": {"PolicyNumber": policynumber,"Data": any}});
	// prepare the header
	var postheaders = {
		'Content-Type' : 'application/json'
	};

	// the post options
	var optionspost = {
		host : '5fbafa2f0e824e3989f9627c568c53aa.cloudapp.net',
		path : 'http://5fbafa2f0e824e3989f9627c568c53aa.cloudapp.net/Service1.svc/SaveData',
		method : 'POST',
		headers : postheaders

	};

	console.info('Options prepared:');
	console.info(optionspost);
	console.info('Do the POST call');

	// do the POST call
	var reqPost = https.request(optionspost, function(response) {
		console.log("statusCode: ", response.statusCode);

		// uncomment it for header details
		//  console.log("headers: ", res.headers);

		var body = '';
		response.on('data', function(d) {
			   body += d;
		});
		response.on('end', function() {

		// Data reception is done, do whatever with it!
		console.log(body);
		var parsed = JSON.parse(body);
		console.log(parsed.SaveDataResult.Status);
		casenumber = parsed.SaveDataResult.Status;
		//var messagestring = 'Hi Andy, your case for '+ policynumber +' is created and the case number is ' +casenumber;

  	    var messagestring = 'Hi Andy, Your case number is '+casenumber+' for the provided policy number '+ policynumber+ '. Please allow us to look at your query and we will respond to you within 24 hours';

  	    //Default response from the webhook to show it's working

	   res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  	    res.send(JSON.stringify({ "speech": messagestring, "displayText": messagestring
  	    //"speech" is the spoken version of the response, "displayText" is the visual version
  	    }));
		});
	});

	// write the json data
	reqPost.write(jsonObject);
	reqPost.end();
// 	reqPost.on('error', function(e) {
//     console.error(e);

//      var messagestring = 'Oops!!! Something went wrong';

//   	    //Default response from the webhook to show it's working

// 	   res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
//   	    res.send(JSON.stringify({ "speech": messagestring, "displayText": messagestring
//   	    //"speech" is the spoken version of the response, "displayText" is the visual version
//   	    }));

// 	});

};

function getClaimStatus (req,res){

console.log("inside getclaimstatus");
	var policynumber = req.body.result.contexts[0].parameters.number; // city is a required param
	console.log(policynumber);



  	response = 'Hi Andy, Your Claim (2017 9933 223344 12) on the policy number '+policynumber+' is currently pending for Appraiser Valuation' ;
  	//Default response from the webhook to show it's working



	res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  	res.send(JSON.stringify({ "speech": response, "displayText": response
  	//"speech" is the spoken version of the response, "displayText" is the visual version
  	}));
	};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  console.error(err);
  res.status(500).send({"speech": "Oops!!! something went wrong", "displayText": "Oops!!! something went wrong"});
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})