BEGIN;

CREATE OR REPLACE VIEW "get_user" AS
SELECT "user"."id", "user"."username", "user"."email", "user"."firstname", "user"."lastname", "user"."address", "user"."role"
FROM "user";


CREATE OR REPLACE VIEW "get_bakery" AS
SELECT "bakery".*, "bakery_has_article"."article_id"
FROM "bakery"
JOIN "bakery_has_article"
ON "bakery_has_article"."bakery_id" = "bakery"."id";

CREATE OR REPLACE VIEW "get_article" AS
SELECT "article".*, "bakery_has_article"."bakery_id"
FROM "article"
JOIN "bakery_has_article"
ON "bakery_has_article"."article_id" = "article"."id";



COMMIT;