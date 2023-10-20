# Part 2: Review Back-end Route

##### Best Practices:

# Re: middlewares.js: can consider using a validtion middleware such as express validator which would clean up front end requirements and less load on backend validation... also does with sanitizing data

# Is validation working within design intentions? Data that is currently in the db are very weak passwords, consider strenghthening requirements for passwords

# re: db seed file appears to function as intended, opens and closes when done seeding

# within user.js, it appears that the password has been salted and encrypted, great!'

# accepts and responds with JSON

# endpoints follow the 'nouns instead of verbs' in endpoint paths

# security worked well. my updated SSL cerf prevented me from accessing frontend/backend unless i used legacy software

##### Code Quality:

## Re: Separation of Concerns: consider using controllers to move route handling logic away from the definition

## Would likely be difficult to extend due to issue with separation of concerns

# Not very easy to follow.

##### Bugs:

## Didn't see any noteworthy bugs

# Potential bug could be during userOnboarding async (Lines 116 - 136) prone to errors due not being wrapped in curly braces

##### Efficiency:

## Hardcoded database makes data easily accessible

## Works faster due to no need of setting up the SQL db

## 'yes-no' case is redundant, same as a boolean

## multiline case, is it necessary?

## Consider creating validation function instead of creating multiple functions to check for cases

##### Ease of Use:

## Routes can be separated into separate folder which holds the routes, that way if they are extended, will be capable of organizing new sub-routes for queries

## Not very easy to tell what the validation functions are actually checking. Consider changing names to reflect its actualy purpose e.g. (isFieldValueIncorrect => isAnyFieldIncorrect)

## Consider making a lookup for dataTypes so devs won't need to use STEPS to compare types

## Consider making a lookup for requiredFields as well to simplify validation, also enables adding future required fields

## In doing so, enables us to be more specific for error codes and messages within the userOnboarding async function
