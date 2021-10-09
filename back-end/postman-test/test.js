//HTTP GET request on /nsoric/auth/application/{id} with correct id
pm.test("Status Code is 200 and has JSON body", () => {
  pm.response.to.not.be.error;
  pm.response.to.have.status(200);

  pm.response.to.have.jsonBody();
  pm.response.to.not.have.jsonBody("error");
});

pm.test("Content-Type is present and is equal to application/json", () => {
  pm.response.to.have.header("Content-Type");
  pm.expect(pm.response.headers.get("Content-Type")).to.eql(
    "application/json; charset=utf-8"
  );
});

pm.test("Response time is less than 200ms", () => {
  pm.expect(pm.response.responseTime).to.be.below(200);
});

pm.test("Path ID is equal to response ID", () => {
  let pathNum = pm.request.url.getPath();
  let jsonData = pm.response.json();
  let appId = jsonData[0].apps.id;

  pm.expect(appId).to.eql(parseInt(pathNum[25]));
});

pm.test("Apps server_id is equal to Servers id", () => {
  let jsonData = pm.response.json();
  let appsServerId = jsonData[0].apps.server_id;
  let serverId = jsonData[0].servers.id;

  pm.expect(appsServerId).to.eql(serverId);
});

//HTTP GET request on /nsoric/auth/application/{id} with incorrect id
pm.test("Status Code is 400 and has JSON body", () => {
  pm.response.to.be.error;
  pm.response.to.have.status(400);

  pm.response.to.have.jsonBody();
  pm.response.to.have.jsonBody("error");
});

pm.test("In response is error message and response time is less than 200ms", () => {
    let jsonData = pm.response.json();

    pm.expect(jsonData.error).to.have.property('message');
    pm.expect(pm.response.responseTime).to.be.below(200);
  }
);

//HTTP DELETE request on /nsoric/auth/application/{id} with correct id
pm.test("Status Code is 200 and has JSON body", () => {
  pm.response.to.not.be.error;
  pm.response.to.have.status(200);

  pm.response.to.have.jsonBody();
  pm.response.to.not.have.jsonBody("error");
});

pm.test("Content-Type is present and is equal to application/json", () => {
  pm.response.to.have.header("Content-Type");
  pm.expect(pm.response.headers.get("Content-Type")).to.eql(
    "application/json; charset=utf-8"
  );
});

pm.test("Response time is less than 200ms", () => {
  pm.expect(pm.response.responseTime).to.be.below(200);
});

pm.test("Path ID is equal to response ID", () => {
  let pathNum = pm.request.url.getPath();
  let jsonData = pm.response.json();
  let resId = jsonData.message[12];

  pm.expect(resId).to.eql(pathNum[25]);
});

pm.test("Status is true", () => {
  let jsonData = pm.response.json();
  let resStatus = jsonData.status;

  pm.expect(resStatus).to.eql(true);
});

//HTTP DELETE request on /nsoric/auth/application/{id} with incorrect id
pm.test("Status Code is 400 and has JSON body", () => {
  pm.response.to.be.error;
  pm.response.to.have.status(400);

  pm.response.to.have.jsonBody();
  pm.response.to.have.jsonBody("error");
});

pm.test("Status is false", () => {
  let jsonData = pm.response.json();
  let resStatus = jsonData.error.status;

  pm.expect(resStatus).to.eql(false);
  }
);

//HTTP POST request on /nsoric/auth/application/ with correct data
pm.test("Status Code is 201 and has JSON body", () => {
  pm.response.to.not.be.error;
  pm.response.to.have.status(201);

  pm.response.to.have.jsonBody();
  pm.response.to.not.have.jsonBody("error");
});

pm.test("Content-Type is present and is equal to application/json", () => {
  pm.response.to.have.header("Content-Type");
  pm.expect(pm.response.headers.get("Content-Type")).to.eql(
    "application/json; charset=utf-8"
  );
});

pm.test("Response time is less than 300ms", () => {
  pm.expect(pm.response.responseTime).to.be.below(300);
});

pm.test("Status is true", () => {
  let jsonData = pm.response.json();
  let resStatus = jsonData.status;

  pm.expect(resStatus).to.eql(true);
});


//HTTP POST request on /nsoric/auth/application/ with incorrect data
pm.test("Status Code is 400 and has JSON body", () => {
  pm.response.to.be.error;
  pm.response.to.have.status(400);

  pm.response.to.have.jsonBody();
  pm.response.to.have.jsonBody("error");
});

pm.test("Status is false", () => {
  let jsonData = pm.response.json();
  let resStatus = jsonData.error.status;

  pm.expect(resStatus).to.eql(false);
  }
);

//HTTP PUT request on /nsoric/auth/application/ with correct data
pm.test("Status Code is 200 and has JSON body", () => {
  pm.response.to.not.be.error;
  pm.response.to.have.status(200);

  pm.response.to.have.jsonBody();
  pm.response.to.not.have.jsonBody("error");
});

pm.test("Content-Type is present and is equal to application/json", () => {
  pm.response.to.have.header("Content-Type");
  pm.expect(pm.response.headers.get("Content-Type")).to.eql(
    "application/json; charset=utf-8"
  );
});

pm.test("Response time is less than 300ms", () => {
  pm.expect(pm.response.responseTime).to.be.below(300);
});

pm.test("Status is true", () => {
  let jsonData = pm.response.json();
  let resStatus = jsonData.status;

  pm.expect(resStatus).to.eql(true);
});

pm.test("Path ID is equal to response ID", () => {
  let pathNum = pm.request.url.getPath();
  let jsonData = pm.response.json();
  let resId = jsonData.message[5];

  pm.expect(resId).to.eql(pathNum[25]);
});

//HTTP PUT request on /nsoric/auth/application/ with incorrect data
pm.test("Status Code is 400 and has JSON body", () => {
  pm.response.to.be.error;
  pm.response.to.have.status(400);

  pm.response.to.have.jsonBody();
  pm.response.to.have.jsonBody("error");
});

pm.test("Status is false", () => {
  let jsonData = pm.response.json();
  let resStatus = jsonData.error.status;

  pm.expect(resStatus).to.eql(false);
  }
);
