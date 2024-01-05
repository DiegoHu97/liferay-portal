/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayAlert from '@clayui/alert';
import ClayButton from '@clayui/button';
import ClayForm, {ClayInput} from '@clayui/form';
import {openSelectionModal} from 'frontend-js-web';
import React, {useState} from 'react';

export default function FolderSelector({
	folderId,
	folderInTrash,
	folderInputLabel,
	folderLabel,
	folderNotFound,
	folderValue,
	portletNamespace,
	selectEventName,
	selectFolderURL,
}) {
	const [folderName, setFolderName] = useState(folderLabel);
	const [selectFolderDisabled, setSelectFolderDisabled] = useState(
		folderValue <= 0
	);
	const [showNotFoundAlert, setShowNotFoundAlert] = useState(folderNotFound);
	const [showTrashAlert, setShowTrashAlert] = useState(folderInTrash);

	const handleSelectFolderButtonClick = () =>
		openSelectionModal({
			iframeBodyCssClass: '',
			onSelect: (selectedItem) => {
				if (selectedItem) {
					document.getElementById(
						`${portletNamespace}${folderId}`
					).value = selectedItem.folderId;

					setFolderName(selectedItem.folderName);
					setSelectFolderDisabled(false);
					setShowTrashAlert(false);
					setShowNotFoundAlert(false);
				}
			},
			selectEventName: `${portletNamespace}${selectEventName}`,
			title: Liferay.Language.get('select-folder'),
			url: selectFolderURL,
		});

	return (
		<ClayForm.Group>
			<ClayForm.Group>
				<label htmlFor={`${portletNamespace}folderName`}>
					{folderInputLabel}
				</label>

				<ClayInput
					disabled
					id={`${portletNamespace}folderName`}
					type="text"
					value={folderName}
				/>
			</ClayForm.Group>

			{showTrashAlert && (
				<ClayAlert displayType="warning">
					{Liferay.Language.get(
						'the-selected-root-folder-is-in-the-recycle-bin-please-remove-it-or-select-another-one'
					)}
				</ClayAlert>
			)}

			{showNotFoundAlert && (
				<ClayAlert displayType="warning">
					{Liferay.Language.get(
						'the-selected-root-folder-cannot-be-found-please-select-another-one'
					)}
				</ClayAlert>
			)}

			<ClayButton.Group spaced>
				<ClayButton
					displayType="secondary"
					id={`${portletNamespace}selectFolderButton`}
					onClick={handleSelectFolderButtonClick}
				>
					{Liferay.Language.get('select')}
				</ClayButton>

				<ClayButton
					disabled={selectFolderDisabled}
					displayType="secondary"
					id={`${portletNamespace}removeFolderButton`}
					onClick={() => {
						document.getElementById(
							`${portletNamespace}${folderId}`
						).value = '0';

						setFolderName('');
						setSelectFolderDisabled(true);
					}}
				>
					{Liferay.Language.get('remove')}
				</ClayButton>
			</ClayButton.Group>
		</ClayForm.Group>
	);
}
