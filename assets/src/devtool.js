if (DEVTOOL == 'eval-cheap-source-map') {
  console.warn('%c[webpack] Running in fast build (eval) mode. For accurate line numbers, ' +
    'use DEVTOOL=eval-source-map mix phx.server instead.', 'color: green; font-size: 14px')
} else {
  console.warn('\n\[webpack] Running with custom devtool:', DEVTOOL)
}