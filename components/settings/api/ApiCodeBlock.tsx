import { CodeBlock } from '@react-email/code-block';

const code = `async function handleSubmitSupportTicket() {
    var formData = new FormData();
    formData.append("subject", "");
    formData.append("message", "");
    formData.append("email", "");

    // Append each file individually to the FormData object
    if (files) {
      Array.from(files).forEach(file => {
        formData.append("files", file);
      });
    }

    try {
      axios.post('/api/tickets', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } catch (error) {
      console.error(error)
    }
}`;

export default function ApiCodeBlock() {
  return (
    <CodeBlock
      code={code}
      lineNumbers // add this so that there are line numbers beside each code line
      theme={theme}
      language="javascript"
    />
  );
}

const theme = {
  "base": {
    "color": "#f8f8f2",
    "background": "#282a36",
    "textShadow": "0 1px rgba(0, 0, 0, 0.3)",
    "fontFamily": "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    "textAlign": "left",
    "whiteSpace": "pre",
    "wordSpacing": "normal",
    "wordBreak": "normal",
    "wordWrap": "normal",
    "lineHeight": "1.5",
    "MozTabSize": "4",
    "OTabSize": "4",
    "tabSize": "4",
    "WebkitHyphens": "none",
    "MozHyphens": "none",
    "MsHyphens": "none",
    "hyphens": "none",
    "padding": "1em",
    "margin": ".5em 0",
    "overflow": "auto",
    "borderRadius": "0.3em"
  },
  "comment": {
    "color": "#6272a4"
  },
  "prolog": {
    "color": "#6272a4"
  },
  "doctype": {
    "color": "#6272a4"
  },
  "cdata": {
    "color": "#6272a4"
  },
  "punctuation": {
    "color": "#f8f8f2"
  },
  "property": {
    "color": "#ff79c6"
  },
  "tag": {
    "color": "#ff79c6"
  },
  "constant": {
    "color": "#ff79c6"
  },
  "symbol": {
    "color": "#ff79c6"
  },
  "deleted": {
    "color": "#ff79c6"
  },
  "boolean": {
    "color": "#ff79c6"
  },
  "number": {
    "color": "#bd93f9"
  },
  "selector": {
    "color": "#50fa7b"
  },
  "attr-name": {
    "color": "#50fa7b"
  },
  "string": {
    "color": "#f1fa8c"
  },
  "char": {
    "color": "#f1fa8c"
  },
  "builtin": {
    "color": "#50fa7b"
  },
  "inserted": {
    "color": "#50fa7b"
  },
  "operator": {
    "color": "#ff79c6"
  },
  "entity": {
    "color": "#f8f8f2",
    "cursor": "help"
  },
  "url": {
    "color": "#f1fa8c"
  },
  "variable": {
    "color": "#f8f8f2"
  },
  "atrule": {
    "color": "#ff79c6"
  },
  "attr-value": {
    "color": "#f1fa8c"
  },
  "function": {
    "color": "#50fa7b"
  },
  "keyword": {
    "color": "#ff79c6"
  },
  "class-name": {
    "color": "#8be9fd"
  },
  "regex": {
    "color": "#f1fa8c"
  },
  "important": {
    "color": "#ff79c6",
    "fontWeight": "bold"
  },
  "bold": {
    "fontWeight": "bold"
  },
  "italic": {
    "fontStyle": "italic"
  }
}
