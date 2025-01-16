import markdownit from 'markdown-it'
import { full as emoji } from 'markdown-it-emoji'
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { dateFormat } from './filters/dateFormat.js';
import { filterTagList } from './filters/filterTagList.js';
import { wordCount } from './filters/wordCount.js';

export default async function(eleventyConfig) {
    // markdown-it options
    let options = {
		html: true,
		breaks: true,
		linkify: true,
	};
    // Configure eleventy
    eleventyConfig.setLibrary("md", markdownit(options));
    eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(emoji));
    eleventyConfig.addWatchTarget("./_sass/");
    eleventyConfig.addPassthroughCopy("./css/");
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addFilter("dateFormat", dateFormat);
    eleventyConfig.addFilter("filterTagList", filterTagList);
    eleventyConfig.addFilter("wordCount", wordCount);
};

export const config = {
	// Control which files Eleventy will process
	// e.g.: *.md, *.njk, *.html, *.liquid
	templateFormats: [
		"md",
		"njk",
		"html",
		"liquid",
		"11ty.js",
	],

	// Pre-process *.md files with: (default: `liquid`)
	markdownTemplateEngine: "njk",

	// Pre-process *.html files with: (default: `liquid`)
	htmlTemplateEngine: "njk",

    // These are all optional:
	dir: {
		input: "_content",          // default: "."
		includes: "../_includes",  // default: "_includes" (`input` relative)
		data: "../_data",          // default: "_data" (`input` relative)
		output: "_site"
	},
};
