# DevTools - Developer Tool Collection

> 🚀 A local developer tools web page, no server required, pure frontend implementation, data never leaves your device

## Project Overview

DevTools is a comprehensive local toolkit designed specifically for developers, providing commonly used development utilities. All data processing is completed locally in your browser, ensuring maximum data security and privacy without any server dependencies.

### Core Features

- ✅ **100% Local Processing**: All operations completed in browser, no data sent to any server
- ✅ **Zero Installation**: Pure static HTML file, no dependencies or server setup required
- ✅ **Instant Access**: Single file download, double-click to use immediately
- ✅ **Modern Interface**: Elegant dark theme with GitHub-inspired design
- ✅ **Developer-Friendly**: Comprehensive toolset covering daily development needs
- ✅ **Offline Capable**: Full functionality without internet connection after initial load

## Feature List

### 🕐 Time Conversion
- **Real-time Current Timestamp**: Live display of Unix timestamps (seconds/milliseconds)
- **Timestamp to Local Time**: Convert Unix timestamps with timezone support
- **Local Time to Timestamp**: Convert datetime input to Unix timestamps
- **Multi-timezone Support**: Hong Kong, Shanghai, Tokyo, New York, London, UTC
- **One-click Copy**: Click any timestamp value to copy instantly

### 🔐 Encoding/Decoding
- **Base64**: Bidirectional encode/decode for text content
- **URL Encoding**: URL-safe encoding and decoding
- **JWT Decoder**: Parse and display JWT token headers and payloads
- **Visual Feedback**: Copy buttons with status indicators

### 📝 Formatting Tools
- **JSON Formatter**: Format, minify, and validate JSON with syntax highlighting
- **YAML Formatter**: Format and beautify YAML content
- **Dual View Mode**: Toggle between text view and interactive tree view
- **Tree Navigation**: Collapsible object/array viewer with syntax highlighting
- **Advanced Search**: Real-time search in formatted data with navigation
- **Validation**: Built-in format validation with error reporting

### ⚙️ Generators
- **Hash Generator**: MD5, SHA1, SHA256, SHA512 hash generation
- **UUID Generator**: Generate single or multiple UUIDs (v4)
- **Password Generator**: Customizable length and character set options
- **Random String Generator**: Alphanumeric, alphabetic, numeric, or hexadecimal strings
- **Secure Generation**: Client-side cryptographic functions

### 🔍 Diff Comparison
- **Line-by-line Comparison**: Visual diff with highlighted changes
- **Statistics Display**: Count of added, removed, and unchanged lines
- **Color-coded Results**: Green for additions, red for deletions
- **Plain Text Export**: Copy diff results in plain text format

### 🔄 Format Conversion
- **JSON ↔ YAML**: Seamless bidirectional conversion
- **Error Handling**: Clear error messages for invalid input
- **Preserved Formatting**: Maintains data structure integrity

## Usage

### Single File Version (Recommended)

1. **Download File**
   ```bash
   # Download the complete tool
   curl -O https://raw.githubusercontent.com/dingjiayi/devtools/refs/heads/main/all-in-one-devtools.html
   # Or download directly from the project repository
   ```

2. **Open and Use**
   - Double-click the `all-in-one-devtools.html` file
   - Or drag and drop into your browser
   - No internet connection required after initial CDN resource loading

### Server Deployment (Optional)

For team sharing or hosting scenarios:

```bash
# Simple HTTP server
python -m http.server 8080
# Or using Node.js
npx serve .
```

Then access via: `http://localhost:8080/all-in-one-devtools.html`

## Technical Architecture

### Implementation Stack
- **Vue 3**: Reactive frontend framework (CDN included)
- **Single File Architecture**: Complete application in one HTML file
- **Modern CSS**: CSS3 variables with responsive design
- **Dark Theme**: GitHub-inspired color scheme

### External Dependencies (CDN)
- **Vue 3**: Core reactive framework
- **crypto-js**: Hash generation and cryptographic functions
- **js-yaml**: YAML parsing and formatting
- **diff**: Text comparison algorithms

### Styling & UX
- **JetBrains Mono**: Monospace font for code display
- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility**: Keyboard navigation and screen reader support
- **Modern Animations**: Smooth transitions and hover effects

## Browser Compatibility

| Browser | Minimum Version | Recommended |
| ------- | --------------- | ----------- |
| Chrome  | 87+             | Latest      |
| Firefox | 78+             | Latest      |
| Safari  | 14+             | Latest      |
| Edge    | 88+             | Latest      |

### Required Browser Features
- **ES6+ Support**: Modern JavaScript features
- **CSS Custom Properties**: For theming system
- **Clipboard API**: One-click copy functionality
- **Local Storage**: Settings persistence

## Security & Privacy

### Data Processing Principles
- ✅ **100% Local Processing**: All computations performed in your browser
- ✅ **Zero Server Communication**: No user data transmitted to any external service
- ✅ **No Analytics**: No tracking, analytics, or telemetry collection
- ✅ **No Data Storage**: No persistent storage of sensitive information
- ✅ **Open Source Transparency**: All code visible and auditable

### Privacy Protection
- 🔒 **Hash Generation**: Cryptographic functions executed entirely locally
- 🔒 **JWT Parsing**: Token content never leaves your browser
- 🔒 **Password Generation**: Secure client-side random number generation
- 🔒 **Session Isolation**: Data cleared automatically when browser closes

## Offline Usage

### Standalone Operation
- 📦 **Complete Functionality**: All features available in single HTML file
- 🌐 **CDN Fallback**: External resources cached after first load
- 📱 **Mobile Compatible**: Full functionality on mobile devices
- 💾 **Settings Persistence**: User preferences saved locally

### Network Dependencies
- **Initial Load**: Internet required for CDN resources (Vue.js, crypto-js, etc.)
- **Subsequent Use**: Fully offline capable once resources are cached
- **Font Loading**: Google Fonts optional with system font fallbacks

## Deployment Guide

### Personal Use
1. Download `all-in-one-devtools.html`
2. Save to your preferred location
3. Bookmark in browser for quick access
4. Enjoy seamless development tools

### Team/Enterprise Deployment
```bash
# Internal web server deployment
nginx -s reload  # Add to nginx server block
# OR
python -m http.server 8080  # Quick development server
```

Access via: `http://your-server/all-in-one-devtools.html`

### Security Considerations
- ✅ Safe for corporate environments (no external data transmission)
- ✅ Can be audited for security compliance
- ✅ Works behind firewalls and proxies
- ✅ No server-side vulnerabilities (client-side only)

## FAQ

### Q: Is my data secure when using this tool?
A: **Absolutely.** All processing happens locally in your browser. No data is ever sent to any server, stored remotely, or transmitted over the internet. Your sensitive information never leaves your device.

### Q: Can I use this tool completely offline?
A: **Yes.** After the initial load (which downloads CDN resources), the tool works entirely offline. You can even save the HTML file locally and use it without any internet connection.

### Q: What file formats and data types are supported?
A: 
- **Text Processing**: JSON, YAML, Base64, URL encoding, JWT tokens
- **Hash Generation**: MD5, SHA1, SHA256, SHA512
- **Time Formats**: Unix timestamps (seconds/milliseconds), ISO 8601
- **Input Size**: Optimized for files up to 10MB for best performance

### Q: How do I update to the latest version?
A: Simply download the newest `all-in-one-devtools.html` file and replace your current version. Your browser will automatically use the updated version.

### Q: Does this work on mobile devices?
A: **Yes.** The tool is fully responsive and works on smartphones and tablets. All features are accessible through touch interfaces.

### Q: Can I use this in corporate/enterprise environments?
A: **Absolutely.** Since no data leaves your device and no external services are contacted during use, it's safe for corporate environments and can pass most security audits.

### Q: What browsers are supported?
A: All modern browsers including Chrome 87+, Firefox 78+, Safari 14+, and Edge 88+. The tool uses standard web technologies with broad compatibility.

### Q: Are there any limitations on input size?
A: While there's no hard limit, we recommend keeping individual inputs under 10MB for optimal performance. Larger data sets may cause browser lag.

## Quick Start Guide

### For Developers
1. **Download**: Get `all-in-one-devtools.html` from the repository
2. **Bookmark**: Add to browser bookmarks for instant access
3. **Daily Use**: Perfect for JSON formatting, hash generation, timestamp conversion
4. **Team Sharing**: Host on internal server for team access

### Common Use Cases
- 🔍 **API Development**: Format and validate JSON responses
- ⏰ **Log Analysis**: Convert timestamps between formats
- 🔐 **Security Testing**: Generate hashes and decode tokens
- 📝 **Data Processing**: Convert between JSON and YAML formats
- 🎲 **Development Setup**: Generate UUIDs and secure passwords

## Project Structure

This project contains only two essential files:
- `all-in-one-devtools.html` - Complete application (this is all you need!)
- `README.md` - Documentation and usage guide

## Version History

- **v1.0.0**: Initial release with core toolset
  - Time conversion utilities
  - Encoding/decoding tools
  - JSON/YAML formatting with tree view
  - Hash and UUID generators
  - Text diff comparison
  - Format conversion tools

## Contributing

We welcome contributions to improve DevTools! Here's how you can help:

### Reporting Issues
- 🐛 **Bug Reports**: Describe the issue with steps to reproduce
- 💡 **Feature Requests**: Suggest new tools or improvements
- 📚 **Documentation**: Help improve this README or add examples

### Development Guidelines
- Keep the single-file architecture
- Maintain 100% local processing (no external API calls)
- Follow the existing dark theme design
- Ensure mobile compatibility
- Add comprehensive error handling

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - Free for personal and commercial use
✅ Use commercially
✅ Modify and distribute
✅ Private use
❌ Liability
❌ Warranty
```

## Support & Contact

### Getting Help
- 📖 **Documentation**: Read through this comprehensive README
- 🔍 **Search Issues**: Check existing GitHub issues for solutions
- 💬 **Discussions**: Join project discussions for Q&A

### Reporting Problems
- 📧 **GitHub Issues**: Preferred method for bug reports
- 🔧 **Pull Requests**: Welcome for bug fixes and improvements
- 💡 **Feature Requests**: Use GitHub issues with enhancement label

### Community
- ⭐ **Star the Project**: Help others discover this tool
- 🔄 **Share**: Spread the word about secure, local development tools
- 🤝 **Contribute**: Code, documentation, or feedback welcome

---

## 🚀 Get Started Now!

**Ready to boost your development workflow?**

1. **[Download all-in-one-devtools.html](./all-in-one-devtools.html)**
2. **Double-click to open in your browser**
3. **Bookmark for instant access**
4. **Enjoy secure, local development tools!**

---

**⚡ DevTools - Making development simpler, making data safer!**

*Built with ❤️ for developers who value privacy and efficiency*
