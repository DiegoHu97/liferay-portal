/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayIcon from '@clayui/icon';
import classNames from 'classnames';
import React, {useEffect, useRef, useState} from 'react';
import {useDragLayer} from 'react-dnd';

import './DragPreview.scss';

interface Props {
	dir?: string;
	dragPreviewCallback: Function;
	rtl: boolean;
}

const getItemStyles = (
	currentOffset: {x: number; y: number} | null,
	ref: React.RefObject<HTMLDivElement>,
	rtl: boolean
) => {
	if (!currentOffset || !ref.current) {
		return {
			display: 'none',
		};
	}

	const rect = ref.current.getBoundingClientRect();
	const x = rtl
		? currentOffset.x + rect.width * 0.5 - window.innerWidth
		: currentOffset.x - rect.width * 0.5;
	const y = currentOffset.y - rect.height * 0.5;

	const transform = `translate(${x}px, ${y}px)`;

	return {
		WebkitTransform: transform,
		transform,
	};
};

export default function DragPreview({dir, dragPreviewCallback, rtl}: Props) {
	const [label, setLabel] = useState();

	const ref = useRef<HTMLDivElement>(null);

	const {currentOffset, isDragging, item} = useDragLayer((monitor) => ({
		currentOffset: monitor.getClientOffset(),
		isDragging: monitor.isDragging(),
		item: monitor.getItem(),
	}));

	useEffect(() => {
		if (dragPreviewCallback) {
			setLabel(dragPreviewCallback(item));
		}
	}, [dragPreviewCallback, item]);

	if (!isDragging) {
		return null;
	}

	return (
		<div className="cadmin">
			<div className="drag-preview position-fixed">
				<div
					className={classNames(
						'align-items-center d-flex drag-preview__content p-2 position-absolute text-2',
						{
							'align-items-center d-flex drag-preview__content__treeview':
								item?.origin === 'sidebar',
						}
					)}
					dir={dir}
					ref={ref}
					style={getItemStyles(currentOffset, ref, rtl)}
				>
					{item && item.icon && (
						<ClayIcon className="mr-3 mt-0" symbol={item.icon} />
					)}

					<span className="text-truncate">{label}</span>
				</div>
			</div>
		</div>
	);
}
