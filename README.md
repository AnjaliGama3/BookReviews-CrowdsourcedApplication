BOOK REVIEWS!
Name: Anjali Viramgama
Date: 04/10/2020
Project Topic: Book reviews
URL: localhost:3004
### 1. Data Format and Storage
Data point fields:
• Title : String
• Author : String
• Rating : Number
• Review: String
• Type : [String]
• Slug: String

Schema:
{
title: String,
author: String
rating: Number
review: Number
type: [String]
slug: String
}

### 2. Add New Data
HTML form route: /create
POST endpoint route: /api/createreview
Example Node.js POST request to endpoint:
```javascript
var request = require("request");
var options = {
method: 'POST',
url: 'http://localhost:3000/api/createreview',
headers: {
'content-type': 'application/x-www-form-urlencoded'
},
form: {
title: Harry Potter
author: J.K. Rowling
rating: 5
review: Amazing read!
type: Fiction Mystery
slug: harry
}
};
request(options, function (error, response, body) {
if (error) throw new Error(error);
console.log(body);
});

### 3. View Data
GET endpoint route: /api/reviews

### 4. Search Data
Search Field: I have implemented everything to make it easier for the
user. Hence search can be done on name/author name/ rating etc.

### 5. Navigation Pages
Navigation Filters
1. Fictional books -> /type/fiction
2. Romance books-> /type/Romance
3. Scifi books-> /type/SciFi
4. Horror books-> /type/Horror
5. One Starred books-> /rate/leastFavorites
6. Top Rated (5 starred books) -> /rate/topRated
