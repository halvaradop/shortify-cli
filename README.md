# @halvaradop/shortify-cli

A CLI tool to shorten lengthy URLs for easier sharing and management.

## Installation

Install the package globally using npm or pnpm:

```bash
# npm
npm install -g @halvaradop/shortify-cli

# pnpm
pnpm install -g @halvaradop/shortify-cli
```

## Usage

Shortify CLI provides a simple way to shorten URLs:

```bash
shortify <url> [options]
```

### Arguments

- `url`: The long URL you want to shorten. Enclose the URL in quotes if it contains special characters.

### Options

- `-V, --version`: Output the version number.
- `-e, --expiry <expiry>`: Set an expiry date for the link (default: "never").
- `-h, --help`: Display help for the command.

### Commands

- `get [options]`: Get information about a short link.
- `delete [options]`: Delete a short link.
- `update [options]`: Update a short link.
- `logger [options]`: Manage and view logger settings
- `config [options]`: View and modify application configuration

## Examples

```bash
# Shorten a URL with default options
shortify "https://www.example.com/very-long-url"

# View statistics for a shortened URL
shortify get -s sid-generate-shortened
shortify get --sid sid-generate-shortened

# Remove a shortened URL
shortify delete -s sid-generate-shortened
shortify delete --sid sid-generate-shortened

# Create a shortened URL with a custom expiry
shortify update -s sid-generate-shortened -e 10h
shortify update --sid sid-generate-shortened --expiry 10h

# Update logger color for info, warn and error
shortify logger --info white
shortify logger --warn yellow
shortify logger --error red

# See the current configuration
shortify config
```

## Contributing

We welcome contributions to `@halvaradop/shortify-cli`! If you have an idea for a new feature or find an improvement to an existing one, please feel free to open an issue or create a pull request. We offer a guide on how to contribute to the project and the necessary steps to do so. Read our [Contributing Guideline](https://github.com/halvaradop/.github/blob/master/.github/CONTRIBUTING.md).

## Code of Conduct

Please be aware that this project has a code of conduct, and we expect all contributors to follow these guidelines in their interactions. For more information, please read our [Code of Conduct](https://github.com/halvaradop/.github/blob/master/.github/CODE_OF_CONDUCT.md).
