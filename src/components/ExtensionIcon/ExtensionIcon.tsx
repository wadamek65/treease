import { Component } from 'solid-js';
import { ItemTypes } from '~/lib/Item';
import { Directory } from '~/components/icons/Directory';
import { File } from '~/components/icons/File';
import { Dynamic } from 'solid-js/web';
import { FilePy } from '~/components/icons/FilePy';
import { FileTxt } from '~/components/icons/FileTxt';
import { FileCpp } from '~/components/icons/FileCpp';
import { FileC } from '~/components/icons/FileC';
import { FileCs } from '~/components/icons/FileCs';
import { FileSql } from '~/components/icons/FileSql';
import { FileJs } from '~/components/icons/FileJs';
import { FileVue } from '~/components/icons/FileVue';
import { FileDoc } from '~/components/icons/FileDoc';
import { FileXls } from '~/components/icons/FileXls';
import { FilePpt } from '~/components/icons/FilePpt';
import { FileJpg } from '~/components/icons/FileJpg';
import { FilePng } from '~/components/icons/FilePng';
import { FileSvg } from '~/components/icons/FileSvg';
import { FileAudio } from '~/components/icons/FileAudio';
import { FileVideo } from '~/components/icons/FileVideo';
import { FileZip } from '~/components/icons/FileZip';
import { FileCss } from '~/components/icons/FileCss';
import { FileCsv } from '~/components/icons/FileCsv';
import { FileHtml } from '~/components/icons/FileHtml';
import { FileIni } from '~/components/icons/FileIni';
import { FileJsx } from '~/components/icons/FileJsx';
import { FileMd } from '~/components/icons/FileMd';
import { FilePdf } from '~/components/icons/FilePdf';
import { FileRs } from '~/components/icons/FileRs';
import { FileTsx } from '~/components/icons/FileTsx';
import { FileTs } from '~/components/icons/FileTs';

const ExtensionToIconMap = new Map<string, Component>([
	['ts', FileTs],
	['tsx', FileTsx],
	['css', FileCss],
	['csv', FileCsv],
	['html', FileHtml],
	['doc', FileDoc],
	['docx', FileDoc],
	['ini', FileIni],
	['jsx', FileJsx],
	['md', FileMd],
	['pdf', FilePdf],
	['rst', FileRs],
	['txt', FileTxt],
	['py', FilePy],
	['cpp', FileCpp],
	['c', FileC],
	['cs', FileCs],
	['sql', FileSql],
	['js', FileJs],
	['vue', FileVue],
	['doc', FileDoc],
	['docx', FileDoc],
	['xls', FileXls],
	['xlsx', FileXls],
	['ppt', FilePpt],
	['pptx', FilePpt],
	['jpg', FileJpg],
	['jpeg', FileJpg],
	['png', FilePng],
	['svg', FileSvg],
	['mp3', FileAudio],
	['wav', FileAudio],
	['mp4', FileVideo],
	['webm', FileVideo],
	['avi', FileVideo],
	['mov', FileVideo],
	['m4v', FileVideo],
	['mkv', FileVideo],
	['ogg', FileVideo],
	['ogv', FileVideo],
	['flac', FileAudio],
	['aac', FileAudio],
	['zip', FileZip],
	['rar', FileZip],
	['7z', FileZip],
	['tar', FileZip],
]);

type ExtensionIconProps = {
	class?: string;
	itemType: ItemTypes;
	fileName: string;
};

export const ExtensionIcon: Component<ExtensionIconProps> = (props) => {
	const extension = () => props.fileName.split('.').pop() ?? '';

	return (
		<Dynamic
			class={props.class}
			component={
				props.itemType === 'directory' ? Directory : ExtensionToIconMap.get(extension()) ?? File
			}
		/>
	);
};
