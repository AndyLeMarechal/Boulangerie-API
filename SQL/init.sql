BEGIN;

-- CREATION DE LA TABLE "user"
CREATE TABLE "user"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"username" TEXT NOT NULL UNIQUE,
"email" TEXT NOT NULL UNIQUE,
"password" TEXT NOT NULL ,
"firstname" TEXT,
"lastname" TEXT,
"address" TEXT,
"role" TEXT DEFAULT('REGISTERED'),
"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
"updated_at" TIMESTAMPTZ
);

-- CREATION DE LA TABLE "bakery"
CREATE TABLE "bakery"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"title" TEXT NOT NULL UNIQUE,
"description" TEXT NOT NULL,
"img" TEXT,
"hourly" TEXT,
"city" TEXT,
"address" TEXT,
"zip_code" TEXT NOT NULL CHECK(
    "zip_code" ~ '^0[1-9]\d{3}$' -- code postaux (métropole) de 01 à 09
    OR "zip_code" ~ '^[1-8]\d{4}$' -- code postaux (métropole) de 10 à 89
    OR "zip_code" ~ '^9[0-59]\d{3}$' -- code postaux  (métropole) de 90 à 95 + La poste et les Jeu concours
    OR "zip_code" ~ '^97[1-8]\d{2}$' -- DOM
    OR "zip_code" ~ '^98[046-9]\d{2}$' -- TOM + monaco
    OR "zip_code" ~ '^00000$'),
"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
"updated_at" TIMESTAMPTZ    
);

-- CREATION DE LA TABLE "article"
CREATE TABLE "article"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"type" TEXT NOT NULL UNIQUE,
"title" TEXT NOT NULL UNIQUE,
"description" TEXT NOT NULL,
"img" TEXT,
"price" TEXT NOT NULL,
"method_of_conservation" TEXT NOT NULL,
"composition" TEXT NOT NULL,
"nutritional_values" TEXT NOT NULL,
"allergens" TEXT NOT NULL,
"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
"updated_at" TIMESTAMPTZ,
"user_id" INT REFERENCES "user"("id") -- REFERENCES : On dit que "user_id" fait reference a la table "user" via sont id  
);

-- CREATION DE LA TABLE "bakery_has_article"
CREATE TABLE "bakery_has_article"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"bakery_id" INT REFERENCES "bakery"("id"), -- REFERENCES : On dit que "bakery_id" fait reference a la table "bakery" via sont id 
"article_id" INT REFERENCES "article"("id") -- REFERENCES : On dit que "article_id" fait reference a la table "article" via sont id 
);

COMMIT;