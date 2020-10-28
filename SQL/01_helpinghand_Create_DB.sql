Use [master] 

IF db_id('HelpingHand') IS NULL
	CREATE DATABASE [HelpingHand]
GO

USE [HelpingHand]
GO

DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [NonProfit];
DROP TABLE IF EXISTS [NonProfitVolunteer];
DROP TABLE IF EXISTS [Need];
DROP TABLE IF EXISTS [Event];
DROP TABLE IF EXISTS [NonProfitEvent];
GO

CREATE TABLE [UserProfile] (
[Id] integer PRIMARY KEY IDENTITY,
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [DisplayName] nvarchar(50) NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [Email] nvarchar(555) NOT NULL,

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)

CREATE TABLE [NonProfit] (
[Id] integer PRIMARY KEY IDENTITY,
  [OwnerId] integer NOT NULL,
  [Name] nvarchar(50) NOT NULL,
  [Location] nvarchar(100) NOT NULL,
  [Cause] nvarchar(50) NOT NULL,
  [Description] nvarchar(555) NOT NULL,
  [MissionStatement] nvarchar(555) NOT NULL,
  [Website] nvarchar(100) NOT NULL,


  CONSTRAINT [FK_NonProfit_UserProfile] FOREIGN KEY ([OwnerId]) REFERENCES [UserProfile] ([Id])
)

CREATE TABLE [NonProfitVolunteer] (
  [id] integer PRIMARY KEY IDENTITY,
  [NonProfitId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,
  
  CONSTRAINT [FK_NonProfitVolunteer_NonProfit] FOREIGN KEY ([NonProfitId]) REFERENCES [NonProfit] ([Id]),
  CONSTRAINT [FK_NonProfitVolunteer_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)

CREATE TABLE [Need] (
[Id] integer PRIMARY KEY IDENTITY,
  [NonProfitId] integer NOT NULL,
  [Item] NVARCHAR(28) NOT NULL,
  [Quantity] nvarchar(50) NOT NULL,
  [Description] nvarchar(500) NOT NULL,
  [CreateDateTime] nvarchar(50) NOT NULL,
  [Location] nvarchar(555) NOT NULL,

   CONSTRAINT [FK_Need_NonProfit] FOREIGN KEY ([NonProfitId]) REFERENCES [NonProfit] ([Id])
)

CREATE TABLE [Event] (
[Id] integer PRIMARY KEY IDENTITY,
  [Name] NVARCHAR(28) NOT NULL,
  [CreateDateTime] nvarchar(50) NOT NULL,
  [Description] nvarchar(500) NOT NULL,
  [Location] nvarchar(500) NOT NULL,
  [Comments] nvarchar(555) NOT NULL
)

CREATE TABLE [NonProfitEvent] (
  [id] integer PRIMARY KEY IDENTITY,
  [NonProfitId] integer NOT NULL,
  [EventId] integer NOT NULL,
  
  CONSTRAINT [FK_NonProfitEvent_NonProfit] FOREIGN KEY ([NonProfitId]) REFERENCES [NonProfit] ([Id]),
  CONSTRAINT [FK_NonProfitEvent_Event] FOREIGN KEY ([EventId]) REFERENCES [Event] ([Id])
)