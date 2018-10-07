# Description

We would like to have a portal to which we can log in (hardcoded user in backend) where we can see all our Accounts that have a related open opportunity of 1.000 $ or more (amount >= 1000) on a map. An opportunity counts as open when the sales_stage is not 'Closed Won' or 'Closed Lost'.

When a pointer on the map is selected we would like to see the account name and address as well as the newest opportunity's name, sales_stage and amount.

# Technologies to use
Google Maps as map provider
Nodejs for backend
React, Angular or ExtJS for frontend
Documentation

You can find the complete SugarCRM API documentation here.
Relevant examples: Authentication, filtering records, fetch related records.

Auto generated API documentation: https://e7920-93.mycrmspace.de/rest/v10/help

# My approach
I separated the server side and a client side to another ports.
- I could not use the Sugar API because I get the following error:
"Bad data passed in; ..."
- Because of this I use generate random data, with random opportunities.
- There are two components: Login and Dashboard.

## Frontend Framework
- Angular with Material
  
## Login
- Login username/password: demo
- The authentication is hardcoded in the backend side.
- I use cookies to remember after the user has logged in.
- If the user clicks to the logout ref, then the cookie will be destroyed.
