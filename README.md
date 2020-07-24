# Sports Activity Manager Client Library

This library allows clients to access the Sports Activity Manager server resources.

### Functionalities
* validate activity ID and content for incorrect values (static methods)
* show the saved activities
* show the selected activity details
* add a new activity
* modify an existing activity
* delete an activity

### How to use this library?
1. Clone the repository
2. Copy the *index.js* and *config.js* file to the client
3. Create the object of the *SamClient* class exported by default from *index.js* file. You need to supply the *API URL* where the server is hosted.
4. Use the created object in the client

### Used libraries
The library uses *axios* for using the API.
