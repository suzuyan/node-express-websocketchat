nodejs-express-websocket
========================

node.jsでwebsocketアプリを作る際のジェネラレーター

node.js + express + socket.io でなんらかのサービスを作るときに使ってください m(_ _#)mペコリ

## 導入

    git clone https://github.excite.ad.jp/shuhei-suzuki/nodejs-express-websocket.git
    npm install
    grunt dev

- http://localhost:3000で確認できます


### ファイル構成

    nodejs-express-websocket
        app
            controllers
            models
            views
                # エラー時のファイル
                errors
                # レイアウトファイル
                layouts
                # 個々のページファイル
                pages
        config
            # 基本的な環境ごとの設定はこちらに記載しておきます
            config.js
            # express固有の設定
            express.js
            # ルーター設定
            routes.js
            # socket.io固有の設定
            websocket.js
        poublic
            # javascript, cssはこちらに書く
            src
                js
                css
        # bootstrapファイル（あまり変更することはないかな？）
        server.js


## 外部jsライブラリを追加する場合

基本的にはbowerを使って管理してください

    # 例えば jquery を導入する場合
    bower install jquery --save


`bower_components/jquery` 以下にgit cloneしたファイルが入っているので`bower.json`の`exportsOverride`で必要なjsファイルを定義しておけばgruntがよしなにやってくれます


## deploy


### heroku

herokuアカウントの作成, herokuコマンドのインストールなどは事前にやっておいてください。

    # grunt用のbuildpackを使用する
    heroku create MYAPP --buildpack https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt.git
    # websocketを使用
    heroku labs:enable websockets MYAPP
    # 環境変数の設定
    heroku config:set NODE_ENV=production
    git push heroku master
    # ブラウザ確認
    heroku open

http://node-express-websocket.herokuapp.com/


### live環境

    grunt prod
    # ↑でできたファイルを適当なdeploy toolでrsync


## TODO

- 画像まわり（src/imgあたりに上げてもらってprod時にrsyncすればいいだけだと思うけどまだ未実装）
- 実際deployしたことはまだないので色々問題出てくるはず

