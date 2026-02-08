import files from './files.json'
//TODO check if this step is still necessary
export const cleanedList = files
	//remove empty lines
	.filter(file => file !== "")
//remove file extension with this absolutely bullet-proof check.