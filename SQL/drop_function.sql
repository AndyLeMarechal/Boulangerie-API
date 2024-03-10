BEGIN;

DROP FUNCTION IF EXISTS "create_user", "create_bakery", "create_article", "create_bakery_has_article","update_user","update_bakery","update_article","update_bakery_has_article" CASCADE;

COMMIT;