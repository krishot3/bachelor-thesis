/* eslint-disable no-unused-vars */
const Service = require('./Service');
const authentication = require('../authentication');

 // let options = {sql: sqlString, nestTables: true, values: [id]};
let options = (sqlString, instValue) => {
  return {sql: sqlString, nestTables: true, values: [instValue]};
};

class AuthService {

  /**
   * Delete application detail
   * Delete application details. Only for system admin.
   *
   * id Integer application ID
   * returns StateResponse
   **/
  static authApplicationIdDELETE({ id }) {
    return new Promise(
      async (resolve) => {
        try {
          authentication.pool.query("DELETE FROM apps WHERE id = ?", [id], (err, result) => {
            if(err) {
              resolve(Service.rejectResponse({'status': false, 'message': "Internal server error"}));
            } else if(result.affectedRows === 0) {
              resolve(Service.rejectResponse({'status': false, 'message': "ID doesn't exist"}, 400));
            } else {
              resolve(Service.successResponse({'status': true, 'message': `Application ${id} deleted`}, 200));
            }
          });
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Get application detail
   * Return application details. Only for system admin.
   *
   * id Integer ID of application
   * returns LoginApplication
   **/
  static authApplicationIdGET({ id }) {
    return new Promise(
      async (resolve) => {
        try {
          let sqlString = "SELECT * FROM apps INNER JOIN servers ON apps.server_id = servers.id WHERE apps.id = ?";
          authentication.pool.query(options(sqlString, id), (err, result) => {
              if (err) {
                resolve(Service.rejectResponse({'message': "Internal server error"}));
              } else if (result.length === 0) {
                resolve(Service.rejectResponse({'message': "ID doesn't exist"}, 400));
              } else {
                resolve(Service.successResponse(result, 200));
              }
          });
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Edit application detail
   * Edit  application details. Only for system admin.
   *
   * id Integer application ID
   * loginApplication LoginApplication 
   * returns StateResponse
   **/
  static authApplicationIdPUT( id, loginApplication) {
    return new Promise(
      async (resolve) => {
        try {
          let appId = id.id;
          let appData = Object.values(id.body);
          //Spravene pre front-end, pri POSTMANovi vymazat shift
          appData.shift();
          appData.push(appId);
          let sqlString = "UPDATE apps SET name = ?, host = ?, description = ?, "+
          "db_host = ?, db_user = ?, db_password = ?, db_name = ?, jwt_secret2 = ?, "+
          "company_id = ?, enabled = ?, server_id = ? WHERE apps.id = ?";
        
          authentication.pool.query(sqlString, appData, (err, res) => {
            if (err) {
              resolve(Service.rejectResponse({'status': false, 'message': "Apps data not changed"}, 400));
              console.log(err);
            } else {
              resolve(Service.successResponse({'status': true, 'message': `Apps ${appId} data changed`}, 200));
            }
          });
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Save new application detail
   * Return application details. Only for system admin.
   *
   * loginApplication LoginApplication 
   * returns StateResponse
   **/
  static authApplicationPOST( loginApplication ) {
    return new Promise(
      async (resolve) => {
        try {
          let appData = Object.values(loginApplication.body);
          let sqlString = "INSERT INTO apps (name, host, description, db_host, db_user, "+
          "db_password, db_name, jwt_secret2, company_id, enabled, server_id) "+
          "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
          
          authentication.pool.query(sqlString, appData, (err, res) => {
            if (err) {
              resolve(Service.rejectResponse({'status': false, 'message': "Apps data not added"}, 400));
            } else {
              resolve(Service.successResponse({'status': true, 'message': "Apps data added"}, 201));
            }
          });
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Remove application from company
   * Remove existing application from exiting company
   *
   * idUnderscorecompany BigDecimal ID of existing company
   * idUnderscoreapplication BigDecimal ID of existing application
   * returns StateResponse
   **/
  static authCompanyApplicationDELETE({ idUnderscorecompany, idUnderscoreapplication }) {
    return new Promise(
      async (resolve) => {
        try {
          resolve(Service.successResponse(''));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Get list of company applications
   * Allowed only for system admin
   *
   * id BigDecimal ID of existing company
   * returns List
   **/
  static authCompanyApplicationIdGET({ id }) {
    return new Promise(
      async (resolve) => {
        try {
          resolve(Service.successResponse(''));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Get list of all companies.
   * Get list of all companies is allowed only for admin
   *
   * returns List
   **/
  static authCompanyGET() {
    return new Promise(
      async (resolve) => {
        try {
          resolve(Service.successResponse(''));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Get company detail
   * Return company details based on ID
   *
   * id BigDecimal Company ID
   * returns LoginCompany
   **/
  static authCompanyIdGET({ id }) {
    return new Promise(
      async (resolve) => {
        try {
          resolve(Service.successResponse(''));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Edit company detail
   * Edit company details. Parts, whitch will be not included, will be not modified.
   *
   * id BigDecimal Company ID
   * loginCompany LoginCompany 
   * returns StateResponse
   **/
  static authCompanyIdPUT({ id, loginCompany }) {
    return new Promise(
      async (resolve) => {
        try {
          resolve(Service.successResponse());
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Store new company detail
   * Store new company detail in Login database
   *
   * loginCompany LoginCompany 
   * returns StateResponse
   **/
  static authCompanyPOST({ loginCompany }) {
    return new Promise(
      async (resolve) => {
        try {
          resolve(Service.successResponse(''));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Login to system
   * First action have to be authorized to access to other parts of System. Response contains of JWT toket, that have to be usen in header o each of next messages. This is first step in login process. This step can not be skipped.
   *
   * login String login to system
   * password String user's password
   * returns LoginUserObject
   **/
  static authLoginPOST( login, password ) {
    return new Promise(
      async (resolve) => {
        try {
          resolve(Service.successResponse(''));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Remove user from company
   * Remove existing user from existing company
   *
   * idUnderscoreuser BigDecimal ID of existing user
   * idUnderscorecompany BigDecimal ID of existing company
   * returns StateResponse
   **/
  static authUserCompanyDELETE({ idUnderscoreuser, idUnderscorecompany }) {
    return new Promise(
      async (resolve) => {
        try {
          resolve(Service.successResponse(''));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Get list of users related to company
   * Remove existing user from existing company
   *
   * idUnderscorecompany BigDecimal ID of existing company
   * returns List
   **/
  static authUserCompanyGET({ idUnderscorecompany }) {
    return new Promise(
      async (resolve) => {
        try {
          resolve(Service.successResponse(''));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Add user to company
   * Add existing user to existing company and define user rights
   *
   * inlineObject InlineObject 
   * returns StateResponse
   **/
  static authUserCompanyPOST({ inlineObject }) {
    return new Promise(
      async (resolve) => {
        try {
          resolve(Service.successResponse(''));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Get list of all users
   * Return list of all users as objects. Action is allowed for SystemAdmin only.
   *
   * returns List
   **/
  static authUserGET() {
    return new Promise(
      async (resolve) => {
        try {
          resolve(Service.successResponse(''));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Delete user
   * Delete user.With deleting user, the userRoels is also deleted
   *
   * login String User login
   * returns AppUser
   **/
  static authUserLoginDELETE({ login }) {
    return new Promise(
      async (resolve) => {
        try {
          resolve(Service.successResponse(''));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Get user detail
   * Return users related objects: allowed applications, user details. User have to be authentificated by /auth/login/ first.
   *
   * login String Users login
   * returns LoginUser
   **/
  static authUserLoginGET({ login }) {
    return new Promise(
      async (resolve) => {
        try {
          resolve(Service.successResponse(''));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Update user detail
   * Update user datails. All item s in data structure 'user' is optional. If is not provided, there wil be no change with this field.
   *
   * login BigDecimal User ID
   * loginUser LoginUser 
   * returns StateResponse
   **/
  static authUserLoginPUT({ login, loginUser }) {
    return new Promise(
      async (resolve) => {
        try {
          resolve(Service.successResponse(''));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Add new user
   * Adding new user to database
   *
   * loginUser LoginUser 
   * returns AppUser
   **/
  static authUserPOST({ loginUser }) {
    return new Promise(
      async (resolve) => {
        try {
          resolve(Service.successResponse(''));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

}

module.exports = AuthService;
