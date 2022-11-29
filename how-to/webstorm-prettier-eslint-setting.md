## Install eslint-config-airbnb

`npx install-peerdeps --dev eslint-config-airbnb`

## Install prettier
`yarn add prettier -D`

## Create .prettierrc
https://github.com/SooJungChae/dotfiles/blob/master/.prettierrc

## Set prettier in webstorm
- `Preferences > Languages & Frameworks > javascript > Prettier` > Prettier package set
- Check `On code reformat`
- Check `On save`

## Set eslint in webstorm
- `Preferences > Languages & Frameworks > javascript > Code Quality Tools > ESLint` 
  - Check `Manual ESLint configuration`
  - Set ESLint package path
  - Check `Run eslint --fix on save`

## TroubleSooting
Problem : `ESLint: TypeError: this.cliEngineCtor is not a constructor`

Solution : Update Webstorm (2021.02.02)
- https://youtrack.jetbrains.com/issue/WEB-52236

## Reference
- https://github.com/airbnb/javascript
