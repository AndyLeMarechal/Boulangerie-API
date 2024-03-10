BEGIN;

CREATE OR REPLACE FUNCTION "create_user"("data" json) RETURNS "user" AS $$

    INSERT INTO "user"
    (
        "username",
        "email",
        "password",
        "firstname",
        "lastname",
        "address",
        "role"
    )
    VALUES
    (
        data->>'username',
        data->>'email',
        data->>'password',
        data->>'firstname',
        data->>'lastname',
        data->>'address',
        data->>'role'
    )
RETURNING *;
$$ LANGUAGE sql STRICT;

CREATE OR REPLACE FUNCTION "create_bakery"("data" json) RETURNS "bakery" AS $$

    INSERT INTO "bakery"
    (
        "title",
        "description",
        "img",
        "hourly",
        "city",
        "address",
        "zip_code"
    )
    VALUES
    (
        data->>'title',
        data->>'description',
        data->>'img',
        data->>'hourly',
        data->>'city',
        data->>'address',
        data->>'zip_code'
    )
RETURNING *;
$$ LANGUAGE sql STRICT;

CREATE OR REPLACE FUNCTION "create_article"("data" json) RETURNS "article" AS $$

    INSERT INTO "article"
    (
        "type",
        "title",
        "description",
        "img",
        "price",
        "method_of_conservation",
        "composition",
        "nutritional_values",
        "allergens",
        "user_id"
    )
    VALUES
    (
        data->>'type',
        data->>'title',
        data->>'description',
        data->>'img',
       (data->>'price')::numeric,
        data->>'method_of_conservation',
        data->>'composition',
        data->>'nutritional_values',
        data->>'allergens',
        (data->>'user_id')::int
    )
RETURNING *;
$$ LANGUAGE sql STRICT;

CREATE OR REPLACE FUNCTION "create_bakery_has_article"("data" json) RETURNS "bakery_has_article" AS $$

    INSERT INTO "bakery_has_article"
    (
        "bakery_id",
        "article_id"
    )
    VALUES
    (
        (data->>'bakery_id')::int,
        (data->>'article_id')::int
    )
RETURNING *;
$$ LANGUAGE sql STRICT;

CREATE OR REPLACE FUNCTION "update_user"("data" json) RETURNS "user" AS $$

    UPDATE "user"
    SET
        "username" = COALESCE((data->>'username'), "username"),
        "email" = COALESCE(data->>'email', "email"),
        "password" = COALESCE(data->>'password', "password"),
        "firstname" = COALESCE(data->>'firstname', "firstname"),
        "lastname" = COALESCE(data->>'lastname', "lastname"),
        "address" = COALESCE(data->>'address', "address"),
        "role" = COALESCE(data->>'role', "role"),
        "updated_at" = now()
    WHERE
        "id" = (data->>'id')::int
RETURNING *;
$$ LANGUAGE sql STRICT;

CREATE OR REPLACE FUNCTION "update_bakery"("data" json) RETURNS "bakery" AS $$

    UPDATE "bakery"
    SET
        "title" = COALESCE(data->>'title', "title"),
        "description" = COALESCE(data->>'description', "description"),
        "img" = COALESCE(data->>'img', "img"),
        "hourly" = COALESCE(data->>'hourly', "hourly"),
        "city" = COALESCE(data->>'city', "city"),
        "address" = COALESCE(data->>'address', "address"),
        "zip_code" = COALESCE(data->>'zip_code', "zip_code"),
        "updated_at" = now()
    WHERE
        "id" = (data->>'id')::int
RETURNING *;
$$ LANGUAGE sql STRICT;

CREATE OR REPLACE FUNCTION "update_article"("data" json) RETURNS "article" AS $$

    UPDATE "article"
    SET
        "type" = COALESCE(data->>'type', "type"),
        "title" = COALESCE(data->>'title', "title"),
        "description" = COALESCE(data->>'description', "description"),
        "img" = COALESCE(data->>'img', "img"),
        "price" = COALESCE((data->>'price')::numeric, "price"::numeric),
        "method_of_conservation" = COALESCE(data->>'method_of_conservation', "method_of_conservation"),
        "composition" = COALESCE(data->>'composition', "composition"),
        "nutritional_values" = COALESCE(data->>'nutritional_values', "nutritional_values"),
        "allergens" = COALESCE(data->>'allergens', "allergens"),
        "user_id" = COALESCE((data->>'user_id')::int, "user_id"::int),
        "updated_at" = now()
    WHERE
        "id" = (data->>'id')::int
RETURNING *;
$$ LANGUAGE sql STRICT;

CREATE OR REPLACE FUNCTION "update_bakery_has_article"("data" json) RETURNS "bakery_has_article" AS $$

    UPDATE "bakery_has_article"
    SET
        "bakery_id" = COALESCE((data->>'bakery_id')::int, "bakery_id"::int),
        "article_id" = COALESCE((data->>'article_id')::int, "article_id"::int)
    WHERE
        "id" = (data->>'id')::int
RETURNING *;
$$ LANGUAGE sql STRICT;



COMMIT;