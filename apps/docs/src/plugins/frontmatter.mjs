import { MarkdownPageEvent } from "typedoc-plugin-markdown";

/** @param {import('typedoc-plugin-markdown').MarkdownApplication} app */
export function load(app) {
	/** @param {MarkdownPageEvent} page */
	app.renderer.on(MarkdownPageEvent.BEGIN, (page) => {
		page.frontmatter = {
			title: page.model?.name || "Untitled",
			topic: "api",
			...page.frontmatter,
			lastUpdated: new Date().toISOString().split('T')[0]
		};
	});
}
