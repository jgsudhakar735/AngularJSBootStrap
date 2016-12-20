var REST_SERVICE_URL = 'http://localhost:8081/AngularJSServices/';
/** switch APP_RUN_MODE to ONLINE / OFFLINE . Offline with take the dummy data from json and manipulate the data. 
* ONLINE means you need to run the java code which is included in the web/application server (like tomcat,jboss,WebSphere..) and map that 
* URL on the 'REST_SERVICE_URL' variable.
*/
var APP_RUN_MODE = 'OFFLINE'; 
var STUDENT_LIST = [];
var EMPLOYEE_LIST = [];
