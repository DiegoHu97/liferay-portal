/**
 * SPDX-FileCopyrightText: (c) 2024 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.frontend.taglib.servlet.taglib;

import com.liferay.frontend.taglib.internal.servlet.ServletContextUtil;
import com.liferay.taglib.util.IncludeTag;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.PageContext;

/**
 * @author Diego Hu
 */
public class FolderSelectorTag extends IncludeTag {

	public String getFolderId() {
		return _folderId;
	}

	public String getFolderInputLabel() {
		return _folderInputLabel;
	}

	public String getFolderLabel() {
		return _folderLabel;
	}

	public long getFolderValue() {
		return _folderValue;
	}

	public String getSelectEventName() {
		return _selectEventName;
	}

	public String getSelectFolderURL() {
		return _selectFolderURL;
	}

	public boolean isFolderInTrash() {
		return _folderInTrash;
	}

	public boolean isFolderNotFound() {
		return _folderNotFound;
	}

	public void setFolderId(String folderId) {
		_folderId = folderId;
	}

	public void setFolderInputLabel(String folderInputLabel) {
		_folderInputLabel = folderInputLabel;
	}

	public void setFolderInTrash(boolean folderInTrash) {
		_folderInTrash = folderInTrash;
	}

	public void setFolderLabel(String folderLabel) {
		_folderLabel = folderLabel;
	}

	public void setFolderNotFound(boolean folderNotFound) {
		_folderNotFound = folderNotFound;
	}

	public void setFolderValue(long folderValue) {
		_folderValue = folderValue;
	}

	@Override
	public void setPageContext(PageContext pageContext) {
		super.setPageContext(pageContext);

		setServletContext(ServletContextUtil.getServletContext());
	}

	public void setSelectEventName(String selectEventName) {
		_selectEventName = selectEventName;
	}

	public void setSelectFolderURL(String selectFolderURL) {
		_selectFolderURL = selectFolderURL;
	}

	@Override
	protected void cleanUp() {
		super.cleanUp();

		_folderId = null;
		_folderInputLabel = null;
		_folderInTrash = false;
		_folderLabel = null;
		_folderNotFound = false;
		_folderValue = 0;
		_selectEventName = null;
		_selectFolderURL = null;
	}

	@Override
	protected String getPage() {
		return _PAGE;
	}

	@Override
	protected void setAttributes(HttpServletRequest httpServletRequest) {
		httpServletRequest.setAttribute(
			"liferay-frontend:folder-selector:folderId", _folderId);
		httpServletRequest.setAttribute(
			"liferay-frontend:folder-selector:folderInputLabel",
			_folderInputLabel);
		httpServletRequest.setAttribute(
			"liferay-frontend:folder-selector:folderInTrash", _folderInTrash);
		httpServletRequest.setAttribute(
			"liferay-frontend:folder-selector:folderLabel", _folderLabel);
		httpServletRequest.setAttribute(
			"liferay-frontend:folder-selector:folderNotFound", _folderNotFound);
		httpServletRequest.setAttribute(
			"liferay-frontend:folder-selector:folderValue", _folderValue);
		httpServletRequest.setAttribute(
			"liferay-frontend:folder-selector:selectEventName",
			_selectEventName);
		httpServletRequest.setAttribute(
			"liferay-frontend:folder-selector:selectFolderURL",
			_selectFolderURL);
	}

	private static final String _PAGE = "/folder_selector/page.jsp";

	private String _folderId;
	private String _folderInputLabel;
	private boolean _folderInTrash;
	private String _folderLabel;
	private boolean _folderNotFound;
	private long _folderValue;
	private String _selectEventName;
	private String _selectFolderURL;

}