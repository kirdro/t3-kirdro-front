/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
	plugins: ['prettier-plugin-tailwindcss'],
	arrowParens: 'always',
	bracketSameLine: false,
	bracketSpacing: true,
	semi: true,
	experimentalTernaries: true,
	singleQuote: true,
	jsxSingleQuote: true,
	quoteProps: 'as-needed',
	trailingComma: 'all',
	singleAttributePerLine: false,
	htmlWhitespaceSensitivity: 'css',
	vueIndentScriptAndStyle: false,
	proseWrap: 'preserve',
	insertPragma: false,
	printWidth: 80,
	requirePragma: false,
	tabWidth: 4,
	useTabs: true,
	embeddedLanguageFormatting: 'auto',
};
