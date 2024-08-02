import { configureSyntax } from "$lib/editor/monaco/monarch_liquid";
import { configureIntellisense } from "$lib/editor/monaco/monaco_intellisense";
import type * as MonacoType from 'monaco-editor/esm/vs/editor/editor.api';

export type Monaco = typeof MonacoType;
export type MonacoConfigurator = (monaco: Monaco) => void;

export const configurations: MonacoConfigurator[] = [ configureIntellisense, configureSyntax ];
