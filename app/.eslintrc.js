module.exports = {
  root: true,
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    '@react-native-community',
    "plugin:prettier/recommended"
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error"
  }
}
