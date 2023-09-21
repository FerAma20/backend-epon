const { Request, Response, NextFunction } = require('express');
const { CustomError } = require('../types/CustomError');

var path = require('path');
var filePath = path.resolve('data/Configuration.js');
var configuration = require(filePath);
var responseManager = require('../managers/responseManager');
var errorManager = require('../managers/errorManager');
const sqlDriver = require('../database/SQLDriver');

//Api Calendar Google
const fs = require('fs');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

const FILENAME = 'CalendarGoogleController.js';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));

const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

// Configura el token de acceso
const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
oAuth2Client.setCredentials(token);

//Crear un nuevo evento


exports.createEvent = async function(req,res) {
  console.log('oAuth2Client - '+ oAuth2Client)
  const functionname = 'createEventCalendarGoogle';
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  const data = req.body;
console.log(data);
  var event = {
    'summary': data.nameEvent,
    'location': 'Universidad de San Carlos de Guatemala',
    'description': data.description,
    'role': 'owner',
    'start': {
      'dateTime': data.dateI,
      'timeZone': 'America/Guatemala',
    },
    'end': {
      'dateTime': data.dateF,
      'timeZone': 'America/Guatemala',
    },
    'conferenceData': {
      'createRequest': {
          'requestId' :'7qxalsvy0e'
      }
    },
    'organizer': {
      'email': data.mailOrganizer,
    }
    ,
    'attendees': [
      { 'email': data.mailOrganizer,
        'organizer': true
    }
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    }
  };

  try {
    console.log('Path token - ' + TOKEN_PATH)
    console.log('Path credenciales - ' + CREDENTIALS_PATH)
    const response = await calendar.events.insert({
      calendarId: '13o8k2hdmf0n39lb37edc17vik@group.calendar.google.com', // 'primary' representa el calendario principal del usuario
      resource: event,
      conferenceDataVersion: 1
    });

    
    console.log('Evento creado:', response.data.hangoutLink);

    return responseManager.sendResponseWithDocument(res,response.data.hangoutLink);
  } catch (error) {
    console.error('Error al crear el evento:', error);
    return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, error);
  }
}

 exports.getCalendar =async function (eq,res) {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  try {
    const response = await calendar.calendarList.list();
    const calendars = response.data.items;

    calendars.forEach((calendar) => {
      console.log('Calendar ID:', calendar.id);
      console.log('Summary:', calendar.summary);
      console.log('Description:', calendar.description);
      console.log('-----------------------------');
    });

    return responseManager.sendResponseWithDocument(res,calendars);
  } catch (error) {
    console.error('Error al obtener los calendarios:', error);
    return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, error);
  }
}