# MarkJS Documentation

**MarkJS** is a domain-specific language (DSL) that allows you to write JavaScript using custom XML-style tags. It compiles declarative `<markjs>` scripts into executable JavaScript code.

---

## Getting Started

To use MARK.js include:
```
<script src="https://cdn.jsdelivr.net/gh/cat-ci/markjs/compiler.js"></script>
```

To use it in your sites include `<script type="text/markjs">` and either internal or external scripts are allowed with .XML, .HTML, .MJS

```html
<script type="text/markjs" data-mode="execute">
  <program>
    <let name="x" value="5"></let>
    <function name="sayHello">
      <call function="console.log" args="'Hello, world!'"></call>
    </function>
    <call function="sayHello"></call>
  </program>
</script>
```

---

## Script Attributes

| Attribute     | Description                                                            |
|---------------|------------------------------------------------------------------------|
| `type`        | Required. Must be `"text/markjs"`.                                     |
| `src`         | Optional. URL to external markup source.                               |
| `data-mode`   | Optional. One of `execute` (default), `dry-run`, `test`, or `sandbox`. |
| `data-output` | Optional. Format of compiled JS: `pretty` (default) or `minified`.     |

---

## DSL Tags and Their Meaning

Each tag maps to JavaScript syntax. Below is a categorized breakdown:

### Declarations
| Tag     | Example Output |
|---------|----------------|
| `<let>` | `let x = 5;`   |
| `<set>` | `x = 10;`      |

### Functions and Calls
| Tag               | Description               |
|-------------------|---------------------------|
| `<function>`      | Named function            |
| `<arrowfunction>` | Arrow function block      |
| `<call>`          | Function call             |
| `<asyncfunction>` | Async function definition |
| `<await>`         | `await expression;`       |

### Loops
| Tag         | Example                  |
|-------------|--------------------------|
| `<for>`     | Standard `for` loop      |
| `<while>`   | Standard `while` loop    |
| `<dowhile>` | Do-while loop            |
| `<forin>`   | `for (key in obj)`       |
| `<forof>`   | `for (item of iterable)` |

### Conditionals
| Tag         | Example                                    |
|-------------|--------------------------------------------|
| `<if>`      | if block with optional `<elseif>`/`<else>` |
| `<ternary>` | Ternary operator                           |

### Miscellaneous Control
| Tag                               | Description               |
|-----------------------------------|---------------------------|
| `<return>`                        | Return statement          |
| `<break>`                         | Break statement           |
| `<continue>`                      | Continue statement        |
| `<throw>`                         | Throw error               |
| `<try>` / `<catch>` / `<finally>` | Exception handling blocks |

### Classes and Methods
| Tag             | Description                      |
|-----------------|----------------------------------|
| `<class>`       | Class declaration                |
| `<constructor>` | Constructor block                |
| `<method>`      | Method definition (static/async) |

### Imports & Exports
| Tag        | Example                                |
|------------|----------------------------------------|
| `<import>` | `import x from "file.js";`             |
| `<export>` | `export { x };` or `export default x;` |

### Events
| Tag    | Example Output                            |
|--------|-------------------------------------------|
| `<on>` | `document.addEventListener("click", ...)` |

### Special Operations
| Tag            | JavaScript Equivalent    |
|----------------|--------------------------|
| `<new>`        | `new Constructor(args);` |
| `<delete>`     | `delete obj.prop;`       |
| `<typeof>`     | `typeof x;`              |
| `<instanceof>` | `x instanceof Y;`        |
| `<debugger>`   | `debugger;`              |
| `<label>`      | Labeled statement block  |
| `<with>`       | `with (obj) { ... }`     |

### Aliasing
Define a custom tag name for an existing one.

```html
<alias tag="define" as="let"></alias>
<define name="y" value="42"></define>
```

---

## Modes

| Mode      | Behavior                                                        |
|-----------|-----------------------------------------------------------------|
| `execute` | Replaces the MarkJS block with compiled JS and runs it          |
| `sandbox` | Runs compiled JS in an isolated `Function()`                    |
| `dry-run` | Logs compiled JS to console (no execution)                      |
| `test`    | Renders DSL + JS in a visual `<details>` element for inspection |

---

## Syntax Tips

- Tags like `<elseif>`, `<else>` must be used *within* an `<if>` block.
- Use `<program>` as the root node for MarkJS scripts.

---

## Extending MarkJS

To define new custom tags or override handlers:

```js
handlers['mytag'] = el => {
  // Your compilation logic
  return '...';
};
```

---

## Output Formatting

- **Pretty**: Default, preserves indentation.
- **Minified**: Removes all line breaks and extra whitespace.

---

## Error Handling

If required attributes are missing or an unknown tag is encountered, MarkJS throws a descriptive `Error` with helpful debugging info including the offending HTML.

---

## Example

```html
<script type="text/markjs">
  <program>
    <let name="count" value="0"></let>
    <while condition="count < 3">
      <call function="console.log" args="count"></call>
      <set name="count" value="count + 1"></set>
    </while>
  </program>
</script>
```

**Compiles to:**
```js
let count = 0;
while (count < 3) {
  console.log(count);
  count = count + 1;
}
```

---
