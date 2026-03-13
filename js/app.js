/* ========================================
   DevTools - Developer Tool Collection
   Vue 3 Application
   ======================================== */

const { createApp } = Vue;

createApp({
    data() {
        return {
            currentTab: 'time',
            menuItems: [
                { id: 'time', name: 'Time Conversion', icon: '🕐' },
                { id: 'encoder', name: 'Encoding/Decoding', icon: '🔐' },
                { id: 'formatter', name: 'Formatting Tools', icon: '📝' },
                { id: 'generator', name: 'Generators', icon: '⚙️' },
                { id: 'diff', name: 'Diff Comparison', icon: '🔍' },
                { id: 'converter', name: 'Format Conversion', icon: '🔄' },
                { id: 'regex', name: 'Regex Tester', icon: '🔧' },
            ],

            // Time Conversion
            currentTimestamp: 0,
            currentTime: '',
            timestampInput: '',
            selectedTimezone: 'Asia/Hong_Kong',
            convertedTime: '',
            datetimeInput: '',
            convertedTimestamp: null,

            // Encoding/Decoding
            currentEncoderTab: 'base64',
            encoderTabs: [
                { id: 'base64', name: 'Base64' },
                { id: 'url', name: 'URL' },
                { id: 'jwt', name: 'JWT' },
                { id: 'unicode', name: 'Unicode' }
            ],
            base64Input: '',
            base64Result: '',
            urlInput: '',
            urlResult: '',
            jwtInput: '',
            jwtResult: '',
            unicodeInput: '',
            unicodeResult: '',

            // Formatting Tools
            currentFormatterTab: 'json',
            formatterTabs: [
                { id: 'json', name: 'JSON' },
                { id: 'yaml', name: 'YAML' }
            ],
            formatterInput: '',
            formatterResult: '',
            formatterViewMode: 'text',
            formatterParsedData: null,
            formatterError: null,
            searchQuery: '',
            searchResults: [],
            currentSearchIndex: -1,

            // Generators
            currentGeneratorTab: 'hash',
            generatorTabs: [
                { id: 'hash', name: 'Hash Generator' },
                { id: 'uuid', name: 'UUID Generator' },
                { id: 'password', name: 'Password Generator' },
                { id: 'random', name: 'Random String' }
            ],
            hashInput: '',
            hashResult: '',
            uuidResult: '',
            passwordLength: 16,
            passwordOptions: {
                uppercase: true,
                lowercase: true,
                numbers: true,
                symbols: false
            },
            passwordResult: '',
            randomStringLength: 32,
            randomStringType: 'alphanumeric',
            randomStringResult: '',

            // Diff Comparison
            diffText1: '',
            diffText2: '',
            diffResult: { lines: [], leftLines: [], rightLines: [] },
            diffStats: null,
            diffViewMode: 'split',
            isScrollSyncing: false,

            // Format Conversion
            currentConverterTab: 'json-to-yaml',
            converterTabs: [
                { id: 'json-to-yaml', name: 'JSON → YAML' },
                { id: 'yaml-to-json', name: 'YAML → JSON' }
            ],
            converterInput: '',
            converterResult: '',

            // Regex Tester
            regexInput: '',
            regexTestText: '',
            regexFlags: {
                g: true,
                i: false,
                m: false,
                s: false,
                u: false,
                y: false
            },
            regexMatches: [],
            regexError: '',
            selectedTemplate: null,
            regexDebounceTimer: null,
            regexTemplates: {
                '📁 Backend Validation': [
                    { name: '📧 Email Address', pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', test: 'user@example.com' },
                    { name: '📱 Phone Number (CN)', pattern: '^1[3-9]\\d{9}$', test: '13812345678' },
                    { name: '💳 ID Card (CN)', pattern: '^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$', test: '110101199001011234' },
                    { name: '🔢 Pure Numbers', pattern: '^\\d+$', test: '123456' },
                    { name: '💰 Currency Format', pattern: '^\\d+(\\.\\d{1,2})?$', test: '123.45' }
                ],
                '📁 Network Related': [
                    { name: '🌐 URL Address', pattern: '^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$', test: 'https://api.example.com/users' },
                    { name: '🌍 IPv4 Address', pattern: '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$', test: '192.168.1.1' },
                    { name: '🔗 Domain Name', pattern: '^[a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.[a-zA-Z]{2,}$', test: 'api.example.com' }
                ],
                '📁 Date & Time': [
                    { name: '📅 Date YYYY-MM-DD', pattern: '^\\d{4}-\\d{2}-\\d{2}$', test: '2025-06-17' },
                    { name: '🕐 Time HH:MM:SS', pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$', test: '14:30:25' },
                    { name: '📆 ISO8601 Timestamp', pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d{3})?Z?$', test: '2025-06-17T14:30:25.123Z' }
                ],
                '📁 Code Formats': [
                    { name: '📝 Variable (camelCase)', pattern: '^[a-z][a-zA-Z0-9]*$', test: 'userName' },
                    { name: '📝 Variable (snake_case)', pattern: '^[a-z][a-z0-9_]*$', test: 'user_name' },
                    { name: '🎨 Hex Color', pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$', test: '#FF5733' },
                    { name: '🔤 UUID Format', pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', test: '550e8400-e29b-41d4-a716-446655440000' }
                ]
            }
        }
    },

    methods: {
        // === Navigation ===
        setCurrentTab(tab) {
            this.currentTab = tab;
        },

        // === Time Conversion ===
        updateTime() {
            const now = new Date();
            this.currentTimestamp = Math.floor(now.getTime() / 1000);
            this.currentTime = now.toLocaleTimeString('en-US', { hour12: false });
        },

        convertTimestamp() {
            if (!this.timestampInput) {
                this.convertedTime = '';
                return;
            }

            let timestamp = parseInt(this.timestampInput);
            const date = new Date(timestamp * 1000);

            try {
                this.convertedTime = date.toLocaleString('en-US', {
                    timeZone: this.selectedTimezone,
                    hour12: false,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
            } catch (e) {
                this.convertedTime = "Invalid timezone or timestamp";
            }
        },

        convertToTimestamp() {
            if (!this.datetimeInput) {
                this.convertedTimestamp = null;
                return;
            }
            try {
                const localDate = new Date(this.datetimeInput);
                if (isNaN(localDate.getTime())) {
                    this.convertedTimestamp = { error: "Invalid date time format" };
                    return;
                }
                this.convertedTimestamp = {
                    seconds: Math.floor(localDate.getTime() / 1000),
                };
            } catch (e) {
                this.convertedTimestamp = { error: "Error converting to timestamp" };
            }
        },

        // === Encoding/Decoding ===
        encodeBase64() {
            if (!this.base64Input) return;
            this.base64Result = btoa(unescape(encodeURIComponent(this.base64Input)));
        },

        decodeBase64() {
            if (!this.base64Input) return;
            try {
                this.base64Result = decodeURIComponent(escape(atob(this.base64Input)));
            } catch (e) {
                this.base64Result = 'Decode failed: ' + e.message;
            }
        },

        clearBase64() {
            this.base64Input = '';
            this.base64Result = '';
        },

        encodeUrl() {
            if (!this.urlInput) return;
            this.urlResult = encodeURIComponent(this.urlInput);
        },

        decodeUrl() {
            if (!this.urlInput) return;
            try {
                this.urlResult = decodeURIComponent(this.urlInput);
            } catch (e) {
                this.urlResult = 'Decode failed: ' + e.message;
            }
        },

        clearUrl() {
            this.urlInput = '';
            this.urlResult = '';
        },

        decodeJWT() {
            if (!this.jwtInput) return;
            try {
                const parts = this.jwtInput.split('.');
                if (parts.length !== 3) {
                    this.jwtResult = 'Invalid JWT format';
                    return;
                }
                const header = JSON.parse(atob(parts[0]));
                const payload = JSON.parse(atob(parts[1]));
                this.jwtResult = JSON.stringify({ header, payload }, null, 2);
            } catch (e) {
                this.jwtResult = 'Decode failed: ' + e.message;
            }
        },

        clearJWT() {
            this.jwtInput = '';
            this.jwtResult = '';
        },

        encodeUnicode() {
            if (!this.unicodeInput) return;
            let result = '';
            for (let i = 0; i < this.unicodeInput.length; i++) {
                let hex = this.unicodeInput.charCodeAt(i).toString(16);
                result += '\\u' + '0000'.substring(0, 4 - hex.length) + hex;
            }
            this.unicodeResult = result;
        },

        decodeUnicode() {
            if (!this.unicodeInput) return;
            try {
                this.unicodeResult = this.unicodeInput.replace(/\\u([0-9A-Fa-f]{4})/g, (match, grp) => {
                    return String.fromCharCode(parseInt(grp, 16));
                });
                this.unicodeResult = this.unicodeResult.replace(/\\U([0-9A-Fa-f]{8})/g, (match, grp) => {
                    let codePoint = parseInt(grp, 16);
                    if (codePoint > 0xFFFF) {
                        let H = Math.floor((codePoint - 0x10000) / 0x400) + 0xD800;
                        let L = (codePoint - 0x10000) % 0x400 + 0xDC00;
                        return String.fromCharCode(H, L);
                    }
                    return String.fromCharCode(codePoint);
                });
            } catch (e) {
                this.unicodeResult = 'Decode failed: ' + e.message;
            }
        },

        clearUnicode() {
            this.unicodeInput = '';
            this.unicodeResult = '';
        },

        // === Formatting Tools ===
        getFormatterPlaceholder() {
            switch (this.currentFormatterTab) {
                case 'json': return 'Enter JSON content...';
                case 'yaml': return 'Enter YAML content...';
                default: return 'Enter content...';
            }
        },

        formatContent() {
            if (!this.formatterInput) return;
            this.formatterError = null;

            try {
                if (this.currentFormatterTab === 'json') {
                    const parsed = JSON.parse(this.formatterInput);
                    this.formatterResult = JSON.stringify(parsed, null, 2);
                    this.formatterParsedData = parsed;
                } else if (this.currentFormatterTab === 'yaml') {
                    if (typeof jsyaml !== 'undefined') {
                        const parsed = jsyaml.load(this.formatterInput);
                        this.formatterResult = jsyaml.dump(parsed, {
                            indent: 2,
                            lineWidth: 120,
                            noRefs: true,
                            sortKeys: false
                        });
                        this.formatterParsedData = parsed;
                    } else {
                        this.formatterResult = 'YAML library not loaded';
                        this.formatterParsedData = null;
                    }
                }
            } catch (e) {
                const position = this.parseErrorPosition(e.message, this.formatterInput);
                this.formatterError = { message: e.message, position };
                this.formatterResult = '';
                this.formatterParsedData = null;
            }
        },

        minifyContent() {
            if (!this.formatterInput) return;
            this.formatterError = null;

            try {
                if (this.currentFormatterTab === 'json') {
                    const parsed = JSON.parse(this.formatterInput);
                    this.formatterResult = JSON.stringify(parsed);
                } else if (this.currentFormatterTab === 'yaml') {
                    if (typeof jsyaml !== 'undefined') {
                        const parsed = jsyaml.load(this.formatterInput);
                        this.formatterResult = jsyaml.dump(parsed, {
                            flowLevel: 0,
                            indent: 0,
                            lineWidth: -1,
                            noRefs: true
                        });
                    } else {
                        this.formatterResult = 'YAML library not loaded';
                    }
                }
            } catch (e) {
                const position = this.parseErrorPosition(e.message, this.formatterInput);
                this.formatterError = { message: e.message, position };
                this.formatterResult = '';
            }
        },

        validateContent() {
            if (!this.formatterInput) return;
            this.formatterError = null;

            try {
                if (this.currentFormatterTab === 'json') {
                    JSON.parse(this.formatterInput);
                    this.formatterResult = '✅ JSON format is valid';
                } else if (this.currentFormatterTab === 'yaml') {
                    if (typeof jsyaml !== 'undefined') {
                        jsyaml.load(this.formatterInput);
                        this.formatterResult = '✅ YAML format is valid';
                    } else {
                        this.formatterResult = 'YAML library not loaded';
                    }
                }
            } catch (e) {
                const position = this.parseErrorPosition(e.message, this.formatterInput);
                this.formatterError = { message: e.message, position };
                this.formatterResult = '';
            }
        },

        clearFormatter() {
            this.formatterInput = '';
            this.formatterResult = '';
            this.formatterParsedData = null;
            this.formatterViewMode = 'text';
            this.formatterError = null;
            this.searchQuery = '';
            this.searchResults = [];
            this.currentSearchIndex = -1;
        },

        clearFormatterError() {
            this.formatterError = null;
        },

        parseErrorPosition(errorMessage, inputText) {
            const jsonPositionMatch = errorMessage.match(/at position (\d+)/);
            const jsonLineColumnMatch = errorMessage.match(/line (\d+) column (\d+)/);

            if (jsonPositionMatch) {
                const position = parseInt(jsonPositionMatch[1]);
                const lineColumn = this.getLineColumnFromPosition(inputText, position);
                return { index: position, line: lineColumn.line, column: lineColumn.column };
            }

            if (jsonLineColumnMatch) {
                const line = parseInt(jsonLineColumnMatch[1]);
                const column = parseInt(jsonLineColumnMatch[2]);
                const position = this.getPositionFromLineColumn(inputText, line, column);
                return { index: position, line, column };
            }

            const yamlLineMatch = errorMessage.match(/at line (\d+), column (\d+)/);
            if (yamlLineMatch) {
                const line = parseInt(yamlLineMatch[1]);
                const column = parseInt(yamlLineMatch[2]);
                const position = this.getPositionFromLineColumn(inputText, line, column);
                return { index: position, line, column };
            }

            return null;
        },

        getLineColumnFromPosition(text, position) {
            const lines = text.substring(0, position).split('\n');
            return { line: lines.length, column: lines[lines.length - 1].length + 1 };
        },

        getPositionFromLineColumn(text, line, column) {
            const lines = text.split('\n');
            let position = 0;
            for (let i = 0; i < line - 1 && i < lines.length; i++) {
                position += lines[i].length + 1;
            }
            position += Math.max(0, column - 1);
            return position;
        },

        getHighlightedInput() {
            if (!this.formatterError || !this.formatterError.position || !this.formatterInput) {
                return '';
            }
            const input = this.formatterInput;
            const pos = this.formatterError.position.index;
            const start = Math.max(0, pos - 1);
            const end = Math.min(input.length, pos + 10);

            const before = this.escapeHtml(input.substring(0, start));
            const error = this.escapeHtml(input.substring(start, end));
            const after = this.escapeHtml(input.substring(end));

            return before + '<span class="error-highlight">' + error + '</span>' + after;
        },

        // === Tree View ===
        renderTreeView(data, level = 0) {
            if (data === null) return '<span class="tree-value null">null</span>';
            if (typeof data === 'string') return `<span class="tree-value string">"${this.escapeHtml(data)}"</span>`;
            if (typeof data === 'number') return `<span class="tree-value number">${data}</span>`;
            if (typeof data === 'boolean') return `<span class="tree-value boolean">${data}</span>`;

            if (Array.isArray(data)) {
                if (data.length === 0) return '<span class="tree-value">[]</span>';
                let html = '<span class="tree-toggle" onclick="this.parentElement.classList.toggle(\'tree-collapsed\')">▼</span>';
                html += `<span class="tree-key">Array[${data.length}]</span>`;
                html += '<div class="tree-children">';
                data.forEach((item, index) => {
                    html += '<div class="tree-node">';
                    html += `<span class="tree-key">[${index}]:</span>`;
                    html += this.renderTreeView(item, level + 1);
                    html += '</div>';
                });
                html += '</div>';
                return html;
            }

            if (typeof data === 'object') {
                const keys = Object.keys(data);
                if (keys.length === 0) return '<span class="tree-value">{}</span>';
                let html = '<span class="tree-toggle" onclick="this.parentElement.classList.toggle(\'tree-collapsed\')">▼</span>';
                html += `<span class="tree-key">Object{${keys.length}}</span>`;
                html += '<div class="tree-children">';
                keys.forEach(key => {
                    html += '<div class="tree-node">';
                    html += `<span class="tree-key">"${this.escapeHtml(key)}":</span>`;
                    html += this.renderTreeView(data[key], level + 1);
                    html += '</div>';
                });
                html += '</div>';
                return html;
            }

            return `<span class="tree-value">${this.escapeHtml(String(data))}</span>`;
        },

        // === Search ===
        searchInData() {
            if (!this.searchQuery || !this.formatterParsedData) {
                this.searchResults = [];
                this.currentSearchIndex = -1;
                return;
            }
            this.searchResults = this.findAllMatches(this.formatterParsedData, this.searchQuery.toLowerCase());
            this.currentSearchIndex = this.searchResults.length > 0 ? 0 : -1;
        },

        findAllMatches(obj, query, path = []) {
            const matches = [];
            if (obj === null || obj === undefined) return matches;

            if (Array.isArray(obj)) {
                obj.forEach((item, index) => {
                    matches.push(...this.findAllMatches(item, query, [...path, `[${index}]`]));
                });
            } else if (typeof obj === 'object') {
                Object.keys(obj).forEach(key => {
                    const currentPath = [...path, key];
                    if (key.toLowerCase().includes(query)) {
                        matches.push({ type: 'key', path: currentPath, value: key, fullPath: currentPath.join('.') });
                    }
                    matches.push(...this.findAllMatches(obj[key], query, currentPath));
                });
            } else {
                if (String(obj).toLowerCase().includes(query)) {
                    matches.push({ type: 'value', path, value: obj, fullPath: path.join('.') });
                }
            }
            return matches;
        },

        nextSearchResult() {
            if (this.searchResults.length === 0) return;
            this.currentSearchIndex = (this.currentSearchIndex + 1) % this.searchResults.length;
        },

        previousSearchResult() {
            if (this.searchResults.length === 0) return;
            this.currentSearchIndex = this.currentSearchIndex <= 0
                ? this.searchResults.length - 1
                : this.currentSearchIndex - 1;
        },

        highlightSearchInText(text) {
            if (!this.searchQuery) return this.escapeHtml(text);
            const escapedText = this.escapeHtml(text);
            const query = this.escapeHtml(this.searchQuery);
            const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            return escapedText.replace(regex, '<span class="search-highlight">$1</span>');
        },

        renderTreeViewWithSearch(data, level = 0) {
            return this.renderTreeViewInternal(data, level, true);
        },

        renderTreeViewInternal(data, level = 0, withSearch = false, path = []) {
            if (data === null) {
                const highlighted = withSearch ? this.highlightValue('null', path) : 'null';
                return `<span class="tree-value null">${highlighted}</span>`;
            }
            if (typeof data === 'string') {
                const valueText = `"${this.escapeHtml(data)}"`;
                const highlighted = withSearch ? this.highlightValue(valueText, path) : valueText;
                return `<span class="tree-value string">${highlighted}</span>`;
            }
            if (typeof data === 'number') {
                const valueText = String(data);
                const highlighted = withSearch ? this.highlightValue(valueText, path) : valueText;
                return `<span class="tree-value number">${highlighted}</span>`;
            }
            if (typeof data === 'boolean') {
                const valueText = String(data);
                const highlighted = withSearch ? this.highlightValue(valueText, path) : valueText;
                return `<span class="tree-value boolean">${highlighted}</span>`;
            }

            if (Array.isArray(data)) {
                if (data.length === 0) return '<span class="tree-value">[]</span>';
                let html = '<span class="tree-toggle" onclick="this.parentElement.classList.toggle(\'tree-collapsed\')">▼</span>';
                html += `<span class="tree-key">Array[${data.length}]</span>`;
                html += '<div class="tree-children">';
                data.forEach((item, index) => {
                    const currentPath = [...path, `[${index}]`];
                    html += '<div class="tree-node">';
                    const keyText = `[${index}]`;
                    const highlightedKey = withSearch ? this.highlightKey(keyText, currentPath) : keyText;
                    html += `<span class="tree-key">${highlightedKey}:</span>`;
                    html += this.renderTreeViewInternal(item, level + 1, withSearch, currentPath);
                    html += '</div>';
                });
                html += '</div>';
                return html;
            }

            if (typeof data === 'object') {
                const keys = Object.keys(data);
                if (keys.length === 0) return '<span class="tree-value">{}</span>';
                let html = '<span class="tree-toggle" onclick="this.parentElement.classList.toggle(\'tree-collapsed\')">▼</span>';
                html += `<span class="tree-key">Object{${keys.length}}</span>`;
                html += '<div class="tree-children">';
                keys.forEach(key => {
                    const currentPath = [...path, key];
                    html += '<div class="tree-node">';
                    const keyText = `"${this.escapeHtml(key)}"`;
                    const highlightedKey = withSearch ? this.highlightKey(keyText, currentPath) : keyText;
                    html += `<span class="tree-key">${highlightedKey}:</span>`;
                    html += this.renderTreeViewInternal(data[key], level + 1, withSearch, currentPath);
                    html += '</div>';
                });
                html += '</div>';
                return html;
            }

            const valueText = this.escapeHtml(String(data));
            const highlighted = withSearch ? this.highlightValue(valueText, path) : valueText;
            return `<span class="tree-value">${highlighted}</span>`;
        },

        highlightKey(keyText, path) {
            if (!this.searchQuery) return keyText;
            const pathString = path.join('.');
            const isMatched = this.searchResults.some(r => r.type === 'key' && r.fullPath === pathString);

            if (isMatched) {
                const isCurrent = this.searchResults.findIndex((r, i) =>
                    r.type === 'key' && r.fullPath === pathString && i === this.currentSearchIndex
                ) !== -1;
                const className = isCurrent ? 'search-highlight current' : 'search-highlight';
                const query = this.escapeHtml(this.searchQuery);
                const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                return keyText.replace(regex, `<span class="${className}">$1</span>`);
            }
            return keyText;
        },

        highlightValue(valueText, path) {
            if (!this.searchQuery) return valueText;
            const pathString = path.join('.');
            const isMatched = this.searchResults.some(r => r.type === 'value' && r.fullPath === pathString);

            if (isMatched) {
                const isCurrent = this.searchResults.findIndex((r, i) =>
                    r.type === 'value' && r.fullPath === pathString && i === this.currentSearchIndex
                ) !== -1;
                const className = isCurrent ? 'search-highlight current' : 'search-highlight';
                const query = this.escapeHtml(this.searchQuery);
                const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                return valueText.replace(regex, `<span class="${className}">$1</span>`);
            }
            return valueText;
        },

        // === Generators ===
        generateHash(algorithm) {
            if (!this.hashInput) return;
            if (typeof CryptoJS !== 'undefined') {
                let hash;
                switch (algorithm) {
                    case 'MD5': hash = CryptoJS.MD5(this.hashInput); break;
                    case 'SHA1': hash = CryptoJS.SHA1(this.hashInput); break;
                    case 'SHA256': hash = CryptoJS.SHA256(this.hashInput); break;
                    case 'SHA512': hash = CryptoJS.SHA512(this.hashInput); break;
                }
                this.hashResult = `${algorithm}: ${hash.toString()}`;
            } else {
                this.hashResult = 'Crypto library not loaded';
            }
        },

        clearHash() {
            this.hashInput = '';
            this.hashResult = '';
        },

        generateUUID() {
            this.uuidResult = this.uuid4();
        },

        generateMultipleUUID() {
            const uuids = [];
            for (let i = 0; i < 10; i++) {
                uuids.push(this.uuid4());
            }
            this.uuidResult = uuids.join('\n');
        },

        clearUUID() {
            this.uuidResult = '';
        },

        uuid4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0;
                const v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },

        generatePassword() {
            const chars = {
                uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                lowercase: 'abcdefghijklmnopqrstuvwxyz',
                numbers: '0123456789',
                symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
            };

            let charset = '';
            for (const [key, value] of Object.entries(this.passwordOptions)) {
                if (value) charset += chars[key];
            }

            if (!charset) {
                this.passwordResult = 'Please select at least one character type';
                return;
            }

            let password = '';
            for (let i = 0; i < this.passwordLength; i++) {
                password += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            this.passwordResult = password;
        },

        clearPassword() {
            this.passwordResult = '';
        },

        generateRandomString() {
            const charsets = {
                alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
                alphabetic: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
                numeric: '0123456789',
                hex: '0123456789ABCDEF'
            };

            const charset = charsets[this.randomStringType];
            let result = '';
            for (let i = 0; i < this.randomStringLength; i++) {
                result += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            this.randomStringResult = result;
        },

        clearRandomString() {
            this.randomStringResult = '';
        },

        // === Diff Comparison ===
        compareDiff() {
            if (!this.diffText1 || !this.diffText2) {
                this.diffResult = { lines: [], leftLines: [], rightLines: [] };
                this.diffStats = null;
                return;
            }

            const diff = Diff.diffLines(this.diffText1, this.diffText2);

            const lines = [];
            let oldLineNumber = 1;
            let newLineNumber = 1;
            let unifiedLineNumber = 1;
            let stats = { added: 0, removed: 0, unchanged: 0 };

            diff.forEach(part => {
                const partLines = part.value.split('\n');
                if (partLines[partLines.length - 1] === '') {
                    partLines.pop();
                }

                partLines.forEach(lineContent => {
                    const escapedContent = this.escapeHtmlForDiff(lineContent);

                    if (part.added) {
                        lines.push({
                            type: 'added',
                            content: escapedContent,
                            rawContent: lineContent,
                            oldNumber: null,
                            newNumber: newLineNumber,
                            unifiedNumber: unifiedLineNumber
                        });
                        newLineNumber++;
                        stats.added++;
                    } else if (part.removed) {
                        lines.push({
                            type: 'removed',
                            content: escapedContent,
                            rawContent: lineContent,
                            oldNumber: oldLineNumber,
                            newNumber: null,
                            unifiedNumber: unifiedLineNumber
                        });
                        oldLineNumber++;
                        stats.removed++;
                    } else {
                        lines.push({
                            type: 'context',
                            content: escapedContent,
                            rawContent: lineContent,
                            oldNumber: oldLineNumber,
                            newNumber: newLineNumber,
                            unifiedNumber: unifiedLineNumber
                        });
                        oldLineNumber++;
                        newLineNumber++;
                        stats.unchanged++;
                    }
                    unifiedLineNumber++;
                });
            });

            // Apply word-level diff for better visualization
            this.applyWordDiff(lines);

            // Generate split view data with proper pairing
            const { leftLines, rightLines } = this.generateSplitViewData(lines);

            this.diffResult = { lines, leftLines, rightLines };
            this.diffStats = stats;
        },

        generateSplitViewData(unifiedLines) {
            const leftLines = [];
            const rightLines = [];

            let i = 0;
            while (i < unifiedLines.length) {
                const line = unifiedLines[i];

                if (line.type === 'context') {
                    leftLines.push({
                        type: 'context',
                        content: line.content,
                        lineNumber: line.oldNumber
                    });
                    rightLines.push({
                        type: 'context',
                        content: line.content,
                        lineNumber: line.newNumber
                    });
                    i++;
                } else {
                    // Collect consecutive removed and added lines
                    const removedGroup = [];
                    const addedGroup = [];

                    while (i < unifiedLines.length && unifiedLines[i].type === 'removed') {
                        removedGroup.push(unifiedLines[i]);
                        i++;
                    }
                    while (i < unifiedLines.length && unifiedLines[i].type === 'added') {
                        addedGroup.push(unifiedLines[i]);
                        i++;
                    }

                    // Pair removed and added lines side by side
                    const maxLen = Math.max(removedGroup.length, addedGroup.length);
                    for (let j = 0; j < maxLen; j++) {
                        if (j < removedGroup.length) {
                            leftLines.push({
                                type: 'removed',
                                content: removedGroup[j].content,
                                lineNumber: removedGroup[j].oldNumber
                            });
                        } else {
                            leftLines.push({
                                type: 'empty',
                                content: '',
                                lineNumber: null
                            });
                        }

                        if (j < addedGroup.length) {
                            rightLines.push({
                                type: 'added',
                                content: addedGroup[j].content,
                                lineNumber: addedGroup[j].newNumber
                            });
                        } else {
                            rightLines.push({
                                type: 'empty',
                                content: '',
                                lineNumber: null
                            });
                        }
                    }
                }
            }

            return { leftLines, rightLines };
        },

        applyWordDiff(lines) {
            for (let i = 0; i < lines.length; i++) {
                const currentLine = lines[i];

                if (currentLine.type === 'removed') {
                    for (let j = i + 1; j < lines.length; j++) {
                        const nextLine = lines[j];

                        if (nextLine.type === 'added') {
                            // FIX: Use raw (unescaped) content for word diff comparison
                            const wordDiff = Diff.diffWords(currentLine.rawContent, nextLine.rawContent);

                            let removedContent = '';
                            let addedContent = '';

                            wordDiff.forEach(part => {
                                // Escape each part individually after diffing
                                const escaped = this.escapeHtmlForDiff(part.value);
                                if (part.added) {
                                    addedContent += `<span class="diff-word-added">${escaped}</span>`;
                                } else if (part.removed) {
                                    removedContent += `<span class="diff-word-removed">${escaped}</span>`;
                                } else {
                                    removedContent += escaped;
                                    addedContent += escaped;
                                }
                            });

                            currentLine.content = removedContent;
                            nextLine.content = addedContent;
                            break;
                        } else if (nextLine.type === 'context') {
                            break;
                        }
                    }
                }
            }
        },

        // HTML escaping - single canonical implementation
        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        },

        // Escape HTML for diff display (preserves quotes for readability)
        escapeHtmlForDiff(text) {
            const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;' };
            return text.replace(/[&<>]/g, m => map[m]);
        },

        copyDiffResult(event) {
            const diff = Diff.diffLines(this.diffText1, this.diffText2);
            let unifiedDiff = `--- Original\n+++ New\n`;

            diff.forEach(part => {
                const lines = part.value.split('\n');
                if (lines[lines.length - 1] === '') lines.pop();

                lines.forEach(line => {
                    if (part.added) {
                        unifiedDiff += `+${line}\n`;
                    } else if (part.removed) {
                        unifiedDiff += `-${line}\n`;
                    } else {
                        unifiedDiff += ` ${line}\n`;
                    }
                });
            });

            this.copyToClipboard(unifiedDiff, event);
        },

        clearDiff() {
            this.diffText1 = '';
            this.diffText2 = '';
            this.diffResult = { lines: [], leftLines: [], rightLines: [] };
            this.diffStats = null;
        },

        // Synchronized scrolling for split view
        onLeftScrollSync(event) {
            if (this.isScrollSyncing) return;
            this.isScrollSyncing = true;

            const leftContent = event.target;
            const rightContent = this.$refs.rightSplitContent;

            if (rightContent) {
                rightContent.scrollTop = leftContent.scrollTop;
                rightContent.scrollLeft = leftContent.scrollLeft;
            }

            requestAnimationFrame(() => {
                this.isScrollSyncing = false;
            });
        },

        onRightScrollSync(event) {
            if (this.isScrollSyncing) return;
            this.isScrollSyncing = true;

            const rightContent = event.target;
            const leftContent = this.$refs.leftSplitContent;

            if (leftContent) {
                leftContent.scrollTop = rightContent.scrollTop;
                leftContent.scrollLeft = rightContent.scrollLeft;
            }

            requestAnimationFrame(() => {
                this.isScrollSyncing = false;
            });
        },

        // === Format Conversion ===
        getConverterPlaceholder() {
            switch (this.currentConverterTab) {
                case 'json-to-yaml': return 'Enter JSON content...';
                case 'yaml-to-json': return 'Enter YAML content...';
                default: return 'Enter content...';
            }
        },

        convertFormat() {
            if (!this.converterInput) return;

            try {
                if (this.currentConverterTab === 'json-to-yaml') {
                    const parsed = JSON.parse(this.converterInput);
                    if (typeof jsyaml !== 'undefined') {
                        this.converterResult = jsyaml.dump(parsed);
                    } else {
                        this.converterResult = 'Simplified YAML output:\n' + JSON.stringify(parsed, null, 2);
                    }
                } else if (this.currentConverterTab === 'yaml-to-json') {
                    if (typeof jsyaml !== 'undefined') {
                        const parsed = jsyaml.load(this.converterInput);
                        this.converterResult = JSON.stringify(parsed, null, 2);
                    } else {
                        this.converterResult = 'YAML conversion library not loaded';
                    }
                }
            } catch (e) {
                this.converterResult = 'Conversion failed: ' + e.message;
            }
        },

        clearConverter() {
            this.converterInput = '';
            this.converterResult = '';
        },

        // === Regex Tester ===
        debouncedTestRegex() {
            if (this.regexDebounceTimer) {
                clearTimeout(this.regexDebounceTimer);
            }
            this.regexDebounceTimer = setTimeout(() => {
                this.testRegex();
            }, 300);
        },

        testRegex() {
            this.regexMatches = [];
            this.regexError = '';

            if (!this.regexInput) return;

            try {
                const flags = Object.keys(this.regexFlags).filter(key => this.regexFlags[key]).join('');
                const regex = new RegExp(this.regexInput, flags);

                if (!this.regexTestText) return;

                const maxTextLength = 10000;
                const maxMatches = 1000;
                const textToTest = this.regexTestText.length > maxTextLength
                    ? this.regexTestText.substring(0, maxTextLength) + '...(truncated)'
                    : this.regexTestText;

                const lines = textToTest.split('\n');
                const matches = [];
                const maxLines = 500;
                const linesToProcess = lines.slice(0, maxLines);

                for (let lineIndex = 0; lineIndex < linesToProcess.length; lineIndex++) {
                    const line = linesToProcess[lineIndex];

                    if (this.regexFlags.g) {
                        let match;
                        const lineRegex = new RegExp(this.regexInput, flags);
                        while ((match = lineRegex.exec(line)) !== null && matches.length < maxMatches) {
                            matches.push({
                                match: match[0],
                                index: match.index,
                                lineIndex: lineIndex + 1,
                                line: line,
                                groups: match.slice(1),
                                fullMatch: match
                            });
                        }
                    } else {
                        const match = line.match(regex);
                        if (match && matches.length < maxMatches) {
                            matches.push({
                                match: match[0],
                                index: match.index,
                                lineIndex: lineIndex + 1,
                                line: line,
                                groups: match.slice(1),
                                fullMatch: match
                            });
                        }
                    }
                }

                this.regexMatches = matches;

                if (this.regexTestText.length > maxTextLength) {
                    this.regexError = `Text too long, only processing first ${maxTextLength} characters`;
                } else if (matches.length >= maxMatches) {
                    this.regexError = `Too many matches, only showing first ${maxMatches} results`;
                } else if (lines.length > maxLines) {
                    this.regexError = `Too many lines, only processing first ${maxLines} lines`;
                }
            } catch (error) {
                this.regexError = 'Invalid regular expression: ' + error.message;
            }
        },

        highlightMatches(text, lineIndex) {
            if (!this.regexInput || this.regexError.includes('Invalid regular expression')) {
                return text;
            }

            try {
                const lineMatches = this.regexMatches.filter(match => match.lineIndex === lineIndex + 1);
                if (lineMatches.length === 0) return text;

                let highlightedText = text;
                lineMatches.sort((a, b) => b.index - a.index);

                lineMatches.forEach(match => {
                    const before = highlightedText.substring(0, match.index);
                    const matchText = highlightedText.substring(match.index, match.index + match.match.length);
                    const after = highlightedText.substring(match.index + match.match.length);
                    highlightedText = before + `<span class="regex-highlight">${matchText}</span>` + after;
                });

                return highlightedText;
            } catch (error) {
                return text;
            }
        },

        applyTemplate(template) {
            this.regexInput = template.pattern;
            this.regexTestText = template.test;
            this.selectedTemplate = template;
            this.testRegex();
        },

        clearRegex() {
            this.regexInput = '';
            this.regexTestText = '';
            this.regexMatches = [];
            this.regexError = '';
            this.selectedTemplate = null;
        },

        getRegexFlags() {
            return Object.keys(this.regexFlags).filter(key => this.regexFlags[key]).join('');
        },

        // === Clipboard ===
        async copyToClipboard(text, event) {
            try {
                await navigator.clipboard.writeText(text);
                this.showCopyFeedback(event, true);
            } catch (err) {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                try {
                    document.execCommand('copy');
                    this.showCopyFeedback(event, true);
                } catch (copyErr) {
                    this.showCopyFeedback(event, false);
                }

                document.body.removeChild(textArea);
            }
        },

        showCopyFeedback(event, success) {
            if (!event || !event.target) return;
            const button = event.target;
            const originalText = button.textContent;

            if (success) {
                button.textContent = '✅ Copied!';
                button.style.background = 'var(--accent-green)';
            } else {
                button.textContent = '❌ Failed';
                button.style.background = 'var(--accent-red)';
            }

            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);
        }
    },

    beforeUnmount() {
        if (this.regexDebounceTimer) {
            clearTimeout(this.regexDebounceTimer);
        }
    },

    mounted() {
        this.updateTime();
        setInterval(this.updateTime, 1000);

        const now = new Date();
        const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
        this.datetimeInput = localDateTime.toISOString().slice(0, 16);
        this.convertToTimestamp();
    }
}).mount('#app');
