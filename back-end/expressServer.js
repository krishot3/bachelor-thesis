// const { Middleware } = require('swagger-express-middleware');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { OpenApiValidator } = require('express-openapi-validator');
const openapiRouter = require('./utils/openapiRouter');
const logger = require('./logger');
const jwt = require('jsonwebtoken');
const authentication = require('./authentication');

const someAuth = (req, res, next) => {
  res.status(400).json({ message: "Test1" });
}

class ExpressServer {
  constructor(port, openApiYaml) {
    this.port = port;
    this.app = express();
    this.openApiPath = openApiYaml;
    this.schema = yamljs.load(openApiYaml);
    this.setupMiddleware();
  }

  setupMiddleware() {
    // this.setupAllowedMedia();
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use('/spec', express.static(path.join(__dirname, 'api')));
    this.app.get('/hello', (req, res) => res.send('Hello World. path: '+this.openApiPath));
    this.app.get('/spec', express.static(this.openApiPath));
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(this.schema));

    this.app.use((req, res, next) => {
        let authStr = req.headers.authorization;
        if (typeof authStr !== 'undefined') {
            if (authStr.startsWith("Basic")) {
              return authentication.basicAuth(req, res, next);

            } else if (authStr.startsWith("Bearer")) {
              return authentication.jwtAuth(req, res, next);

            } else if (authStr.startsWith("ApiKey")) {
              return authentication.apiKeyAuth(req, res, next);

            } else if (authStr.startsWith("Oauth")) {
              return authentication.oAuth2(req, res, next);

            }
        } else {
          res.status(401).json({ message: "API doesn't support this type of authentication" });
        }     
    });

    this.app.post('/login', (req, res) => {
      let userData = req.headers.authorization.split(' ')[1];
      let credentials = Buffer.from(userData, 'base64').toString('ascii');
      let userName = credentials.split(':', 1);
      
      if (req.body.basic == "yes") {
        res.status(200).send({userData});

      } else if (req.body.jwt == "yes") {
        let payload = {data: userName};
        let token = jwt.sign(payload, 'secureKey', { expiresIn: '1800s' });
        res.status(200).send({token});

      } else if (req.body.apikey == "yes") {
        return authentication.apiKeyGen(userName, res);
      }
    });

    this.app.patch('/logoutApiKey', (req, res) => {
      return authentication.apiKeyLogOut(req, res);
    });

    this.app.get('/tabledata', (req, res) => {
      authentication.tableData(req, res);
    });

    this.app.get('/login-redirect', (req, res) => {
      res.status(200);
      res.json(req.query);
    });
    this.app.get('/oauth2-redirect.html', (req, res) => {
      res.status(200);
      res.json(req.query);
    });
    new OpenApiValidator({
      apiSpecPath: this.openApiPath,
    }).install(this.app);
    this.app.use(openapiRouter());
    this.app.get('/', (req, res) => {
      res.status(200);
      res.end('Hello World');
    });
  }

  addErrorHandler() {
    this.app.use('*', (req, res) => {
      res.status(404);
      res.send(JSON.stringify({ error: `path ${req.baseUrl} doesn't exist` }));
    });
    /**
     * suppressed eslint rule: The next variable is required here, even though it's not used.
     *
     ** */
    // eslint-disable-next-line no-unused-vars
    this.app.use((error, req, res, next) => {
      const errorResponse = error.error || error.errors || error.message || 'Unknown error';
      res.status(error.status || 500);
      res.type('json');
      res.json({ error: errorResponse });
    });
  }

  async launch() {
    return new Promise(
      async (resolve, reject) => {
        try {
          this.addErrorHandler();
          this.server = await this.app.listen(this.port, () => {
            console.log(`server running on port ${this.port}`);
            resolve(this.server);
          });
        } catch (error) {
          reject(error);
        }
      },
    );
  }

  async close() {
    if (this.server !== undefined) {
      await this.server.close();
      console.log(`Server on port ${this.port} shut down`);
    }
  }
}

module.exports = ExpressServer;
