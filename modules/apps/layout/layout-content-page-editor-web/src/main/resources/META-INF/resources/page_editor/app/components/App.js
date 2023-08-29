/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {ClayIconSpriteContext} from '@clayui/icon';
import {getControlPanelSpritemap} from '@liferay/frontend-icons-web';
import {DragPreview} from '@liferay/layout-js-components-web';
import PropTypes from 'prop-types';
import React from 'react';

import ConvertToPageTemplateModal from '../../plugins/convert_to_page_template_modal/components/ConvertToPageTemplateModal';
import {StyleBookContextProvider} from '../../plugins/page_design_options/hooks/useStyleBook';
import {INIT} from '../actions/types';
import {CollectionActiveItemContextProvider} from '../contexts/CollectionActiveItemContext';
import {ControlsProvider} from '../contexts/ControlsContext';
import {DisplayPagePreviewItemContextProvider} from '../contexts/DisplayPagePreviewItemContext';
import {EditableProcessorContextProvider} from '../contexts/EditableProcessorContext';
import {FormValidationContextProvider} from '../contexts/FormValidationContext';
import {GlobalContextProvider} from '../contexts/GlobalContext';
import {
	KeyboardMovementContextProvider,
	useMovementSource,
} from '../contexts/KeyboardMovementContext';
import {StoreContextProvider, useSelector} from '../contexts/StoreContext';
import AppHooks from '../hooks/app_hooks/index';
import {reducer} from '../reducers/index';
import selectLanguageId from '../selectors/selectLanguageId';
import {DragAndDropContextProvider} from '../utils/drag_and_drop/useDragAndDrop';
import CommonStylesManager from './CommonStylesManager';
import {DisplayPagePreviewItemSelector} from './DisplayPagePreviewItemSelector';
import ItemConfigurationSidebar from './ItemConfigurationSidebar';
import KeyboardMovementManager from './KeyboardMovementManager';
import KeyboardMovementPreview from './KeyboardMovementPreview';
import KeyboardMovementText from './KeyboardMovementText';
import {LayoutBreadcrumbs} from './LayoutBreadcrumbs';
import LayoutViewport from './LayoutViewport';
import ShortcutManager from './ShortcutManager';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import WidgetsManager from './WidgetsManager';

const dragPreviewCallback = (item) => {
	if (item?.name) {
		return item.name;
	}

	return Liferay.Language.get('element');
};

export default function App({state}) {
	const initialState = reducer(state, {type: INIT});
	const languageId = useSelector(selectLanguageId);

	const rtl = Liferay.Language.direction[languageId] === 'rtl';
	const dir = Liferay.Language.direction[themeDisplay?.getLanguageId()];

	return (
		<ClayIconSpriteContext.Provider value={getControlPanelSpritemap()}>
			<StoreContextProvider initialState={initialState} reducer={reducer}>
				<ConvertToPageTemplateModal />

				<ControlsProvider>
					<CollectionActiveItemContextProvider>
						<DragAndDropContextProvider>
							<EditableProcessorContextProvider>
								<DisplayPagePreviewItemContextProvider>
									<AppHooks />

									<DisplayPagePreviewItemSelector dark />

									<DragPreview
										dir={dir}
										dragPreviewCallback={
											dragPreviewCallback
										}
										rtl={rtl}
									/>

									<WidgetsManager />

									<FormValidationContextProvider>
										<Toolbar />

										<KeyboardMovementContextProvider>
											<KeyboardManager />

											<KeyboardMovementPreview />

											<KeyboardMovementText />

											<GlobalContextProvider>
												<CommonStylesManager />

												<LayoutViewport />

												<LayoutBreadcrumbs />

												<StyleBookContextProvider>
													<Sidebar />

													<ItemConfigurationSidebar />
												</StyleBookContextProvider>
											</GlobalContextProvider>
										</KeyboardMovementContextProvider>
									</FormValidationContextProvider>
								</DisplayPagePreviewItemContextProvider>
							</EditableProcessorContextProvider>
						</DragAndDropContextProvider>
					</CollectionActiveItemContextProvider>
				</ControlsProvider>
			</StoreContextProvider>
		</ClayIconSpriteContext.Provider>
	);
}

App.propTypes = {
	state: PropTypes.object.isRequired,
};

function KeyboardManager() {
	const movementSource = useMovementSource();

	return movementSource ? <KeyboardMovementManager /> : <ShortcutManager />;
}
