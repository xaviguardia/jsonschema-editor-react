import React from "react";
import { useState } from "react";
import { JsonSchemaEditor } from "./JsonSchemaEditor/JsonSchemaEditor";
import {
	Button,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
} from "@chakra-ui/react";
import JSONInput from "react-json-editor-ajrm";
import AceEditor from "react-ace";
import "brace/mode/json";
import "brace/theme/github";
import Form from "@rjsf/material-ui";
import readOnlyData from "./schemas/schema2.json";
import validator from "@rjsf/validator-ajv8";

export const readOnlyDatax: JSONSchema7 = {
	definitions: {
		enumOneOrMinusOne: {
			type: "integer",
			enum: [-1, 1],
			description: "an enum with only two values, -1 or 1",
		},
		disabledMessageObj: {
			type: "object",
			properties: {
				title: {
					type: "string",
				},
				msg: {
					type: "string",
				},
			},
			required: ["title", "msg"],
			description: "an object with title and msg",
		},
	},
	type: "object",
	properties: {
		kyc: {
			description: "Know your client configuration",
			type: "object",
			properties: {
				pantalla_bloqueante: {
					$ref: "#/definitions/disabledMessageObj",
					description:
						"Indicates if pantalla locks the operation or not, valid values are -1 or 1 as integer",
				},
				mensaje: {
					$ref: "#/definitions/enumOneOrMinusOne",
					description:
						"Indicates if pantalla locks the operation or not, valid values are -1 or 1 as integer",
				},
			},
		},
	},
};
function App() {
	return (
		<div>
			<Accordions />
		</div>
	);
}

function Accordions() {
	const formData = {};
	const [managedSchema, setManagedSchema] = useState(null);
	const [editingSchema, setEditingSchema] = useState(readOnlyData);
	const [definitions, setDefinitions] = useState(readOnlyData.definitions);
	const handleChangeDefinitions = (data) => {
		console.log("change definitions", data);
		setDefinitions(data);
	};
	const handleChangeSchema = (data) => {
		console.log("handle change schema", data);
		setEditingSchema(data);
	};
	const setModifiedChema = () => {
		var result = {};
		if (typeof editingSchema === "object") {
			result = editingSchema;
		} else {
			result = JSON.parse(editingSchema);
		}
		result.definitions = definitions;
		setManagedSchema(result);
	};

	return (
		<div>
			<Accordion allowMultiple>
				<AccordionItem>
					<AccordionButton>Definitions</AccordionButton>
					<AccordionPanel>
						<JSONInput
							id="readOnlyData"
							placeholder={definitions}
							value={definitions}
							colors={{
								string: "#DAA520",
								number: "#FF8C00",
								semicolon: "#FFFFFF",
								colon: "#FFFFFF",
								keys: "#008000",
								keys_whiteSpace: "#008000",
								primitive: "#0000FF",
							}}
							height="550px"
							width="100%"
							onChange={(data) => handleChangeDefinitions(data.jsObject)}
						/>
					</AccordionPanel>
				</AccordionItem>
				<AccordionItem>
					<AccordionButton>Schema Editor</AccordionButton>
					<AccordionPanel>
						<>
							<JsonSchemaEditor
								data={editingSchema}
								onSchemaChange={(schema) => handleChangeSchema(schema)}
							/>
						</>
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem>
					<AccordionButton>FORM</AccordionButton>

					<AccordionPanel>
						<>
							<Button type="button" onClick={setModifiedChema}>
								Set Modified Schema
							</Button>
							<Button
								type="button"
								m={2}
								onClick={() => setManagedSchema(null)}
							>
								Clear schema
							</Button>

							{managedSchema && (
								<Form
									theme="chakra-ui"
									schema={managedSchema}
									formData={formData}
									onChange={(e) => console.log(e)}
									onSubmit={({ formData }) => console.log(formData)}
									validator={validator}
								>
									<button type="submit">Submit</button>
								</Form>
							)}
						</>
					</AccordionPanel>
				</AccordionItem>
				<AccordionItem>
					<AccordionButton>Schema Generator</AccordionButton>
					<AccordionPanel>
						<></>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
export default App;
