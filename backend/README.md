# 本棚管理バックエンド API

## 使い方

- `make help`コマンドで使い方を確認できます
- 初回のみ，`make init`を実行してください
- `make run/db`コマンドでデータベースを起動します
- `backend`ディレクトリに移動し，`sequelize db:migrate`を実行してください
- `make run/node`コマンドでバックエンドサーバを起動します
- その後，`ifconfig`コマンドなどでサーバの IP アドレスを確認し，アプリ側に入力してください("http://<IP アドレス>:3000"の形式で入力してください)

## 注意

- 3000 番と 33060 番ポートを使用します
- sequelize-cli をインストールしてください(`npm install -g sequelize-cli`)
