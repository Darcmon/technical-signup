# Part 2: Review Back-end Route

##### Best Practices:

# Re: middlewares: can consider using a validtion middleware such as express validator which would clean up front end requirements and less load on backend validation... also does with sanitizing data

# Did the validation working within design intentions? Data that is currently in the db are very weak passwords, consider strenghthening requirements for passwords

# re: db seed file appears to function as intended, opens and closes when done seeding

# within user.js, it appears that the password has been salted and encrypted, great!

##### Code Quality:

## Re: Separation of Concerns: consider using controllers to move route handling logic away from the definition

## Would likely be difficult to extend due to issue with separation of concerns

## What is point of code if theres no intentional organization or attempt at thinking about opportunities to extend

##### Bugs:

##

##### Efficiency:

## Hardcoded database makes data easily accessible

## Works faster due to no need of setting up the SQL db

## in notFound function in middleware.js, could be more descriptive about the requestedUrl to make it easier to debug or understand the issue

##### Ease of Use:

## Usernames should be able to be changed at later time, requiring a username could be problematic

## Routes can be separated into separate folder which holds the routes, that way if they are extended, will be capable of organizing new sub-routes for queries
