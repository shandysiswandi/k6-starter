export K6_WEB_DASHBOARD_HOST ?= localhost
export K6_WEB_DASHBOARD_PORT ?= 5665
export K6_WEB_DASHBOARD_PERIOD ?= 5s
export K6_WEB_DASHBOARD_OPEN ?= true
export K6_WEB_DASHBOARD_EXPORT ?= test_report.html

env ?= dev
dashboard ?= false
scenario ?= 

run:
ifeq ($(scenario),)
	@K6_ENV=${env} K6_WEB_DASHBOARD=${dashboard} k6 run main.js
else
	@K6_ENV=${env} K6_WEB_DASHBOARD=${dashboard} k6 run scenarios/${scenario}.js
endif