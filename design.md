# Part 3: System Design Proposal

## Currently the STEPS data is hardcoded in the back end. The team has been discussing that they would want to store the info in the database instead. Imagine you are proposing a solution to the engineering team. What changes would need to be made to the existing database? Please be specific with the proposed solution.

## Considerations

## Please format your answers sot hat they are easy to digest, and do not include any code in your pull req. This is meant to eval your written communication rather than programming skills.

# assume order of STEPS matter

# think about 2 dimensional hierarchy (page index and fields index)

# assume we are continuing to use same sanitizing/validation for information with advised revisions

# decide how to create table around the STEPS

# create table where the fields include name, label, type, required

# create second table where the fields include country, receivenotifications, receiveupdates

# map the information to entities
