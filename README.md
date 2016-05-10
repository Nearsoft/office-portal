[![Build Status](https://travis-ci.org/echavezNS/portal-ns.svg?branch=master)](https://travis-ci.org/echavezNS/portal-ns)

# Office-Portal

In Nearsoft, culture is very important, it is considered one of the main pillars of the company, and, because the offices are in different cities, maintaining the same culture through this geographical barrier is a difficult task.

Office-Portal main objectives:

  * Connect the offices in real time
  * Share our culture naturally
  * Cohabitate with the other offices

## How to deploy locally

### Clone the project

`git clone https://github.com/Nearsoft/office-portal.git`

### Install the dependencies

In the office-portal folder install dependencies:

`npm install`

`bower install`

### Run the server
`npm start`

Go to [http://localhost:5000](http://localhost:5000) and you're all set!


## API
You can use the API for making the next actions:

#### Turn off the portal
| URL    | Request method |
| ----------------------- |
| /off   | POST           |
| params   | token        |

##### Where:
  token: A valid token taken from either the environment variables or defined in `config/index.js`

#### Turn on the portal
| URL    | Request method |
| ----------------------- |
| /on   | POST           |
| params   | token        |

##### Where:
  token: A valid token taken from either the environment variables or defined in `config/index.js`


### Testing
Run the tests:  

 `npm test`  

**To find more in-depth information about the project  
please visit our [wiki](https://github.com/Nearsoft/office-portal/wiki)**
