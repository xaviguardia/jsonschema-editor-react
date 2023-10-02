import { JSONSchema7 } from "../JsonSchemaEditor/JsonSchemaEditor";

export const bad = {
	type: "notvalid",
	iwish: "doesnt matter",
};

export const readOnlyData: JSONSchema7 = {
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
					$ref: "#/$defs/disabledMessageObj",
					description:
						"Indicates if pantalla locks the operation or not, valid values are -1 or 1 as integer",
				},
				mensaje: {
					$ref: "#/$defs/enumOneOrMinusOne",
					description:
						"Indicates if pantalla locks the operation or not, valid values are -1 or 1 as integer",
				},
			},
		},
	},
};
export const readOnlyData2: JSONSchema7 = {
	$schema: "http://json-schema.org/draft-07/schema",
	$id: "#/io/knack/avro/item",
	type: "object",
	title: "Item",
	description: "The schema for item info.",
	required: ["id", "name"],
	properties: {
		id: {
			$id: "#/string",
			type: "string",
			title: "string",
			description: "The unique identifier of the item.",
		},
		name: {
			$id: "#/string",
			type: "string",
			title: "string",
			description: "The display name of the item.",
		},
		info: {
			$id: "#/io/knack/avro/info",
			type: "object",
			title: "info",
			description: "The info for the item.",
			required: ["timestamp", "active"],
			properties: {
				timestamp: {
					$id: "#/long",
					type: "number",
					title: "long",
					description: "The info timestamp.",
				},
				active: {
					$id: "#/boolean",
					type: "boolean",
					title: "boolean",
					description: "The info active flag",
				},
				notes: {
					$id: "#/string",
					type: "string",
					title: "string",
					description: "The display name of the item.",
				},
			},
		},
		tags: {
			$id: "#/array",
			type: "array",
			title: "array",
			description: "Tags for grouping and filtering items.",
			items: {
				$id: "#/string",
				type: "string",
				title: "string",
				description: "",
			},
		},
		boxes: {
			$id: "#/array",
			type: "array",
			title: "array",
			description: "Boxes this item supports",
			items: {
				$id: "#/io/knack/avro/box/record",
				type: "object",
				title: "boxRecord",
				description: "",
				required: ["height", "width"],
				properties: {
					height: {
						$id: "#/int",
						type: "integer",
						title: "int",
						description: "The box height.",
					},
					width: {
						$id: "#/int",
						type: "integer",
						title: "int",
						description: "The box width.",
					},
					color: {
						$id: "#/string",
						type: "string",
						title: "string",
						description: "The box color.",
					},
				},
			},
		},
	},
};

export const printIt = (schema: string) => {
	console.log(schema);
};
