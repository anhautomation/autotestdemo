# login specification 
tags: login

## login successfully
tags: login successfully
the user should login successfully and agent name should be correct
* navigate to "https:"
* user inputs username ""
* user inputs password ""
* user clicks a submit button
* verify agent name is ""

## login successfully but agent name is false
tags: login successfully
the user should login successfully and agent name should be correct
* navigate to ""
* user inputs username ""
* user inputs password ""
* user clicks a submit button
* verify agent name is ""