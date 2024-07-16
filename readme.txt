passport uses strategies
used as a middleware, internally uses express-session to store sessions.
We need to generally pass in the verify() function for the strategy to verify. this verify function will contain all the necessary things required for user authentication
Verify function requires varying number of arguements depending on strategies. example localstrategy requires username, password, done() callback as the arguements.
While using localstrategy we can chnage the set of arguements  and their names to vary based on the requirements by passing fileds object before the verify function.
To return successful authentication we need use the done() callback with done(null, user_details) to indicate successful login / signup of the user. We need to specify what all user_details will be stored in the session_store internally.
To return error we need to return done(null) or done(null, false, error) whichever based on requirement.
Once passport is configured then we need to configure the serializeUser and deserializeUser which are two important functions.
Here the serializeUse function is called only once when the user logs in. But the deserializeUser is called on every other requests after the user logs in to verufy the user.
To authenticate the user on requests we need to use passport.authenticate('strategy_name", {options} | callback) as a middleware to authenticate requests.
When the user is signing in for the first time serializeUser is called only once and deserializeUSer is called on every other request after the login is susccessfully done to verify the session.
The details which is sent through the done(null, user_details) is passed to the serializeUser and also the same is verified using the deserializeUSer() function. 
The user_details which is st are stored in the sessionStore.
Internally the express-session when the serializeUser() is called , after the session is stored in the sessionStore the server responds with a set_cookie : cookie.sid = encrypted(session_id) which is the default settings of express-sesion.
Subsequent request to the server are made with the cookie set as connect.sid , which the express-session decrypts the cookie using the its own mechanism and then extracts out the session_id and fetching the user and setting it to the req.sesion.user object which is by default the mechanism of express-session. 
deserializeUSer() function then needs to verify if the user in the session is actually present in the database. 
If everything succeeds then the user details would be stored in the req object (ex. req.user object) for the subseqent requests becuase it acts as a middleware.




-> Using google strategy there are few changes to keep in mind while using googleStrategy :

when we use the google strategy it requires two arguements when we configure the passport we need to pass another set of options before the verify function.
Those options include the googleclient id , googleclient secret and the callback url. The callback_url should be added as one of the registered callback_url in the google console.

When the user hits the endpoint which trequires authentication by google it will redirect the first time to the google page where the user needs to give permision to the app to use their details/ store them in the app. After the user has logged in / given permission the google console/ api sends back the user details as response and this profile / user details is passed as profile to the verify() function.

We nned to add another endpoint called prev_custom_base_url/google/callback where we need to use passport.authenticate() to set the user. In total there will be two urls related to the strategy when it comes to the google ,github etc. One is the main url which requires authentication and the other is the callback url. There can be multiple main routes which require authentication by google but one callback url is sufficient. the callback user is the one which supplies the profile to the verifyFunction(). 

We need to pass another set of options for the passport.authenticate() {scope : ['profile', 'email']} in the main routes. Very important. Else it will throw an error : { Sign in with Google
Access blocked: Authorization Error

user@gmail.com
Missing required parameter: scope Learn more about this error
} 

Rest of the thing similar to the localstrategy such as the function of serializeUser() and deserializeUSer()

if directly set the profile in the session it would look something like this : 
The req.user is :  {
  id: 'google_id',
  displayName: 'Biotite Warlock',
  name: { familyName: 'Warlock', givenName: 'Biotite' },
  emails: [ { value: 'your_email@gmail.com', verified: true } ],
  photos: [
    {
      value: 'the_https_link_user_photo_is_stored'
    }
  ],
  provider: 'google',
  _raw: '{\n' +
    '  "sub": "_sub_and_id_are_the_same_usedinterchangeably",\n' +
    '  "name": "Biotite Warlock",\n' +
    '  "given_name": "Biotite",\n' +
    '  "family_name": "Warlock",\n' +
    '  "picture": ""' +
    '  "email": "your_email@gmail.com",\n' +
    '  "email_verified": true\n' +
    '}',
  _json: {
    sub: '_sub_and_id_are_the_same_usedinterchangeably',
    name: 'Biotite Warlock',
    given_name: 'Biotite',
    family_name: 'Warlock',
    picture: '',
    email: 'your_email@gmail.com',
    email_verified: true
  }
}
