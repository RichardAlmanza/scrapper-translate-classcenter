#!/bin/sh
set -e

base_url="www.classcentral.com"
user_agent="SomeUserAgent"
wdir="$PWD"
web_path="$PWD/httrack-output"

download_website_with_httrack() {
    httrack "https://$base_url" \
        --mirror \
        --depth=2 \
        --sockets=1 \
        --retries=3 \
        --do-not-log \
        --path "$web_path" \
        --user-agent "$user_agent" \
        "+*.classcentral.com/*"
}

download_js_files() {
    js_id_files=(
        "266"  "2344" "4826" "6126" "7013" "8462"
        "577"  "2427" "4906" "6192" "7053" "8535"
        "775"  "2571" "5097" "6352" "7484" "8550"
        "1623" "2941" "5191" "6458" "7486" "8664"
        "1701" "3171" "5548" "6529" "7536" "8883"
        "1888" "3377" "5823" "6592" "7540" "9320"
        "1896" "3438" "6037" "6637" "7655" "9974"
        "1918" "3882" "6039" "6753" "7933" "9992"
        "2165" "4288" "6058" "6801" "7947"
    )

    js_first_part="$wdir/scripts/webpack_p1.lst"
    js_second_part="$wdir/scripts/webpack_p2.lst"

    for key in "${js_id_files[@]}"; do
        js_file_p1="$(grep "$key:" $js_first_part || echo "$key")"
        js_file_p1="$(echo $js_file_p1 | sed -e "s/$key: //g" )"
        js_file_p2="$(grep "$key:" $js_second_part | sed -e "s/$key: //g")"
        js_file="${js_file_p1}.${js_file_p2}.js"

        wget "$base_url/webpack/$js_file" \
            --user-agent="$user_agent" \
            --tries=3 \
            --no-cache
    done
}

find_and_replace_webpack_paths_in_html_files() {
    html_files=($(find -type f -iname "*.html"))

    for html in "${html_files[@]}"; do
        sed --in-place --expression "s/\/webpack\//webpack\//g" "$html"
    done
}

download_website_with_httrack

pushd "$web_path/$base_url/webpack"

    download_js_files

popd

docker run \
    --name local-classcentral \
    --rm \
    -v $PWD/httrack-output/www.classcentral.com:/usr/share/nginx/html:ro \
    --detach --publish 8080:80
