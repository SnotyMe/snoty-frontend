/** @type {import('tailwindcss').Config} */

import { skeleton, contentPath } from "@skeletonlabs/skeleton/plugin"
import forms from "@tailwindcss/forms"
import * as themes from "@skeletonlabs/skeleton/themes"

const crimson = {
    "name": "crimson",
    "properties": {
        "--type-scale-factor": "1.067",
        "--type-scale-1": "calc(0.75rem * var(--type-scale-factor))",
        "--type-scale-2": "calc(0.875rem * var(--type-scale-factor))",
        "--type-scale-3": "calc(1rem * var(--type-scale-factor))",
        "--type-scale-4": "calc(1.125rem * var(--type-scale-factor))",
        "--type-scale-5": "calc(1.25rem * var(--type-scale-factor))",
        "--type-scale-6": "calc(1.5rem * var(--type-scale-factor))",
        "--type-scale-7": "calc(1.875rem * var(--type-scale-factor))",
        "--type-scale-8": "calc(2.25rem * var(--type-scale-factor))",
        "--type-scale-9": "calc(3rem * var(--type-scale-factor))",
        "--type-scale-10": "calc(3.75rem * var(--type-scale-factor))",
        "--type-scale-11": "calc(4.5rem * var(--type-scale-factor))",
        "--type-scale-12": "calc(6rem * var(--type-scale-factor))",
        "--type-scale-13": "calc(8rem * var(--type-scale-factor))",
        "--base-font-color": "var(--color-surface-950)",
        "--base-font-color-dark": "var(--color-surface-50)",
        "--base-font-family": "Avenir, Montserrat, Corbel, URW Gothic, source-sans-pro, sans-serif",
        "--base-font-size": "inherit",
        "--base-line-height": "inherit",
        "--base-font-weight": "normal",
        "--base-font-style": "normal",
        "--base-letter-spacing": "0em",
        "--heading-font-color": "inherit",
        "--heading-font-color-dark": "inherit",
        "--heading-font-family": "Avenir, Montserrat, Corbel, URW Gothic, source-sans-pro, sans-serif",
        "--heading-font-weight": "normal",
        "--heading-font-style": "normal",
        "--heading-letter-spacing": "inherit",
        "--anchor-font-color": "var(--color-primary-500)",
        "--anchor-font-color-dark": "var(--color-primary-500)",
        "--anchor-font-family": "inherit",
        "--anchor-font-size": "inherit",
        "--anchor-line-height": "inherit",
        "--anchor-font-weight": "inherit",
        "--anchor-font-style": "inherit",
        "--anchor-letter-spacing": "inherit",
        "--anchor-text-decoration": "none",
        "--anchor-text-decoration-hover": "underline",
        "--anchor-text-decoration-active": "none",
        "--anchor-text-decoration-focus": "none",
        "--space-scale-factor": "1",
        "--radii-default": "9999px",
        "--radii-container": "12px",
        "--border-width-default": "1px",
        "--divide-width-default": "1px",
        "--outline-width-default": "1px",
        "--ring-width-default": "1px",
        "--body-background-color": "255 255 255",
        "--body-background-color-dark": "var(--color-surface-950)",
        "--color-primary-50": "249 205 214",
        "--color-primary-100": "242 168 183",
        "--color-primary-200": "234 132 152",
        "--color-primary-300": "227 95 122",
        "--color-primary-400": "219 59 91",
        "--color-primary-500": "212 22 60",
        "--color-primary-600": "188 18 52",
        "--color-primary-700": "165 13 45",
        "--color-primary-800": "141 9 37",
        "--color-primary-900": "118 4 30",
        "--color-primary-950": "94 0 22",
        "--color-primary-contrast-dark": "var(--color-primary-950)",
        "--color-primary-contrast-light": "var(--color-primary-50)",
        "--color-primary-contrast-50": "var(--color-primary-contrast-dark)",
        "--color-primary-contrast-100": "var(--color-primary-contrast-dark)",
        "--color-primary-contrast-200": "var(--color-primary-contrast-dark)",
        "--color-primary-contrast-300": "var(--color-primary-contrast-dark)",
        "--color-primary-contrast-400": "var(--color-primary-contrast-dark)",
        "--color-primary-contrast-500": "var(--color-primary-contrast-light)",
        "--color-primary-contrast-600": "var(--color-primary-contrast-light)",
        "--color-primary-contrast-700": "var(--color-primary-contrast-light)",
        "--color-primary-contrast-800": "var(--color-primary-contrast-light)",
        "--color-primary-contrast-900": "var(--color-primary-contrast-light)",
        "--color-primary-contrast-950": "var(--color-primary-contrast-light)",
        "--color-secondary-50": "214 234 245",
        "--color-secondary-100": "185 214 231",
        "--color-secondary-200": "156 194 217",
        "--color-secondary-300": "128 173 203",
        "--color-secondary-400": "99 153 189",
        "--color-secondary-500": "70 133 175",
        "--color-secondary-600": "61 118 155",
        "--color-secondary-700": "52 103 136",
        "--color-secondary-800": "43 87 116",
        "--color-secondary-900": "34 72 97",
        "--color-secondary-950": "25 57 77",
        "--color-secondary-contrast-dark": "var(--color-secondary-950)",
        "--color-secondary-contrast-light": "var(--color-secondary-50)",
        "--color-secondary-contrast-50": "var(--color-secondary-contrast-dark)",
        "--color-secondary-contrast-100": "var(--color-secondary-contrast-dark)",
        "--color-secondary-contrast-200": "var(--color-secondary-contrast-dark)",
        "--color-secondary-contrast-300": "var(--color-secondary-contrast-dark)",
        "--color-secondary-contrast-400": "var(--color-secondary-contrast-dark)",
        "--color-secondary-contrast-500": "var(--color-secondary-contrast-light)",
        "--color-secondary-contrast-600": "var(--color-secondary-contrast-light)",
        "--color-secondary-contrast-700": "var(--color-secondary-contrast-light)",
        "--color-secondary-contrast-800": "var(--color-secondary-contrast-light)",
        "--color-secondary-contrast-900": "var(--color-secondary-contrast-light)",
        "--color-secondary-contrast-950": "var(--color-secondary-contrast-light)",
        "--color-tertiary-50": "246 244 244",
        "--color-tertiary-100": "242 240 240",
        "--color-tertiary-200": "239 237 236",
        "--color-tertiary-300": "230 226 225",
        "--color-tertiary-400": "211 204 203",
        "--color-tertiary-500": "192 182 180",
        "--color-tertiary-600": "173 164 162",
        "--color-tertiary-700": "144 137 135",
        "--color-tertiary-800": "115 109 108",
        "--color-tertiary-900": "94 89 88",
        "--color-tertiary-950": "85 80 79",
        "--color-tertiary-contrast-dark": "var(--color-tertiary-950)",
        "--color-tertiary-contrast-light": "var(--color-tertiary-50)",
        "--color-tertiary-contrast-50": "var(--color-tertiary-contrast-dark)",
        "--color-tertiary-contrast-100": "var(--color-tertiary-contrast-dark)",
        "--color-tertiary-contrast-200": "var(--color-tertiary-contrast-dark)",
        "--color-tertiary-contrast-300": "var(--color-tertiary-contrast-dark)",
        "--color-tertiary-contrast-400": "var(--color-tertiary-contrast-dark)",
        "--color-tertiary-contrast-500": "var(--color-tertiary-contrast-dark)",
        "--color-tertiary-contrast-600": "var(--color-tertiary-contrast-dark)",
        "--color-tertiary-contrast-700": "var(--color-tertiary-contrast-light)",
        "--color-tertiary-contrast-800": "var(--color-tertiary-contrast-light)",
        "--color-tertiary-contrast-900": "var(--color-tertiary-contrast-light)",
        "--color-tertiary-contrast-950": "var(--color-tertiary-contrast-light)",
        "--color-success-50": "246 250 239",
        "--color-success-100": "243 248 234",
        "--color-success-200": "240 247 229",
        "--color-success-300": "230 241 213",
        "--color-success-400": "212 231 182",
        "--color-success-500": "193 221 151",
        "--color-success-600": "174 199 136",
        "--color-success-700": "145 166 113",
        "--color-success-800": "116 133 91",
        "--color-success-900": "95 108 74",
        "--color-success-950": "86 99 66",
        "--color-success-contrast-dark": "var(--color-success-950)",
        "--color-success-contrast-light": "var(--color-success-50)",
        "--color-success-contrast-50": "var(--color-success-contrast-dark)",
        "--color-success-contrast-100": "var(--color-success-contrast-dark)",
        "--color-success-contrast-200": "var(--color-success-contrast-dark)",
        "--color-success-contrast-300": "var(--color-success-contrast-dark)",
        "--color-success-contrast-400": "var(--color-success-contrast-dark)",
        "--color-success-contrast-500": "var(--color-success-contrast-dark)",
        "--color-success-contrast-600": "var(--color-success-contrast-dark)",
        "--color-success-contrast-700": "var(--color-success-contrast-light)",
        "--color-success-contrast-800": "var(--color-success-contrast-light)",
        "--color-success-contrast-900": "var(--color-success-contrast-light)",
        "--color-success-contrast-950": "var(--color-success-contrast-light)",
        "--color-warning-50": "251 246 231",
        "--color-warning-100": "250 243 223",
        "--color-warning-200": "248 240 215",
        "--color-warning-300": "244 231 191",
        "--color-warning-400": "236 212 142",
        "--color-warning-500": "228 194 94",
        "--color-warning-600": "205 175 85",
        "--color-warning-700": "171 146 71",
        "--color-warning-800": "137 116 56",
        "--color-warning-900": "112 95 46",
        "--color-warning-950": "103 86 38",
        "--color-warning-contrast-dark": "var(--color-warning-950)",
        "--color-warning-contrast-light": "var(--color-warning-50)",
        "--color-warning-contrast-50": "var(--color-warning-contrast-dark)",
        "--color-warning-contrast-100": "var(--color-warning-contrast-dark)",
        "--color-warning-contrast-200": "var(--color-warning-contrast-dark)",
        "--color-warning-contrast-300": "var(--color-warning-contrast-dark)",
        "--color-warning-contrast-400": "var(--color-warning-contrast-dark)",
        "--color-warning-contrast-500": "var(--color-warning-contrast-dark)",
        "--color-warning-contrast-600": "var(--color-warning-contrast-dark)",
        "--color-warning-contrast-700": "var(--color-warning-contrast-light)",
        "--color-warning-contrast-800": "var(--color-warning-contrast-light)",
        "--color-warning-contrast-900": "var(--color-warning-contrast-light)",
        "--color-warning-contrast-950": "var(--color-warning-contrast-light)",
        "--color-error-50": "248 236 236",
        "--color-error-100": "246 229 230",
        "--color-error-200": "244 223 224",
        "--color-error-300": "237 204 205",
        "--color-error-400": "224 165 167",
        "--color-error-500": "210 127 129",
        "--color-error-600": "189 114 116",
        "--color-error-700": "158 95 97",
        "--color-error-800": "126 76 77",
        "--color-error-900": "103 62 63",
        "--color-error-950": "94 54 55",
        "--color-error-contrast-dark": "var(--color-error-950)",
        "--color-error-contrast-light": "var(--color-error-50)",
        "--color-error-contrast-50": "var(--color-error-contrast-dark)",
        "--color-error-contrast-100": "var(--color-error-contrast-dark)",
        "--color-error-contrast-200": "var(--color-error-contrast-dark)",
        "--color-error-contrast-300": "var(--color-error-contrast-dark)",
        "--color-error-contrast-400": "var(--color-error-contrast-dark)",
        "--color-error-contrast-500": "var(--color-error-contrast-dark)",
        "--color-error-contrast-600": "var(--color-error-contrast-light)",
        "--color-error-contrast-700": "var(--color-error-contrast-light)",
        "--color-error-contrast-800": "var(--color-error-contrast-light)",
        "--color-error-contrast-900": "var(--color-error-contrast-light)",
        "--color-error-contrast-950": "var(--color-error-contrast-light)",
        "--color-surface-50": "223 224 226",
        "--color-surface-100": "213 213 217",
        "--color-surface-200": "202 203 207",
        "--color-surface-300": "170 171 179",
        "--color-surface-400": "107 109 121",
        "--color-surface-500": "43 46 64",
        "--color-surface-600": "39 41 58",
        "--color-surface-700": "32 35 48",
        "--color-surface-800": "26 28 38",
        "--color-surface-900": "21 23 31",
        "--color-surface-950": "12 14 24",
        "--color-surface-contrast-dark": "var(--color-surface-950)",
        "--color-surface-contrast-light": "var(--color-surface-50)",
        "--color-surface-contrast-50": "var(--color-surface-contrast-dark)",
        "--color-surface-contrast-100": "var(--color-surface-contrast-dark)",
        "--color-surface-contrast-200": "var(--color-surface-contrast-dark)",
        "--color-surface-contrast-300": "var(--color-surface-contrast-dark)",
        "--color-surface-contrast-400": "var(--color-surface-contrast-light)",
        "--color-surface-contrast-500": "var(--color-surface-contrast-light)",
        "--color-surface-contrast-600": "var(--color-surface-contrast-light)",
        "--color-surface-contrast-700": "var(--color-surface-contrast-light)",
        "--color-surface-contrast-800": "var(--color-surface-contrast-light)",
        "--color-surface-contrast-900": "var(--color-surface-contrast-light)",
        "--color-surface-contrast-950": "var(--color-surface-contrast-light)"
    },
    "metadata": {
        "version": "3.0.0"
    }
}

const dracula = {
    "name": "dracula",
    "properties": {
        "--type-scale-factor": "1.067",
        "--type-scale-1": "calc(0.75rem * var(--type-scale-factor))",
        "--type-scale-2": "calc(0.875rem * var(--type-scale-factor))",
        "--type-scale-3": "calc(1rem * var(--type-scale-factor))",
        "--type-scale-4": "calc(1.125rem * var(--type-scale-factor))",
        "--type-scale-5": "calc(1.25rem * var(--type-scale-factor))",
        "--type-scale-6": "calc(1.5rem * var(--type-scale-factor))",
        "--type-scale-7": "calc(1.875rem * var(--type-scale-factor))",
        "--type-scale-8": "calc(2.25rem * var(--type-scale-factor))",
        "--type-scale-9": "calc(3rem * var(--type-scale-factor))",
        "--type-scale-10": "calc(3.75rem * var(--type-scale-factor))",
        "--type-scale-11": "calc(4.5rem * var(--type-scale-factor))",
        "--type-scale-12": "calc(6rem * var(--type-scale-factor))",
        "--type-scale-13": "calc(8rem * var(--type-scale-factor))",
        "--base-font-color": "var(--color-surface-950)",
        "--base-font-color-dark": "var(--color-surface-50)",
        "--base-font-family": "system-ui, sans-serif",
        "--base-font-size": "inherit",
        "--base-line-height": "inherit",
        "--base-font-weight": "normal",
        "--base-font-style": "normal",
        "--base-letter-spacing": "0em",
        "--heading-font-color": "inherit",
        "--heading-font-color-dark": "inherit",
        "--heading-font-family": "inherit",
        "--heading-font-weight": "bold",
        "--heading-font-style": "normal",
        "--heading-letter-spacing": "inherit",
        "--anchor-font-color": "var(--color-primary-500)",
        "--anchor-font-color-dark": "var(--color-primary-500)",
        "--anchor-font-family": "inherit",
        "--anchor-font-size": "inherit",
        "--anchor-line-height": "inherit",
        "--anchor-font-weight": "inherit",
        "--anchor-font-style": "inherit",
        "--anchor-letter-spacing": "inherit",
        "--anchor-text-decoration": "none",
        "--anchor-text-decoration-hover": "underline",
        "--anchor-text-decoration-active": "none",
        "--anchor-text-decoration-focus": "none",
        "--space-scale-factor": "1",
        "--radii-default": "6px",
        "--radii-container": "12px",
        "--border-width-default": "1px",
        "--divide-width-default": "1px",
        "--outline-width-default": "1px",
        "--ring-width-default": "1px",
        "--body-background-color": "var(--color-surface-50)",
        "--body-background-color-dark": "var(--color-surface-950)",
        "--color-primary-50": "189 147 249",
        "--color-primary-100": "189 147 249",
        "--color-primary-200": "189 147 249",
        "--color-primary-300": "189 147 249",
        "--color-primary-400": "189 147 249",
        "--color-primary-500": "189 147 249",
        "--color-primary-600": "189 147 249",
        "--color-primary-700": "189 147 249",
        "--color-primary-800": "189 147 249",
        "--color-primary-900": "189 147 249",
        "--color-primary-950": "189 147 249",
        "--color-primary-contrast-dark": "var(--color-surface-950)",
        "--color-primary-contrast-light": "var(--color-surface-950)",
        "--color-primary-contrast-50": "var(--color-primary-contrast-dark)",
        "--color-primary-contrast-100": "var(--color-primary-contrast-dark)",
        "--color-primary-contrast-200": "var(--color-primary-contrast-dark)",
        "--color-primary-contrast-300": "var(--color-primary-contrast-dark)",
        "--color-primary-contrast-400": "var(--color-primary-contrast-dark)",
        "--color-primary-contrast-500": "var(--color-primary-contrast-dark)",
        "--color-primary-contrast-600": "var(--color-primary-contrast-dark)",
        "--color-primary-contrast-700": "var(--color-primary-contrast-dark)",
        "--color-primary-contrast-800": "var(--color-primary-contrast-dark)",
        "--color-primary-contrast-900": "var(--color-primary-contrast-dark)",
        "--color-primary-contrast-950": "var(--color-primary-contrast-dark)",
        "--color-secondary-50": "255 121 198",
        "--color-secondary-100": "255 121 198",
        "--color-secondary-200": "255 121 198",
        "--color-secondary-300": "255 121 198",
        "--color-secondary-400": "255 121 198",
        "--color-secondary-500": "255 121 198",
        "--color-secondary-600": "255 121 198",
        "--color-secondary-700": "255 121 198",
        "--color-secondary-800": "255 121 198",
        "--color-secondary-900": "255 121 198",
        "--color-secondary-950": "255 121 198",
        "--color-secondary-contrast-dark": "var(--color-surface-50)",
        "--color-secondary-contrast-light": "var(--color-surface-50)",
        "--color-secondary-contrast-50": "var(--color-secondary-contrast-dark)",
        "--color-secondary-contrast-100": "var(--color-secondary-contrast-dark)",
        "--color-secondary-contrast-200": "var(--color-secondary-contrast-dark)",
        "--color-secondary-contrast-300": "var(--color-secondary-contrast-dark)",
        "--color-secondary-contrast-400": "var(--color-secondary-contrast-dark)",
        "--color-secondary-contrast-500": "var(--color-secondary-contrast-dark)",
        "--color-secondary-contrast-600": "var(--color-secondary-contrast-dark)",
        "--color-secondary-contrast-700": "var(--color-secondary-contrast-dark)",
        "--color-secondary-contrast-800": "var(--color-secondary-contrast-dark)",
        "--color-secondary-contrast-900": "var(--color-secondary-contrast-dark)",
        "--color-secondary-contrast-950": "var(--color-secondary-contrast-dark)",
        "--color-tertiary-50": "139 233 253",
        "--color-tertiary-100": "139 233 253",
        "--color-tertiary-200": "139 233 253",
        "--color-tertiary-300": "139 233 253",
        "--color-tertiary-400": "139 233 253",
        "--color-tertiary-500": "139 233 253",
        "--color-tertiary-600": "139 233 253",
        "--color-tertiary-700": "139 233 253",
        "--color-tertiary-800": "139 233 253",
        "--color-tertiary-900": "139 233 253",
        "--color-tertiary-950": "139 233 253",
        "--color-tertiary-contrast-dark": "var(--color-surface-950)",
        "--color-tertiary-contrast-light": "var(--color-surface-950)",
        "--color-tertiary-contrast-50": "var(--color-tertiary-contrast-light)",
        "--color-tertiary-contrast-100": "var(--color-tertiary-contrast-light)",
        "--color-tertiary-contrast-200": "var(--color-tertiary-contrast-light)",
        "--color-tertiary-contrast-300": "var(--color-tertiary-contrast-light)",
        "--color-tertiary-contrast-400": "var(--color-tertiary-contrast-light)",
        "--color-tertiary-contrast-500": "var(--color-tertiary-contrast-light)",
        "--color-tertiary-contrast-600": "var(--color-tertiary-contrast-light)",
        "--color-tertiary-contrast-700": "var(--color-tertiary-contrast-light)",
        "--color-tertiary-contrast-800": "var(--color-tertiary-contrast-light)",
        "--color-tertiary-contrast-900": "var(--color-tertiary-contrast-light)",
        "--color-tertiary-contrast-950": "var(--color-tertiary-contrast-light)",
        "--color-success-50": "80 250 123",
        "--color-success-100": "80 250 123",
        "--color-success-200": "80 250 123",
        "--color-success-300": "80 250 123",
        "--color-success-400": "80 250 123",
        "--color-success-500": "80 250 123",
        "--color-success-600": "80 250 123",
        "--color-success-700": "80 250 123",
        "--color-success-800": "80 250 123",
        "--color-success-900": "80 250 123",
        "--color-success-950": "80 250 123",
        "--color-success-contrast-dark": "var(--color-surface-950)",
        "--color-success-contrast-light": "var(--color-surface-950)",
        "--color-success-contrast-50": "var(--color-success-contrast-dark)",
        "--color-success-contrast-100": "var(--color-success-contrast-dark)",
        "--color-success-contrast-200": "var(--color-success-contrast-dark)",
        "--color-success-contrast-300": "var(--color-success-contrast-dark)",
        "--color-success-contrast-400": "var(--color-success-contrast-dark)",
        "--color-success-contrast-500": "var(--color-success-contrast-dark)",
        "--color-success-contrast-600": "var(--color-success-contrast-dark)",
        "--color-success-contrast-700": "var(--color-success-contrast-dark)",
        "--color-success-contrast-800": "var(--color-success-contrast-dark)",
        "--color-success-contrast-900": "var(--color-success-contrast-dark)",
        "--color-success-contrast-950": "var(--color-success-contrast-dark)",
        "--color-warning-50": "255 184 108",
        "--color-warning-100": "255 184 108",
        "--color-warning-200": "255 184 108",
        "--color-warning-300": "255 184 108",
        "--color-warning-400": "255 184 108",
        "--color-warning-500": "255 184 108",
        "--color-warning-600": "255 184 108",
        "--color-warning-700": "255 184 108",
        "--color-warning-800": "255 184 108",
        "--color-warning-900": "255 184 108",
        "--color-warning-950": "255 184 108",
        "--color-warning-contrast-dark": "var(--color-surface-950)",
        "--color-warning-contrast-light": "var(--color-surface-950)",
        "--color-warning-contrast-50": "var(--color-warning-contrast-dark)",
        "--color-warning-contrast-100": "var(--color-warning-contrast-dark)",
        "--color-warning-contrast-200": "var(--color-warning-contrast-dark)",
        "--color-warning-contrast-300": "var(--color-warning-contrast-dark)",
        "--color-warning-contrast-400": "var(--color-warning-contrast-dark)",
        "--color-warning-contrast-500": "var(--color-warning-contrast-dark)",
        "--color-warning-contrast-600": "var(--color-warning-contrast-dark)",
        "--color-warning-contrast-700": "var(--color-warning-contrast-dark)",
        "--color-warning-contrast-800": "var(--color-warning-contrast-dark)",
        "--color-warning-contrast-900": "var(--color-warning-contrast-dark)",
        "--color-warning-contrast-950": "var(--color-warning-contrast-dark)",
        "--color-error-50": "255 85 85",
        "--color-error-100": "255 85 85",
        "--color-error-200": "255 85 85",
        "--color-error-300": "255 85 85",
        "--color-error-400": "255 85 85",
        "--color-error-500": "255 85 85",
        "--color-error-600": "255 85 85",
        "--color-error-700": "255 85 85",
        "--color-error-800": "255 85 85",
        "--color-error-900": "255 85 85",
        "--color-error-950": "255 85 85",
        "--color-error-contrast-dark": "var(--color-surface-50)",
        "--color-error-contrast-light": "var(--color-surface-50)",
        "--color-error-contrast-50": "var(--color-error-contrast-dark)",
        "--color-error-contrast-100": "var(--color-error-contrast-dark)",
        "--color-error-contrast-200": "var(--color-error-contrast-dark)",
        "--color-error-contrast-300": "var(--color-error-contrast-dark)",
        "--color-error-contrast-400": "var(--color-error-contrast-dark)",
        "--color-error-contrast-500": "var(--color-error-contrast-dark)",
        "--color-error-contrast-600": "var(--color-error-contrast-dark)",
        "--color-error-contrast-700": "var(--color-error-contrast-dark)",
        "--color-error-contrast-800": "var(--color-error-contrast-dark)",
        "--color-error-contrast-900": "var(--color-error-contrast-dark)",
        "--color-error-contrast-950": "var(--color-error-contrast-dark)",
        "--color-surface-50": "246 247 249",
        "--color-surface-100": "217 220 228",
        "--color-surface-200": "189 193 207",
        "--color-surface-300": "160 166 186",
        "--color-surface-400": "132 139 165",
        "--color-surface-500": "103 112 144",
        "--color-surface-600": "90 98 126",
        "--color-surface-700": "78 84 108",
        "--color-surface-800": "65 70 90",
        "--color-surface-900": "53 56 72",
        "--color-surface-950": "40 42 54",
        "--color-surface-contrast-dark": "var(--color-surface-950)",
        "--color-surface-contrast-light": "var(--color-surface-50)",
        "--color-surface-contrast-50": "var(--color-surface-contrast-dark)",
        "--color-surface-contrast-100": "var(--color-surface-contrast-dark)",
        "--color-surface-contrast-200": "var(--color-surface-contrast-dark)",
        "--color-surface-contrast-300": "var(--color-surface-contrast-dark)",
        "--color-surface-contrast-400": "var(--color-surface-contrast-dark)",
        "--color-surface-contrast-500": "var(--color-surface-contrast-light)",
        "--color-surface-contrast-600": "var(--color-surface-contrast-light)",
        "--color-surface-contrast-700": "var(--color-surface-contrast-light)",
        "--color-surface-contrast-800": "var(--color-surface-contrast-light)",
        "--color-surface-contrast-900": "var(--color-surface-contrast-light)",
        "--color-surface-contrast-950": "var(--color-surface-contrast-light)"
    },
    "metadata": {
        "version": "3.0.0"
    }
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: [
      "./src/**/*.{html,js,svelte,ts}",
      contentPath(import.meta.url, 'svelte'),
  ],
  theme: {
    extend: {
        spacing: {
            '128': '32rem',
        }
    },
  },
  plugins: [
      forms,
      skeleton({
        themes: [
            themes.cerberus,
            crimson,
            dracula,
        ]
      })
  ],
  safelist: [
      {
          pattern: /bg-.*-500/,
          variants: ["after"]
      },
      {
          // Alert.svelte
          pattern: /(preset-outlined|text)-.*-500/
      },
      "anchor"
  ]
}
