install:
	npm install

test-cli:
        node bin/gendiff.js
	node bin/gendiff.js -h
	node bin/gendiff.js -V

test:
	npm test

publish:
	npm publish --dry-run

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .