install:
	npm install

test-cli:
	node bin/gendiff.js -h
	node bin/gendiff.js -V

publish:
	npm publish --dry-run

lint:
	npx eslint .