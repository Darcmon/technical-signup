# Part 3: System Design Proposal

## Currently the STEPS data is hardcoded in the back end. The team has been discussing that they would want to store the info in the database instead. Imagine you are proposing a solution to the engineering team. What changes would need to be made to the existing database? Please be specific with the proposed solution.

## Considerations

## Please format your answers sot hat they are easy to digest, and do not include any code in your pull req. This is meant to eval your written communication rather than programming skills.

# assume we have access to dataset at any point in time

# assume based on current design structure there is a need for permissions (thomas, santiago, chiumbo, and hualing) have isolated creation patterns compared to ashanti, julia, and cheng

# assume we are continuing to use same sanitizing/validation for information with advised revisions

# decide how to create entities around the current dataset

# entity1: login (username, password)

# entity2: user (username, email, photoUrl, firstname, lastname, country, bio, receivenoti, receiveupdates, completedonboarding)

# map the information to entities
