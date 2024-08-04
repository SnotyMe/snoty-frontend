import type { Actions } from "./$types";

export const actions: Actions = {
    setTheme: async ({ cookies, request }) => {
        const formData = await request.formData();
        const theme = formData.get("theme")?.toString()!;
        // Sets the selected theme to the cookie
        cookies.set("theme", theme, { path: '/' });
        return { theme };
    }
};
