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
		iconRotated: false,
		label: Liferay.Language.get('tablet'),
	},
	// eslint-disable-next-line sort-keys
	smartphone: {
		classStyle: 'col-4 lfr-device-item mb-3 text-center',
		dataDevice: 'smartphone',
		icon: 'mobile-portrait',
		iconLandcape: 'mobile-landscape',
		iconRotated: false,
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
	const [previousDevice, setPreviousDevice] = useState(
		devices.desktop.dataDevice
	);

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
							previousDevice={previousDevice}
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
				iconRotated={selectedOption.iconRotated}
				setPreviousDevice={setPreviousDevice}
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
	previousDevice,
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
			onClick={(event) =>
				onButtonClickHandler(event, previousDevice, setSelectedOption)
			}
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

function PreviewIframe({dataDevice, iconRotated, setPreviousDevice}) {
	const portalRef = useRef();

	const iframeURL = createIframeURL();

	useEffect(() => {
		const iframeContainer = document.getElementById('iframeContainer');

		if (dataDevice === devices.autosize.dataDevice) {
<<<<<<< HEAD
			setSizes({
				height: portalRef.current.offsetHeight + 'px',
				width: portalRef.current.offsetWidth + 'px',
			});
		} else {
=======
>>>>>>> d31c7fce6b83 (extract setsizes)
			setSizes({height: '', width: ''});
		}

		setPreviousDevice(dataDevice);

		if (iconRotated) {
			iframeContainer.classList.add('rotated');
		}
	}, [dataDevice, iconRotated, setPreviousDevice]);

	return (
		<ReactPortal
			className="lfr-simulation-device"
			container={document.body}
			ref={portalRef}
		>
			<div
				className={classNames(
					'lfr-device modal-dialog',
					dataDevice,
					{
						rotated: iconRotated,
					},
					{
						'smartphone-rotated':
							dataDevice === devices.smartphone.dataDevice &&
							iconRotated,
					},
					{
						'tablet-rotated':
							dataDevice === devices.tablet.dataDevice &&
							iconRotated,
					}
				)}
				id="iframeContainer"
			>
				<iframe
					className={classNames(
						dataDevice,
						{
							'smartphone-rotated':
								dataDevice === devices.smartphone.dataDevice &&
								iconRotated,
						},
						{
							'tablet-rotated':
								dataDevice === devices.tablet.dataDevice &&
								iconRotated,
						}
					)}
					id="simulationDeviceIframe"
					src={iframeURL}
				></iframe>
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

const onButtonClickHandler = (event, previousDevice, setSelectedOption) => {
	const selectedOption = event.currentTarget.getAttribute('data-device');
	setSelectedOption(devices[`${selectedOption}`]);

	const iframeContainer = document.getElementById('iframeContainer');

	if (
		selectedOption === previousDevice &&
		(selectedOption === devices.smartphone.dataDevice ||
			selectedOption === devices.tablet.dataDevice)
	) {
		const height = iframeContainer.offsetWidth;
		const width = iframeContainer.offsetHeight;

		if (devices[`${selectedOption}`].iconRotated) {
			devices[`${selectedOption}`].iconRotated = false;
		} else {
			devices[`${selectedOption}`].iconRotated = true;
		}

		const simulationDeviceIframe = document.getElementById(
			'simulationDeviceIframe'
		);
		const icon = event.currentTarget.getElementsByClassName('icon')[0];
		const iconRotate = event.currentTarget.getElementsByClassName(
			'icon-rotate'
		)[0];

		iframeContainer.classList.toggle('rotated');
		iframeContainer.classList.toggle(selectedOption + '-rotated');
		simulationDeviceIframe.classList.toggle(selectedOption + '-rotated');
		icon.classList.toggle('hide');
		iconRotate.classList.toggle('hide');

		setSizes({height, width});
	} else {
		if (
			selectedOption === devices.smartphone.dataDevice ||
			selectedOption === devices.tablet.dataDevice
		) {
			iframeContainer.classList.remove('rotated');
		}
	}
};

const setSizes = ({height, width}) => {
	const iframeContainer = document.getElementById('iframeContainer');
	const simulationDeviceIframe = document.getElementById(
		'simulationDeviceIframe'
	);

	iframeContainer.style.height = height;
	iframeContainer.style.width = width;
	simulationDeviceIframe.style.height = height;
	simulationDeviceIframe.style.width = width;
};

const setSizes = ({height, width}) => {
	const iframeContainer = document.getElementById('iframeContainer');
	const simulationDeviceIframe = document.getElementById(
		'simulationDeviceIframe'
	);

	iframeContainer.style.height = height;
	iframeContainer.style.width = width;
	simulationDeviceIframe.style.height = height;
	simulationDeviceIframe.style.width = width;
};
