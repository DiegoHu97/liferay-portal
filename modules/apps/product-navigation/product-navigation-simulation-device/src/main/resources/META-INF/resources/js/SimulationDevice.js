/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

import ClayButton from '@clayui/button';
import ClayForm, {ClayInput} from '@clayui/form';
import ClayIcon from '@clayui/icon';
import {ReactPortal} from '@liferay/frontend-js-react-web';
import classNames from 'classnames';
import React, {useEffect, useRef, useState} from 'react';

const devices = {
	desktop: {
		classStyle: 'col-4 d-lg-block d-none lfr-device-item mb-3 text-center',
		dataDevice: 'desktop',
		icon: 'desktop',
		label: Liferay.Language.get('desktop'),
	},
	tablet: {
		classStyle: 'col-4 d-lg-block d-none lfr-device-item mb-3 text-center',
		dataDevice: 'tablet',
		icon: 'tablet-portrait',
		iconLandscape: 'tablet-landscape',
		label: Liferay.Language.get('tablet'),
	},
	// eslint-disable-next-line sort-keys
	smartphone: {
		classStyle: 'col-4 lfr-device-item mb-3 text-center',
		dataDevice: 'smartphone',
		icon: 'mobile-portrait',
		iconLandcape: 'mobile-landscape',
		label: Liferay.Language.get('mobile'),
	},
	// eslint-disable-next-line sort-keys
	autosize: {
		classStyle: 'col-4 d-lg-block d-none lfr-device-item text-center',
		dataDevice: 'autosize',
		icon: 'autosize',
		label: Liferay.Language.get('autosize'),
	},
	custom: {
		classStyle: 'col-4 d-lg-block d-none lfr-device-item text-center',
		dataDevice: 'custom',
		icon: 'custom-size',
		label: Liferay.Language.get('custom'),
	},
};

export default function SimulationDevice({portletNamespace: namespace}) {
	const [selectedOption, setSelectedOption] = useState(devices.desktop);

	return (
		<div className="container-fluid container-fluid-max-x">
			<div className="default-devices mb-2 row">
				{Object.values(devices).map(
					({classStyle, dataDevice, icon, label}) => (
						<DeviceButton
							classStyle={classStyle}
							dataDevice={dataDevice}
							icon={icon}
							key={dataDevice}
							label={label}
							selectedOption={selectedOption}
							setSelectedOption={setSelectedOption}
						/>
					)
				)}
			</div>

			{selectedOption.dataDevice === 'custom' && (
				<CustomDeviceInputs namespace={namespace} />
			)}

			<PreviewIframe
				dataDevice={selectedOption.dataDevice}
			></PreviewIframe>
		</div>
	);
}

function CustomDeviceInputs(namespace) {
	return (
		<div className="custom-devices flex-nowrap mt-3 row">
			<ClayForm.Group className="flex-grow-1 mr-3">
				<label htmlFor={`${namespace}height`}>
					{Liferay.Language.get('height') + ' (px):'}
				</label>

				<ClayInput
					name="height"
					size="4"
					type="number"
					value="600"
				></ClayInput>
			</ClayForm.Group>

			<ClayForm.Group className="flex-grow-1">
				<label htmlFor={`${namespace}width`}>
					{Liferay.Language.get('width') + ' (px):'}
				</label>

				<ClayInput
					name="width"
					size="4"
					type="number"
					value="600"
				></ClayInput>
			</ClayForm.Group>
		</div>
	);
}

function DeviceButton({
	classStyle,
	dataDevice,
	icon,
	label,
	selectedOption,
	setSelectedOption,
}) {
	return (
		<ClayButton
			className={classNames(classStyle, {
				selected: selectedOption.dataDevice === dataDevice,
			})}
			data-device={dataDevice}
			displayType="unstyled"
			onClick={(event) => onButtonClickHandler(event, setSelectedOption)}
			type="button"
		>
			<div className="c-inner px-0" tabIndex="-1">
				<span className="icon icon-monospaced">
					<ClayIcon symbol={icon} />
				</span>

				{(dataDevice === 'smartphone' || dataDevice === 'tablet') && (
					<span className="hide icon icon-monospaced icon-rotate">
						<ClayIcon symbol="mobile-landscape" />
					</span>
				)}

				<span className="d-block mb-3 mt-1">{label}</span>
			</div>
		</ClayButton>
	);
}

function PreviewIframe({dataDevice}) {
	const portalRef = useRef();

	const iframeURL = createIframeURL();

	return (
		<ReactPortal
			className="lfr-simulation-device"
			container={document.body}
			ref={portalRef}
		>
			<div
				className={classNames('lfr-device modal-dialog', dataDevice)}
				id="iframeContainer"
			>
				<iframe src={iframeURL}></iframe>
			</div>
		</ReactPortal>
	);
}

const createIframeURL = () => {
	const url = new URL(location.href);
	const searchParams = new URLSearchParams(url.search);
	if (searchParams.has('segmentsExperienceId')) {
		searchParams.delete('segmentsExperienceId');
	}
	searchParams.append('p_l_mode', 'preview');

	return `${url.origin}${url.pathname}?${searchParams.toString()}`;
};

const onButtonClickHandler = (event, setSelectedOption) => {
	const selectedOption = event.currentTarget.getAttribute('data-device');
	setSelectedOption(devices[`${selectedOption}`]);
};
