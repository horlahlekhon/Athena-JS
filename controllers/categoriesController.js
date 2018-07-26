'use strict';

var request = require("request")
var express = require("express")
const logger = require('morgan')

var categories = require('../models').categories

var JCategory = {
    url: "https://authenticjobs.com/api/?api_key=773918dd6e534968aea99da39185983d&method=aj.categories.getList&format=json",
    headers: {
        'Content-type': 'application/json'
    }
}

function job_category(error, response, body) {
    if (!error && response.statusCode == 200) {
        action = JSON.parse(body)

        for (var i = 0; i < action.category.length; i++) {
            categories.build({ categoryid: action.categories.category[i].id, categoryname: action.categories.category[i].name }).save()

            express.use(logger("total of " + i + " categories saved"))
        }

    } else {
        console.log("error " + error, response.statusCode)
    }
}
//request.get(JCategory, job_category);