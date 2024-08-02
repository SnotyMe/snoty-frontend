import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';

export function configureSyntax(monaco: typeof Monaco) {
    monaco.languages.register({ id: 'liquid' });

    monaco.languages.setMonarchTokensProvider('liquid', {
        tokenizer: {
            otherTag: [
                [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.otherTag' }],
                [/\/?>/, 'delimiter.html', '@pop'],
                [/"([^"]*)"/, 'attribute.value'],
                [/'([^']*)'/, 'attribute.value'],
                [/[\w\-]+/, 'attribute.name'],
                [/=/, 'delimiter'],
                [/[ \t\r\n]+/], // whitespace
            ],

            handlebarsInSimpleState: [
                [/\{\{?/, 'delimiter.handlebars'],
                [/\}\}?/, { token: 'delimiter.handlebars', switchTo: '@$S2.$S3' }],
                { include: 'handlebarsRoot' }
            ],

            handlebarsInEmbeddedState: [
                [/\{\{?/, 'delimiter.handlebars'],
                [/\}\}?/, { token: 'delimiter.handlebars', switchTo: '@$S2.$S3', nextEmbedded: '$S3' }],
                { include: 'handlebarsRoot' }
            ],

            handlebarsRoot: [
                [/"[^"]*"/, 'string.handlebars'],
                [/[#/][^\s}]+/, 'keyword.helper.handlebars'],
                [/else\b/, 'keyword.helper.handlebars'],
                [/[\s]+/],
                [/[^}]/, 'variable.parameter.handlebars'],
            ],
        }
    });
}
