.PHONY: help build test coverage clean run

NPM ?= npm
NODE ?= node

help:
	@echo "Available commands:"
	@echo "  make build          - Build project environment (install dependencies)"
	@echo "  make test           - Run test suite"
	@echo "  make coverage       - Run tests and generate coverage reports (XML + HTML) for SonarQube"
	@echo "  make run            - Run the Node.js application"
	@echo "  make clean          - Clean build artifacts and generated files"

# Build the project (install dependencies)
build:
	$(NPM) install

# Run tests
test:
	$(NPM) test

# Generate coverage report in SonarQube format (LCOV) and other formats
# Note: Continue even if tests fail to ensure coverage report is generated
coverage:
	$(NPM) run coverage || true
	@if [ -f coverage/lcov.info ]; then \
		echo "Coverage report generated successfully:"; \
		echo "  - LCOV (SonarQube): coverage/lcov.info"; \
		echo "  - JSON Summary: coverage/coverage-summary.json"; \
		echo "  - HTML: coverage/index.html"; \
	else \
		echo "Error: Coverage report not generated"; \
		exit 1; \
	fi

# Run the application
run:
	$(NODE) src/server.js

# Clean build artifacts
clean:
	rm -rf node_modules/
	rm -rf coverage/
	rm -rf .nyc_output/
	rm -f package-lock.json

