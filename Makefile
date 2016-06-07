build:
	@./bin/ensure_path.sh
	@./bin/build_static.sh
	@./node_modules/loader-builder/bin/builder ./views .

dev:
	@./bin/run_dev.sh

prd:
	@./bin/run_prd.sh

cluster:
	@./bin/run_cluster.sh

pm2start:
	@./bin/run_pm2_start.sh 

pm2queuestart:
	@./bin/run_pm2queue_start.sh 

pm2reload:
	@./bin/run_pm2_reload.sh 

pm2queuereload:
	@./bin/run_pm2queue_reload.sh 

cron1min:
	@./bin/crontab_task_1_min.sh

cron1day:
	@./bin/crontab_task_1_day.sh

clean:
	@rm -rf assets/jsmin/*
	@rm -rf assets/cssmin/*

clean_ds:
	@./bin/clean_ds.sh

lint:
	@jshint app.js routes/*.js controllers/*.js models/*.js --show-non-errors

dox:
	@doxmate build -o doc/utils -d utils
	@doxmate build -o doc/routes -d routes
	@doxmate build -o doc/models -d models
	@doxmate build -o doc/controllers -d controllers

.PHONY: build dev prd clean lint
