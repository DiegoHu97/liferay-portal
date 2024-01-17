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
	folderInTrash,
	folderName: initialFolderName,
	folderNotFound,
	label,
	portletNamespace,
	removeButtonDisabled: initialRemoveButtonDisabled,
	selectEventName,
	selectFolderURL,
	showRemoveButton,
}) {
	const [folderName, setFolderName] = useState(initialFolderName);
	const [removeButtonDisabled, setRemoveButtonDisabled] = useState(
		initialRemoveButtonDisabled
	);
	const [showNotFoundAlert, setShowNotFoundAlert] = useState(folderNotFound);
	const [showTrashAlert, setShowTrashAlert] = useState(folderInTrash);

	const handleSelectFolderButtonClick = () =>
		openSelectionModal({
			iframeBodyCssClass: '',
			onSelect: (selectedItem) => {
				if (selectedItem) {
					document.getElementById(
						`${portletNamespace}newFolderId`
					).value = selectedItem.folderId;

					setFolderName(selectedItem.folderName);
					setRemoveButtonDisabled(false);
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
				<label htmlFor={`${portletNamespace}folderName`}>{label}</label>

				<ClayInput
					disabled
					id={`${portletNamespace}folderName`}
					type="text"
					value={folderName}
				/>
			</ClayForm.Group>

			{showTrashAlert ? (
				<ClayAlert displayType="warning">
					{Liferay.Language.get(
						'the-selected-root-folder-is-in-the-recycle-bin-please-remove-it-or-select-another-one'
					)}
				</ClayAlert>
			) : null}

			{showNotFoundAlert ? (
				<ClayAlert displayType="warning">
					{Liferay.Language.get(
						'the-selected-root-folder-cannot-be-found-please-select-another-one'
					)}
				</ClayAlert>
			) : null}

			<ClayButton.Group spaced>
				<ClayButton
					displayType="secondary"
					onClick={handleSelectFolderButtonClick}
				>
					{Liferay.Language.get('select')}
				</ClayButton>

				{showRemoveButton ? (
					<ClayButton
						disabled={removeButtonDisabled}
						displayType="secondary"
						onClick={() => {
							document.getElementById(
								`${portletNamespace}newFolderId`
							).value = '0';

							setFolderName('');
							setRemoveButtonDisabled(true);
						}}
					>
						{Liferay.Language.get('remove')}
					</ClayButton>
				) : null}
			</ClayButton.Group>
		</ClayForm.Group>
	);
}
