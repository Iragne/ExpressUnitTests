REPORTER = spec

test-api:
	@./node_modules/.bin/_mocha \
	--reporter $(REPORTER) \
	--ui bdd \
	tests/*.js

test-coverage:
	@./node_modules/.bin/istanbul cover -- ./node_modules/mocha/bin/_mocha tests/*.js

test-all: test-api
test: test-all test-coverage

clean:
	rm -rf node_modules coverage

dist:
	npm install
	make test

.PHONY: test-all