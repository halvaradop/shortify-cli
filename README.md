# @halvaradop/shortify-cli

@halvaradop/shortify-cli is a powerful terminal-based tool that helps you shorten lengthy URLs for easier sharing and management. It offers a variety of options to customize URLs according to your style, view statistics of shortened links, and maintain a list of your creations.

## Installation

Install the package globally using npm

```bash
npm i -g @halvaradop/shortify-cli
```

## Usage

Shortify CLI provides a clear structure for shortening URLs

```bash
shortify <source-url> [options]
```

## \<source-url\>

This represents the long URL you want to shorten. For guaranteed success, it's recommended to enclose the URL in quotes, especially if it contains special characters.

## [options]

These flags let you customize the shortened URL and manage your existing links:

- \-s or \--stats: View detailed statistics for a specific shortened URL, providing insights into its usage
- \-r or \--remove: Permanently remove a shortened URL from your list
- \-c or \--create (default): Creates a shortened URL based on the provided source URL.
- \-d or \--domain: Define a custom domain (if supported by the shortening service) for your shortened URLs
- \-i or \--short-id: Customize the unique identifier (short code) for the shortened URL, allowing you to create more memorable links.
- \-h or \--help: To learn more about the settings and flags available in the package.

## Examples

```bash
# Shorten a URL with default options
shortify "https://www.example.com/very-long-url"

# View statistics for a shortened URL
shortify -s "https://your-shortened-link.com"  # Replace with your actual shortened URL

# Remove a shortened URL
shortify -r "https://your-shortened-link.com"  # Replace with your actual shortened URL

# Create a shortened URL with a custom short code
shortify "https://www.example.com/another-long-url" -i "my-custom-code"

```
