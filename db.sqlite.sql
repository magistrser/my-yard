BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Comments" (
	"id"	TEXT NOT NULL UNIQUE,
	"postId"	TEXT NOT NULL,
	"authorId"	TEXT NOT NULL,
	"text"	TEXT CHECK(length(text)>0 and length(text)<4001),
	"timestamp"	TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"replyToCommentId"	TEXT,
	"hidden"	INTEGER,
	PRIMARY KEY("id"),
	FOREIGN KEY("postId") REFERENCES "Posts"("id") on delete cascade,
	FOREIGN KEY("replyToCommentId") REFERENCES "Comments"("id") on delete set null,
	FOREIGN KEY("authorId") REFERENCES "Users"("id") on delete cascade
);
CREATE TABLE IF NOT EXISTS "Posts" (
	"id"	TEXT NOT NULL UNIQUE,
	"userId"	TEXT NOT NULL,
	"text"	TEXT NOT NULL,
	"timestamp"	NUMERIC NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"title"	TEXT NOT NULL DEFAULT 'Untitled',
	"eventDateTime"	TEXT NOT NULL CHECK(datetime(eventDateTime)is notnull),
	"hidden"	INTEGER,
	PRIMARY KEY("id"),
	FOREIGN KEY("userId") REFERENCES "Users"("id")
);
CREATE TABLE IF NOT EXISTS "Users" (
	"id"	TEXT NOT NULL,
	"email"	TEXT NOT NULL UNIQUE,
	"fullName"	TEXT,
	"vkProfileUrl"	TEXT UNIQUE,
	"isAdmin"	INTEGER NOT NULL DEFAULT 0,
	"bannedUntil"	TEXT,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "PostsTagsMap" (
	"postId"	TEXT NOT NULL,
	"tagId"	INTEGER NOT NULL,
	PRIMARY KEY("postId","tagId"),
	FOREIGN KEY("postId") REFERENCES "Posts"("id") on delete cascade,
	FOREIGN KEY("tagId") REFERENCES "Tags"("id") on delete cascade
);
CREATE TABLE IF NOT EXISTS "PostsSubscribersMap" (
	"postId"	TEXT NOT NULL,
	"userId"	TEXT NOT NULL,
	PRIMARY KEY("postId","userId"),
	FOREIGN KEY("postId") REFERENCES "Posts"("id") on delete cascade,
	FOREIGN KEY("userId") REFERENCES "Users"("id") on delete cascade
);
CREATE TABLE IF NOT EXISTS "Tags" (
	"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	"name"	TEXT NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS "Photos" (
	"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	"url"	TEXT,
	"userId"	TEXT NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS "Images" (
	"rowId"	TEXT NOT NULL UNIQUE,
	"postId"	TEXT NOT NULL,
	"name"	TEXT NOT NULL,
	PRIMARY KEY("rowId")
);
CREATE TABLE IF NOT EXISTS "PostGeoPositions" (
	"postId"	TEXT NOT NULL UNIQUE,
	"latitude"	REAL NOT NULL,
	"longitude"	REAL NOT NULL,
	PRIMARY KEY("postId")
);
COMMIT;
