const Controller = require('./Controller');
// const authentication = require('../authentication');

class AuthController {
  constructor(Service) {
    this.service = Service;
  }

  async authApplicationIdDELETE(request, response) {
    await Controller.handleRequest(request, response, this.service.authApplicationIdDELETE);
  }

  async authApplicationIdGET(request, response) {
    await Controller.handleRequest(request, response, this.service.authApplicationIdGET);
  }

  async authApplicationIdPUT(request, response) {
    await Controller.handleRequest(request, response, this.service.authApplicationIdPUT);
  }

  async authApplicationPOST(request, response) {
    await Controller.handleRequest(request, response, this.service.authApplicationPOST);
  }

  async authCompanyApplicationDELETE(request, response) {
    await Controller.handleRequest(request, response, this.service.authCompanyApplicationDELETE);
  }

  async authCompanyApplicationIdGET(request, response) {
    await Controller.handleRequest(request, response, this.service.authCompanyApplicationIdGET);
  }

  async authCompanyGET(request, response) {
    await Controller.handleRequest(request, response, this.service.authCompanyGET);
  }

  async authCompanyIdGET(request, response) {
    await Controller.handleRequest(request, response, this.service.authCompanyIdGET);
  }

  async authCompanyIdPUT(request, response) {
    await Controller.handleRequest(request, response, this.service.authCompanyIdPUT);
  }

  async authCompanyPOST(request, response) {
    await Controller.handleRequest(request, response, this.service.authCompanyPOST);
  }

  async authLoginPOST(request, response) {
    await Controller.handleRequest(request, response, this.service.authLoginPOST);
  }

  async authUserCompanyDELETE(request, response) {
    await Controller.handleRequest(request, response, this.service.authUserCompanyDELETE);
  }

  async authUserCompanyGET(request, response) {
    await Controller.handleRequest(request, response, this.service.authUserCompanyGET);
  }

  async authUserCompanyPOST(request, response) {
    await Controller.handleRequest(request, response, this.service.authUserCompanyPOST);
  }

  async authUserGET(request, response) {
    await Controller.handleRequest(request, response, this.service.authUserGET);
  }

  async authUserLoginDELETE(request, response) {
    await Controller.handleRequest(request, response, this.service.authUserLoginDELETE);
  }

  async authUserLoginGET(request, response) {
    await Controller.handleRequest(request, response, this.service.authUserLoginGET);
  }

  async authUserLoginPUT(request, response) {
    await Controller.handleRequest(request, response, this.service.authUserLoginPUT);
  }

  async authUserPOST(request, response) {
    await Controller.handleRequest(request, response, this.service.authUserPOST);
  }

}

module.exports = AuthController;
