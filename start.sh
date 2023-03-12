#!/bin/sh

base_url="https://www.classcentral.com"

download_website_with_httrack(){
    httrack $base_url \
        --mirror \
        --depth=2 \
        --sockets=8 \
        --retries=3 \
        --do-not-log \
        --path "$PWD/httrack-output/" \
        --user-agent "SomeUserAgent" \
        "+*.classcentral.com/*"

    return $?
}

download_js_files(){
    sources_list=(
        "4826.ea570b7100e8c5e53e11.js"
        "7540.b7f3ab16c1d7d344980b.js"
        "Auth.44e05080311528b179c7.js"
        "MarkComplete.e9560adcebc4ad54e6bf.js"
        "Misc.a66f8a686e276f997313.js"
        "UserActions.30ee83ef27eafec0be61.js"
        "messages-intl-icu-en-yml.64477e124174f9d771be.js"
    )

}
