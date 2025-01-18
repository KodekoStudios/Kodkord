import config from "@marcrock22/eslint"

/** @type { import("eslint").Linter.Config } */
const rules = {
    "rules": {
        "func-names": "off",
        "perfectionist/sort-classes": "off",
        "perfectionist/sort-switch-case": "off",
        "perfectionist/sort-exports": "off",
        "@typescript-eslint/non-nullable-type-assertion-style": "off",
        "@stylistic/quotes": "off",
        "marcrock/use-filenaming-convention": ["error", {
            match: /^[a-z0-9]+(?:\.[a-z0-9]+)*\.ts$/
        }]
    },
};

export default [...config, rules];