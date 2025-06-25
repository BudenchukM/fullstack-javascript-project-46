.PHONY: install test lint

install:
	npm ci
	
test-cli:
	node bin/gendiff.js -h
	node bin/gendiff.js -V
	node bin/gendiff.js -f
	
Available formats:
- `stylish` (default) - human-readable nested format
- `plain` - flat text format
- `json` - machine-readable JSON output	

publish:
	npm publish --dry-run	

test:
	npm test
	
lint:
	npx eslint .
