/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {Locator, Page, expect} from '@playwright/test';

import {JournalPage} from './JournalPage';

export class JournalEditArticleTranslationsPage {
	readonly page: Page;

	readonly changeLocale: Locator;
	readonly concurrentUserErrorMessage: Locator;
	readonly journalPage: JournalPage;
	readonly selectLocaleButton: Locator;
	readonly publishButton: Locator;
	readonly titleInput: Locator;

	constructor(page: Page) {
		this.page = page;

		this.changeLocale = page.getByRole('option', { name: 'Arabic Language: Not Translated' });
		this.concurrentUserErrorMessage = page.getByText(
			'Another user has made changes since you started editing. Publish this version to save it and overwrite the recent changes.'
		);
		this.journalPage = new JournalPage(page);
		this.publishButton = page.getByRole('button', {name: 'Publish'});
		this.selectLocaleButton = page.getByLabel('Select a language, current language: English.');
		this.titleInput = page.locator(
			'#_com_liferay_translation_web_internal_portlet_TranslationPortlet_infoField--JournalArticle_title--0'
		);
	}

	async assertErrorInEditBasicArticleTranslations(url: string) {
		await this.editBasicArticleTranslations('title', url);

		await this.concurrentUserErrorMessage.waitFor();

		await expect(this.concurrentUserErrorMessage).toBeVisible();
	}

	async changeArticleLocale() {
		await this.selectLocaleButton.click();

		await this.changeLocale.click();
	}

	async editBasicArticleTranslations(title: string, url: string) {
		if (!url) {
			await this.journalPage.goToJournalArticleAction('Translate', title);
		}
		else {
			await this.page.goto(url);
		}

		await this.titleInput.waitFor();

		await this.titleInput.fill(title);

		await this.publishButton.click();

		return this.page.url();
	}
}
