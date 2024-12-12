import { liquid } from "@codemirror/lang-liquid";
import { json } from "@codemirror/lang-json";

type Language = "json" | "liquid"

export interface CodemirrorProps {
    value: string
    onchange: (value: string) => void
    language?: Language
}

export function getLanguage(language: Language | undefined) {
    switch (language) {
        case "json":
            return json();
        case "liquid":
            return liquid();
    }
}
