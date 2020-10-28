USE [HelpingHand]
GO

set identity_insert [UserProfile] on
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, FirebaseUserId) values (1, 'rsandwith0', 'Reina', 'Sandwith', 'mixonroberth@gmail.com', 'jpuhyzaicsokywncxveknzowfpdu');
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, FirebaseUserId) values (2, 'bendover2', 'Ben', 'Dover', 'mixonroberth@yahoo.com', 'SDasdvadsVDS');
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, FirebaseUserId) values (3, 'sendit12', 'Send', 'it', 'rsandwith0@google.com.brx', 'CXzcxu');
set identity_insert [UserProfile] off

set identity_insert [NonProfit] on
insert into NonProfit (Id, OwnerId, Name, Location, Cause, Description, MissionStatement, Website) values (1, 1, 'Habitat for Humanity Nashville', '123 Main Street', 'Fight Homelessness', 'To build homes for people','get people homes', 'https://www.habitatnashville.org/');
insert into NonProfit (Id, OwnerId, Name, Location, Cause, Description, MissionStatement, Website) values (2, 3, 'Salvation Army', '7809 drive Street', 'Cure stuff', 'Get people jobs', 'get people jobs', 'https://www.salvationarmynashville.org/');
set identity_insert [NonProfit] off

set identity_insert [Need] on
insert into Need (Id, NonProfitId, Item, Quantity, Description, CreateDateTime, Location) values (1, 1, 'paint', '3 cans', 'We need white paint to paint a house', '2020-03-21', '123 Main Street');
insert into Need (Id, NonProfitId, Item, Quantity, Description, CreateDateTime, Location) values (2, 1, 'pencils', '3000', 'We need pencils for kids', '2001-01-01', '10231 West Drive');
insert into Need (Id, NonProfitId, Item, Quantity, Description, CreateDateTime, Location) values (3, 2, 'blankets', '12', 'Blankets for homeless', '1901-02-12', '458 East Avenue');
set identity_insert [Need] off

set identity_insert [Event] on
insert into Event (Id, Name, Description, CreateDateTime, Location, Comments) values (1, 'Walk 12 miles', 'walking 12 miles', '2020-03-21', '123 Main Street', 'SUper cool event');
insert into Event (Id, Name, Description, CreateDateTime, Location, Comments) values (2, 'christmas rally', 'rally to get kids toys', '2001-01-01', '10231 West Drive', 'bippity boop');
insert into Event (Id, Name, Description, CreateDateTime, Location, Comments) values (3, 'sponsorship', 'getting money', '1901-02-12', '458 East Avenue', 'snippity snoop');
set identity_insert [Event] off

set identity_insert [NonProfitEvent] on
insert into NonProfitEvent (Id, NonProfitId, EventId) values (1, 1, 1)
insert into NonProfitEvent (Id, NonProfitId, EventId) values (2, 1, 2)
insert into NonProfitEvent (Id, NonProfitId, EventId) values (3, 2, 3)
set identity_insert [NonProfitEvent] off

set identity_insert [NonProfitVolunteer] on
insert into NonProfitVolunteer(Id, NonProfitId, UserProfileId) values (1, 1, 3)
insert into NonProfitVolunteer (Id, NonProfitId, UserProfileId) values (2, 2, 3)
set identity