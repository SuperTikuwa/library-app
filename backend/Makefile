D=docker
DC=docker compose

.PHONY: help

help:
	@echo "----- Mini Library -----"
	@echo "node.js v16.13.0\nyarn v1.22.17\nで動作を確認しました"
	@echo "makeコマンドの使い方"
	@echo "make init - 初回の環境構築をおこないます";
	@echo "make run/db - データベースを起動します";
	@echo "make run/node - バックエンドのサーバを起動します";
	@echo "make help - コマンドの使い方を表示します";

init:
	@cd backend&&\
	yarn install


down:
	$(DC) down -v

run/db:
	$(DC) up -d db

run/node:
	@cd backend&&\
	yarn start/prod

ps:
	$(DC) ps

db/console:
	$(DC) exec db mysql -udocker -pdocker

logs:
	$(DC) logs

logs/node:
	$(DC) logs node

restart:
	$(DC) restart
