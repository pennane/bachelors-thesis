# Metropolia Bachelor's Thesis - Arttu Pennanen

Evaluating Pragmatic Application of Functional Programming

Thanks to panunu et al. for the [TeX template](https://github.com/panunu/metropolia-thesis-latex).

### Obtaining the compiled PDF

#### In github

1. Open the [action results](https://github.com/pennane/thesis/actions/workflows/main.yml)
2. Open the most recent passed run
3. From Summary page in the bottom there is "Artifacts" section
4. Download the `compiled_thesis`

### Compile locally

1. Clone repo
2. Have full LaTeX installed

- on mac [MacTeX](https://tug.org/mactex/) is good

2. Run the `compile.sh` script found in the project root
3. Compiled PDF should appear in generated `dist` folder

### Known problems

If biber fails to co-operate

```
biber main --debug
```

grab the cache and dl it

```
 rm -rf /var/folders/6v/zrgy7lyd6xxd5y_3pq6gd60h0000gn/T/par-*
```
