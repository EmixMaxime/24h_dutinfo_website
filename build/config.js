module.exports = {
  entry: {
    app: ['./resources/assets/sass/main.scss', './resources/assets/javascript/main.js'],
    inscription: ['./resources/assets/sass/inscription.scss'],
    home: ['./resources/assets/sass/home.scss'],
    prepare: ['./resources/assets/sass/prepare.scss'],
    participant: ['./resources/assets/sass/participant.scss'],
    epreuve: ['./resources/assets/sass/epreuve.scss'],
    planning: ['./resources/assets/sass/planning.scss']
  },
  port: 3003,
  html: true,
  browsers: ['last 2 versions', 'ie > 8'],
  assets_url: './',  // METTRE ./ POUR BUILDER Urls dans le fichier final = output.publicPath
  stylelint: false, // './css/**/*.scss',
  assets_path: './dist/', // ou build ? = output.path de webpack
  refresh: ['./resources/views/index.twig'], // Permet de forcer le rafraichissement du navigateur lors de la modification de ces fichiers
  historyApiFallback: false // Passer à true si on utilise le mode: 'history' de vue-router (redirige toutes les requêtes sans réponse vers index.html)
}
