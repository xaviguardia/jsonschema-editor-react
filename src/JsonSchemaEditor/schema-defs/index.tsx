import React from "react";
import { FlexProps, Select } from "@chakra-ui/react";
import { useData } from "../datacontext/Datacontext";

export interface DefinitionItemProps extends FlexProps {
	defaultValue: string;
	handleChange: (value: string) => void;
}

export const RefEditorComponent: React.FunctionComponent<DefinitionItemProps> = (
	props: React.PropsWithChildren<DefinitionItemProps>
) => {
	const { defaultValue, handleChange } = props;
	const { definitions } = useData();
	console.log("in editor component", definitions);
	const handleSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
		handleChange && handleChange(evt.target.value);
	};

	return (
		<Select
			variant="outline"
			size="sm"
			margin={2}
			defaultValue={defaultValue}
			onChange={handleSelectChange}
		>
			<option value="">No definition selected</option>
			{definitions &&
				Object.keys(definitions).map((key, index) => {
					const theKey = "#/definitions/" + key;
					return (
						<option key={index} value={theKey}>
							{definitions[key].description || theKey}
						</option>
					);
				})}
		</Select>
	);
};
