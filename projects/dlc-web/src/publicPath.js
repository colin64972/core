__webpack_public_path__ = '/'

if (process.env.NODE_ENV === 'production') {
  __webpack_public_path__ = `${process.env.CDN_URL}/${process.env.CDN_APP_FOLDER}/`
}

export default __webpack_public_path__
