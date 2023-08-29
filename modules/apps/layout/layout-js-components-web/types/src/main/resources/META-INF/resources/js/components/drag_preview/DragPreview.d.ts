/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

/// <reference types="react" />

import './DragPreview.scss';
interface Props {
	dir?: string;
	dragPreviewCallback: Function;
	rtl: boolean;
}
export default function DragPreview({
	dir,
	dragPreviewCallback,
	rtl,
}: Props): JSX.Element | null;
export {};
