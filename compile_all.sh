#!/bin/bash

readonly OUT_DIR="dist"
readonly OUT_NAME="Pennanen_Arttu"
readonly ENTRYPOINT="main"

# Clean up auxiliary files
cleanup_aux_files() {
    echo "Cleaning up auxiliary files..."
    rm -f "${ENTRYPOINT}.{aux,bbl,bcf,blg,log,out,toc,acn,acr,alg,glo,gls,ist,lof,lot,xdy}"
}

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
    
    xelatex -f -shell-escape -8bit "$ENTRYPOINT" || { echo "XeLaTeX compilation 1 failed"; exit 1; }
    biber "$ENTRYPOINT"  || { echo "Biber failed"; exit 1; }
    makeglossaries "$ENTRYPOINT" || { echo "Makeglossaries failed"; exit 1; }
    xelatex -shell-escape -8bit "$ENTRYPOINT" || { echo "XeLaTeX compilation 2 failed"; exit 1; }
    xelatex -shell-escape -8bit "$ENTRYPOINT" || { echo "XeLaTeX compilation 3 failed"; exit 1; }
    
    echo "OK"
}

main() {
    local script_dir
    script_dir=$(get_script_dir)

    ensure_out_dir "$script_dir"
    
    # Clean up auxiliary files before starting the build
    cleanup_aux_files

    compile_pdf "$script_dir"
}

main
