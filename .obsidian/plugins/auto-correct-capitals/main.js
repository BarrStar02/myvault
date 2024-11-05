/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => AutoCorrectPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  exclusionList: []
};
var AutoCorrectPlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.lastReplacement = null;
    this.isReplacing = false;
  }
  async onload() {
    console.log("Loading AutoCorrectPlugin");
    await this.loadSettings();
    this.addSettingTab(new AutoCorrectSettingTab(this.app, this));
    this.registerEvent(
      this.app.workspace.on("editor-change", (editor) => {
        if (this.isReplacing)
          return;
        const punctuation = [" ", ".", ",", ";", ":", "!", "?", "\n"];
        const doc = editor.getDoc();
        const cursor = doc.getCursor();
        const line = doc.getLine(cursor.line);
        const lineUpToCursor = line.substring(0, cursor.ch);
        const lastChar = lineUpToCursor.slice(-1);
        let lastWordMatch;
        if (punctuation.includes(lastChar)) {
          if (lineUpToCursor.length > 0) {
            lastWordMatch = lineUpToCursor.match(/[\p{L}\p{M}]+(?=\W*$)/u);
          }
          if (lastWordMatch) {
            const lastWordStart = lineUpToCursor.lastIndexOf(lastWordMatch[0]);
            const lastWord = lastWordMatch[0].trim();
            if (this.settings.exclusionList.includes(lastWord)) {
              return;
            }
            if (/[\p{Lu}]{2}[\p{Ll}]+/u.test(lastWord)) {
              if (lastWord.length < 3) {
                return;
              }
              if (lastWord[0] === lastWord[0].toUpperCase() && lastWord[0] !== lastWord[0].toLowerCase() && (lastWord[1] === lastWord[1].toUpperCase() && lastWord[1] !== lastWord[1].toLowerCase()) && (lastWord[2] === lastWord[2].toLowerCase() && lastWord[2] !== lastWord[2].toUpperCase())) {
                if (this.isInCodeBlock(editor, lastWordStart))
                  return;
                const start = lastWordStart + 1;
                const end = lastWordStart + 2;
                const replacedChar = lastWord[1].toLowerCase();
                this.isReplacing = true;
                this.lastReplacement = {
                  position: { line: cursor.line, ch: start },
                  originalChar: lastWord[1],
                  replacedChar
                };
                doc.replaceRange(replacedChar, { line: cursor.line, ch: start }, { line: cursor.line, ch: end });
                this.isReplacing = false;
                return;
              }
            }
          }
        }
      })
    );
  }
  isInCodeBlock(editor, firstCharacterPosition) {
    const doc = editor.getDoc();
    const cursor = doc.getCursor();
    const line = doc.getLine(cursor.line);
    const linesAbove = doc.getRange({ line: 0, ch: 0 }, { line: cursor.line, ch: 0 });
    const codeBlockMatches = (linesAbove.match(/```/g) || []).length;
    if (codeBlockMatches % 2 !== 0) {
      return true;
    }
    const inlineCodeMatches = line.match(/`/g) || [];
    let backticksCount = 0;
    for (let i = 0; i < firstCharacterPosition; i++) {
      if (line[i] === "`") {
        backticksCount++;
      }
    }
    return backticksCount % 2 !== 0;
  }
  onunload() {
    console.log("Unloading AutoCorrectPlugin");
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var AutoCorrectSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "AutoCorrect Capitals Misspelling Settings" });
    new import_obsidian.Setting(containerEl).setName("Exclusion List").setDesc("Add words to this list to prevent them from being autocorrected.").addTextArea(
      (text) => text.setPlaceholder("separate words with commas").setValue(this.plugin.settings.exclusionList.join(", ")).onChange(async (value) => {
        this.plugin.settings.exclusionList = value.split(",").map((word) => word.trim());
        await this.plugin.saveSettings();
      })
    );
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgUGx1Z2luLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nLCBFZGl0b3IsIE1hcmtkb3duVmlldyB9IGZyb20gJ29ic2lkaWFuJztcblxuaW50ZXJmYWNlIEF1dG9Db3JyZWN0U2V0dGluZ3Mge1xuXHRleGNsdXNpb25MaXN0OiBzdHJpbmdbXTtcbn1cblxuY29uc3QgREVGQVVMVF9TRVRUSU5HUzogQXV0b0NvcnJlY3RTZXR0aW5ncyA9IHtcblx0ZXhjbHVzaW9uTGlzdDogW11cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dG9Db3JyZWN0UGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcblx0c2V0dGluZ3M6IEF1dG9Db3JyZWN0U2V0dGluZ3M7XG5cdHByaXZhdGUgbGFzdFJlcGxhY2VtZW50OiB7IHBvc2l0aW9uOiBDb2RlTWlycm9yLlBvc2l0aW9uOyBvcmlnaW5hbENoYXI6IHN0cmluZzsgcmVwbGFjZWRDaGFyOiBzdHJpbmcgfSB8IG51bGwgPSBudWxsO1xuXHRwcml2YXRlIGlzUmVwbGFjaW5nOiBib29sZWFuID0gZmFsc2U7XG5cblx0YXN5bmMgb25sb2FkKCkge1xuXHRcdGNvbnNvbGUubG9nKCdMb2FkaW5nIEF1dG9Db3JyZWN0UGx1Z2luJyk7XG5cblx0XHRhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xuXHRcdHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgQXV0b0NvcnJlY3RTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG5cblx0XHR0aGlzLnJlZ2lzdGVyRXZlbnQoXG5cdFx0XHR0aGlzLmFwcC53b3Jrc3BhY2Uub24oJ2VkaXRvci1jaGFuZ2UnLCAoZWRpdG9yOiBFZGl0b3IpID0+IHtcblx0XHRcdFx0aWYgKHRoaXMuaXNSZXBsYWNpbmcpIHJldHVybjtcblxuXHRcdFx0XHRjb25zdCBwdW5jdHVhdGlvbiA9IFsnICcsICcuJywgJywnLCAnOycsICc6JywgJyEnLCAnPycsICdcXG4nXTtcblx0XHRcdFx0Y29uc3QgZG9jID0gZWRpdG9yLmdldERvYygpO1xuXHRcdFx0XHRjb25zdCBjdXJzb3IgPSBkb2MuZ2V0Q3Vyc29yKCk7XG5cdFx0XHRcdGNvbnN0IGxpbmUgPSBkb2MuZ2V0TGluZShjdXJzb3IubGluZSk7XG5cdFx0XHRcdGNvbnN0IGxpbmVVcFRvQ3Vyc29yID0gbGluZS5zdWJzdHJpbmcoMCwgY3Vyc29yLmNoKTtcblx0XHRcdFx0Y29uc3QgbGFzdENoYXIgPSBsaW5lVXBUb0N1cnNvci5zbGljZSgtMSk7XG5cdFx0XHRcdGxldCBsYXN0V29yZE1hdGNoO1xuXG5cdFx0XHRcdGlmIChwdW5jdHVhdGlvbi5pbmNsdWRlcyhsYXN0Q2hhcikpIHtcblx0XHRcdFx0XHRpZiAobGluZVVwVG9DdXJzb3IubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0bGFzdFdvcmRNYXRjaCA9IGxpbmVVcFRvQ3Vyc29yLm1hdGNoKC9bXFxwe0x9XFxwe019XSsoPz1cXFcqJCkvdSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKGxhc3RXb3JkTWF0Y2gpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGxhc3RXb3JkU3RhcnQgPSBsaW5lVXBUb0N1cnNvci5sYXN0SW5kZXhPZihsYXN0V29yZE1hdGNoWzBdKTtcblx0XHRcdFx0XHRcdGNvbnN0IGxhc3RXb3JkID0gbGFzdFdvcmRNYXRjaFswXS50cmltKCk7XG5cblx0XHRcdFx0XHRcdGlmICh0aGlzLnNldHRpbmdzLmV4Y2x1c2lvbkxpc3QuaW5jbHVkZXMobGFzdFdvcmQpKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICgvW1xccHtMdX1dezJ9W1xccHtMbH1dKy91LnRlc3QobGFzdFdvcmQpKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChsYXN0V29yZC5sZW5ndGggPCAzKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0XHQobGFzdFdvcmRbMF0gPT09IGxhc3RXb3JkWzBdLnRvVXBwZXJDYXNlKCkgJiYgbGFzdFdvcmRbMF0gIT09IGxhc3RXb3JkWzBdLnRvTG93ZXJDYXNlKCkpICYmXG5cdFx0XHRcdFx0XHRcdFx0KGxhc3RXb3JkWzFdID09PSBsYXN0V29yZFsxXS50b1VwcGVyQ2FzZSgpICYmIGxhc3RXb3JkWzFdICE9PSBsYXN0V29yZFsxXS50b0xvd2VyQ2FzZSgpKSAmJlxuXHRcdFx0XHRcdFx0XHRcdChsYXN0V29yZFsyXSA9PT0gbGFzdFdvcmRbMl0udG9Mb3dlckNhc2UoKSAmJiBsYXN0V29yZFsyXSAhPT0gbGFzdFdvcmRbMl0udG9VcHBlckNhc2UoKSlcblx0XHRcdFx0XHRcdFx0KSB7XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAodGhpcy5pc0luQ29kZUJsb2NrKGVkaXRvcixsYXN0V29yZFN0YXJ0KSkgcmV0dXJuOyAvL3Rlc3QgaWYgaW4gY29kZSBibG9ja1xuXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3Qgc3RhcnQgPSBsYXN0V29yZFN0YXJ0ICsgMTtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBlbmQgPSBsYXN0V29yZFN0YXJ0ICsgMjtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCByZXBsYWNlZENoYXIgPSBsYXN0V29yZFsxXS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5pc1JlcGxhY2luZyA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5sYXN0UmVwbGFjZW1lbnQgPSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRwb3NpdGlvbjogeyBsaW5lOiBjdXJzb3IubGluZSwgY2g6IHN0YXJ0IH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbENoYXI6IGxhc3RXb3JkWzFdLFxuXHRcdFx0XHRcdFx0XHRcdFx0cmVwbGFjZWRDaGFyOiByZXBsYWNlZENoYXJcblx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdGRvYy5yZXBsYWNlUmFuZ2UocmVwbGFjZWRDaGFyLCB7IGxpbmU6IGN1cnNvci5saW5lLCBjaDogc3RhcnQgfSwgeyBsaW5lOiBjdXJzb3IubGluZSwgY2g6IGVuZCB9KTtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmlzUmVwbGFjaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdCk7XG5cdH1cblxuXHRpc0luQ29kZUJsb2NrKGVkaXRvcjogRWRpdG9yLCBmaXJzdENoYXJhY3RlclBvc2l0aW9uOiBudW1iZXIpOiBib29sZWFuIHtcblx0XHRjb25zdCBkb2MgPSBlZGl0b3IuZ2V0RG9jKCk7XG5cdFx0Y29uc3QgY3Vyc29yID0gZG9jLmdldEN1cnNvcigpO1xuXHRcdGNvbnN0IGxpbmUgPSBkb2MuZ2V0TGluZShjdXJzb3IubGluZSk7XG5cblx0XHRjb25zdCBsaW5lc0Fib3ZlID0gZG9jLmdldFJhbmdlKHsgbGluZTogMCwgY2g6IDAgfSwgeyBsaW5lOiBjdXJzb3IubGluZSwgY2g6IDAgfSk7XG5cdFx0Y29uc3QgY29kZUJsb2NrTWF0Y2hlcyA9IChsaW5lc0Fib3ZlLm1hdGNoKC9gYGAvZykgfHwgW10pLmxlbmd0aDtcblxuXHRcdGlmIChjb2RlQmxvY2tNYXRjaGVzICUgMiAhPT0gMCkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Y29uc3QgaW5saW5lQ29kZU1hdGNoZXMgPSBsaW5lLm1hdGNoKC9gL2cpIHx8IFtdO1xuXHRcdGxldCBiYWNrdGlja3NDb3VudCA9IDA7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBmaXJzdENoYXJhY3RlclBvc2l0aW9uOyBpKyspIHtcblx0XHRcdGlmIChsaW5lW2ldID09PSAnYCcpIHtcblx0XHRcdFx0YmFja3RpY2tzQ291bnQrKztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gYmFja3RpY2tzQ291bnQgJSAyICE9PSAwO1xuXHR9XG5cblx0b251bmxvYWQoKSB7XG5cdFx0Y29uc29sZS5sb2coJ1VubG9hZGluZyBBdXRvQ29ycmVjdFBsdWdpbicpO1xuXHR9XG5cblx0YXN5bmMgbG9hZFNldHRpbmdzKCkge1xuXHRcdHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuXHR9XG5cblx0YXN5bmMgc2F2ZVNldHRpbmdzKCkge1xuXHRcdGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG5cdH1cbn1cblxuY2xhc3MgQXV0b0NvcnJlY3RTZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG5cdHBsdWdpbjogQXV0b0NvcnJlY3RQbHVnaW47XG5cblx0Y29uc3RydWN0b3IoYXBwOiBhbnksIHBsdWdpbjogQXV0b0NvcnJlY3RQbHVnaW4pIHtcblx0XHRzdXBlcihhcHAsIHBsdWdpbik7XG5cdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW47XG5cdH1cblxuXHRkaXNwbGF5KCk6IHZvaWQge1xuXHRcdGNvbnN0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG5cblx0XHRjb250YWluZXJFbC5lbXB0eSgpO1xuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdoMicsIHsgdGV4dDogJ0F1dG9Db3JyZWN0IENhcGl0YWxzIE1pc3NwZWxsaW5nIFNldHRpbmdzJyB9KTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoJ0V4Y2x1c2lvbiBMaXN0Jylcblx0XHRcdC5zZXREZXNjKCdBZGQgd29yZHMgdG8gdGhpcyBsaXN0IHRvIHByZXZlbnQgdGhlbSBmcm9tIGJlaW5nIGF1dG9jb3JyZWN0ZWQuJylcblx0XHRcdC5hZGRUZXh0QXJlYSgodGV4dCkgPT5cblx0XHRcdFx0dGV4dFxuXHRcdFx0XHRcdC5zZXRQbGFjZWhvbGRlcignc2VwYXJhdGUgd29yZHMgd2l0aCBjb21tYXMnKVxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5leGNsdXNpb25MaXN0LmpvaW4oJywgJykpXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuZXhjbHVzaW9uTGlzdCA9IHZhbHVlLnNwbGl0KCcsJykubWFwKCh3b3JkKSA9PiB3b3JkLnRyaW0oKSk7XG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0fVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHNCQUF3RTtBQU14RSxJQUFNLG1CQUF3QztBQUFBLEVBQzdDLGVBQWUsQ0FBQztBQUNqQjtBQUVBLElBQXFCLG9CQUFyQixjQUErQyx1QkFBTztBQUFBLEVBQXREO0FBQUE7QUFFQyxTQUFRLGtCQUF3RztBQUNoSCxTQUFRLGNBQXVCO0FBQUE7QUFBQSxFQUUvQixNQUFNLFNBQVM7QUFDZCxZQUFRLElBQUksMkJBQTJCO0FBRXZDLFVBQU0sS0FBSyxhQUFhO0FBQ3hCLFNBQUssY0FBYyxJQUFJLHNCQUFzQixLQUFLLEtBQUssSUFBSSxDQUFDO0FBRTVELFNBQUs7QUFBQSxNQUNKLEtBQUssSUFBSSxVQUFVLEdBQUcsaUJBQWlCLENBQUMsV0FBbUI7QUFDMUQsWUFBSSxLQUFLO0FBQWE7QUFFdEIsY0FBTSxjQUFjLENBQUMsS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxJQUFJO0FBQzVELGNBQU0sTUFBTSxPQUFPLE9BQU87QUFDMUIsY0FBTSxTQUFTLElBQUksVUFBVTtBQUM3QixjQUFNLE9BQU8sSUFBSSxRQUFRLE9BQU8sSUFBSTtBQUNwQyxjQUFNLGlCQUFpQixLQUFLLFVBQVUsR0FBRyxPQUFPLEVBQUU7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
