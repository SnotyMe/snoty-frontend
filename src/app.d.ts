// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { User } from "$lib/model/user";

declare global {
	namespace App {
		// interface Error {}
		type ColorScheme = "dark" | "light";
		interface Locals {
			user: User | null
			access_token: string | null
			colorScheme: ColorScheme | null
			theme: string | null
		}
		interface PageData {
			colorScheme: ColorScheme
			theme: string | null
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
