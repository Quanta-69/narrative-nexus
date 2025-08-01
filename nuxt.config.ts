// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		"@nuxtjs/tailwindcss",
		"@nuxt/eslint",
		"@nuxtjs/supabase",
	],
	supabase: {
    redirect: false
  	},
	devtools: { enabled: true },
	css: [
		"assets/css/default.css",
		"assets/css/global.css",
	],
	compatibilityDate: "2025-07-15",
	eslint: {
		config: {
			stylistic: {
				semi: true,
				quotes: "double",
				commaDangle: "always-multiline",
			},
		},
	},
});