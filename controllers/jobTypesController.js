'use strict';

var request = require("request")
var express = require("express")
const logger = require('morgan')

//calling the model jobType from models
const jobType = require('../models').jobtypes

var JType = {
    url: "https://authenticjobs.com/api/?api_key=773918dd6e534968aea99da39185983d&method=aj.types.getList&format=json",
    headers: {
        'Content-type': 'application/json'
    }
}

function job_type(error, response, body) {
    if (!error && response.statusCode == 200) {
        action = JSON.parse(body)

        //    Passing JSON to DB  
        for (var i = 0; i < action.type.length; i++) {
            jobType.build({
                typeid: action.types.type[i].id,
                typename: action.types.type[i].name

            }).save()
            express.use(logger("total of " + i + " job types saved"))
        }

    } else {
        console.log("error " + error, response.statusCode)
        express.use(logger("error ->> " + error + "witrh code ->> " + statusCode))
    }
}

