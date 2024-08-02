import * as monaco from "monaco-editor";
import type * as Monaco from "monaco-editor";

const liquidTags = [
    'if',
    'else',
    'elseif',
    'endif',
    'assign',
    'capture',
    'endcapture',
    'case',
    'endcase',
    'comment',
    'endcomment',
    'cycle',
    'decrement',
    'for',
    'endfor',
    'include',
    'increment',
    'layout',
    'raw',
    'endraw',
    'render',
    'tablerow',
    'endtablerow',
    'unless',
    'endunless'
];

const liquidFilters = [
    'abs',
    'append',
    'at_least',
    'at_most',
    'capitalize',
    'ceil',
    'compact',
    'date',
    'default',
    'divided_by',
    'downcase',
    'escape',
    'escape_once',
    'first',
    'floor',
    'join',
    'json',
    'last',
    'lstrip',
    'map',
    'minus',
    'modulo',
    'newline_to_br',
    'plus',
    'prepend',
    'remove',
    'remove_first',
    'replace',
    'replace_first',
    'reverse',
    'round',
    'rstrip',
    'size',
    'slice',
    'sort',
    'sort_natural',
    'split',
    'strip',
    'strip_html',
    'strip_newlines',
    'times',
    'truncate',
    'truncatewords',
    'uniq',
    'upcase',
    'url_decode',
    'url_encode',
    'where'
]

interface ILiquidContextInfo {
    showFilters: boolean,
    showTags: boolean,
    includeEndTags: boolean,
    inTag: boolean,
    inObject: boolean
}

function getLiquidContextInfo(model: monaco.editor.ITextModel, position: monaco.Position, triggerCharacter: string): ILiquidContextInfo {
    let inTag: boolean = false;
    let inObject: boolean = false;
    let showTags: boolean = false;
    let showFilters: boolean = false;

    function buildContextInfo() {
        return {
            showFilters,
            showTags,
            inTag,
            inObject
        } as ILiquidContextInfo
    }

    const findStart = model.findPreviousMatch('\\{(%|\\{)', position, true, false, null, true);
    if (findStart && findStart.matches && !position.isBefore(findStart.range.getEndPosition())) {
        if (findStart.matches[1] == '%') {
            inTag = true;
        } else if (findStart.matches[1] == '{') {
            inObject = true
        }

        const searchPattern = inTag ? '%}' : '}}';
        const findEnd = model.findNextMatch(searchPattern, position, false, false, null, true);
        if (findEnd == null) return buildContextInfo();

        const currentRange = findStart.range.plusRange(findEnd.range);
        if (currentRange.containsPosition(position)) {
            if (inTag) {
                const findTagName = model.findNextMatch('\\{%\\s*([a-zA-Z-_]+)', findStart.range.getStartPosition(), true, false, null, true);
                if (findTagName && currentRange.containsRange(findTagName.range) && (findTagName.matches?.length ?? 0) > 1) {
                    const findPipe = model.findNextMatch('|', findTagName.range.getEndPosition(), false, false, null, true);
                    const isAfterPipe = findPipe && currentRange.containsRange(findPipe.range);
                    if (isAfterPipe) {
                        showFilters = true;
                    } else {
                        showTags = false;
                    }
                } else {
                    showTags = true;
                }
            } else {
                showFilters = true;
            }
        }
    }

    return buildContextInfo();
}

const completionItemProvider: monaco.languages.CompletionItemProvider = {
    triggerCharacters: [' '],
    provideCompletionItems: (model: monaco.editor.ITextModel, position: monaco.Position, context: monaco.languages.CompletionContext, token: monaco.CancellationToken) => {
        let items: string[] = [];

        if (context.triggerCharacter == ' ') {
            const startTrigger = model.getValueInRange(new monaco.Range(position.lineNumber, position.column - 3, position.lineNumber, position.column - 1));
            if (startTrigger != '{%' && !startTrigger.endsWith('|')) {
                return null;
            }
        }

        const liquidContext: ILiquidContextInfo = getLiquidContextInfo(model, position, context.triggerCharacter);
        if (liquidContext.showFilters) {
            items = liquidFilters;
        } else if (liquidContext.showTags) {
            items = liquidTags.filter((value: string) => { return !value.startsWith('end') });
        }

        const suggestions = items.map((value: string) => {
            return {
                label: value,
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: value,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
            } as monaco.languages.CompletionItem
        });

        return { suggestions } as monaco.languages.ProviderResult<monaco.languages.CompletionList>;
    }
};

export function configureIntellisense(monaco: typeof Monaco) {
    monaco.languages.registerCompletionItemProvider('liquid', completionItemProvider);
}
