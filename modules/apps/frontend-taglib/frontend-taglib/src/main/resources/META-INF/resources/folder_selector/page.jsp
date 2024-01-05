<%--
/**
 * SPDX-FileCopyrightText: (c) 2024 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */
--%>

<%@ include file="/folder_selector/init.jsp" %>

<%
String folderId = (String)request.getAttribute("liferay-frontend:folder-selector:folderId");
String folderInputLabel = (String)request.getAttribute("liferay-frontend:folder-selector:folderInputLabel");
boolean folderInTrash = (boolean)request.getAttribute("liferay-frontend:folder-selector:folderInTrash");
String folderLabel = (String)request.getAttribute("liferay-frontend:folder-selector:folderLabel");
boolean folderNotFound = (boolean)request.getAttribute("liferay-frontend:folder-selector:folderNotFound");
long folderValue = (long)request.getAttribute("liferay-frontend:folder-selector:folderValue");
String selectEventName = (String)request.getAttribute("liferay-frontend:folder-selector:selectEventName");
String selectFolderURL = (String)request.getAttribute("liferay-frontend:folder-selector:selectFolderURL");
%>

<div>
	<react:component
		module="folder_selector/FolderSelector"
		props='<%=
			HashMapBuilder.<String, Object>put(
				"folderId", folderId
			).put(
				"folderInputLabel", folderInputLabel
			).put(
				"folderInTrash", folderInTrash
			).put(
				"folderLabel", folderLabel
			).put(
				"folderNotFound", folderNotFound
			).put(
				"folderValue", folderValue
			).put(
				"selectEventName", selectEventName
			).put(
				"selectFolderURL", selectFolderURL
			).build()
		%>'
	/>
</div>