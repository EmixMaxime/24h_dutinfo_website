module.exports = {
  entry: {
    app: ['./resources/assets/sass/home.scss', './resources/assets/javascript/main.js']
  },
  port: 3003,
  html: true,
  browsers: ['last 2 versions', 'ie > 8'],
  assets_url: '/',  // Urls dans le fichier final = output.publicPath
  stylelint: false, // './css/**/*.scss',
  assets_path: './dist/', // ou build ? = output.path de webpack
  refresh: ['./resources/views/index.twig'], // Permet de forcer le rafraichissement du navigateur lors de la modification de ces fichiers
  historyApiFallback: false // Passer à true si on utilise le mode: 'history' de vue-router (redirige toutes les requêtes sans réponse vers index.html)
}
