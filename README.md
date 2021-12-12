# Notifications - APIs

A notification service for sending SMS and E-mail notifications..

## Technologies

- Runtime environment: [Node](https://nodejs.org/)
- Backend framework: [Express.js](https://expressjs.com/)

## Installation

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

## Features

- Request an API token
- Approve/Reject a request
- Send a notification using the requested token

## Quick Start

The quickest way to setup Sneaker app is as shown below:

```
git clone git@github.com:AJAkimana/notifications-api.git
cd notifications-api
```

Install dependencies:

```bash
$ npm install
```

Start the server:

```bash
$ npm run start
```

Run local tests:

```bash
$ npm run test
```

## API Specs:

### Request a token.

POST `api/notifications/request`.  
request body:

```
{
    "usernames":"Client name",
    "email":"the.client@email",
    "website":"client.website"
}
```

### Approve or reject a request.

POST `api/notifications/activate/{The request id}`.  
request body:

```
{
	"status":"REJECTED|APPROVED",
}
```

### Send a notification.

POST `api/notifications/send?clientToken={The activated client token}`.  
request body:

```
{
    "to":"{Receiver email or phone number}",
    "body":"{A body of the notification}",
    "type":"EMAIL|SMS"
}
```

## The current maintainer:

[Akimana Jean D'Amour](https://github.com/AJAkimana)
