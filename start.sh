#!/bin/sh
set -e

base_url="www.classcentral.com"
user_agent="SomeUserAgent"
web_path="$PWD/httrack-output"

download_website_with_httrack() {
    httrack "https://$base_url" \
        --mirror \
        --depth=2 \
        --sockets=8 \
        --retries=3 \
        --do-not-log \
        --path "$web_path" \
        --user-agent "$user_agent" \
        "+*.classcentral.com/*"
}

download_js_files() {
    sources_list=(
        "4826.ea570b7100e8c5e53e11.js"
        "7540.b7f3ab16c1d7d344980b.js"
        "Auth.44e05080311528b179c7.js"
        "MarkComplete.e9560adcebc4ad54e6bf.js"
        "Misc.a66f8a686e276f997313.js"
        "UserActions.30ee83ef27eafec0be61.js"
        "messages-intl-icu-en-yml.64477e124174f9d771be.js"
    )

    for js_source in "${sources_list[@]}"; do
        wget "$base_url/webpack/$js_source" \
            --user-agent="$user_agent" \
            --tries=3 \
            --no-cache
    done
}

download_website_with_httrack

pushd "$web_path/$base_url/webpack"

    download_js_files

popd
