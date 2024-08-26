#!/bin/bash

readonly OUT_DIR="dist"
readonly OUT_NAME="Pennanen_Arttu"
readonly ENTRYPOINT="main"

get_script_dir() {
    echo "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
}

ensure_out_dir() {
    local dir="$1/$OUT_DIR"
    mkdir -p "$dir" || {
        echo "Failed to create directory: $dir"
        exit 1
    }
}

compile_pdf() {
    local script_dir="$1"
    
    latexmk -xelatex -shell-escape -8bit -synctex=1 -interaction=nonstopmode "$ENTRYPOINT" || { echo "latexmk failed"; exit 1; }
    
    mv "${ENTRYPOINT}.pdf" "${script_dir}/${OUT_DIR}/${OUT_NAME}.pdf" || { echo "Failed to move PDF"; exit 1; }
    
    echo "OK"
}

main() {
    local script_dir
    script_dir=$(get_script_dir)

    ensure_out_dir "$script_dir"

    compile_pdf "$script_dir"
}

main 
