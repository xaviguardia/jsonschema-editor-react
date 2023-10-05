// write a ui component that allows to input a json object and infer a json schema from it using the service that we have in the backend
// and shows de response in a text editor
import React, { useState } from "react";

import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Textarea,
	useToast,
} from "@chakra-ui/react";

export const InferSchema = ({ json, changeSchema }) => {
	const [schema, setSchema] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const inferSchema = async () => {
		setLoading(true);
		debugger;
		const response = await fetch("http://localhost:8000/infer_schema/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				data: json,
			}),
		});
		const data = await response.json();
		if (data.error) {
			setError(data.error);
			setSchema("");
			toast({
				title: "Error",
				description: data.error,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		} else {
			setError("");
			setSchema(JSON.stringify(data.schema, null, 2));
			toast({
				title: "Success",
				description: "Schema inferred successfully",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		}
		setLoading(false);
	};

	return (
		<Box>
			<FormControl>
				<FormLabel>JSON Input</FormLabel>
				<Textarea
					value={json}
					onChange={(e) => setJson(e.target.value)}
					placeholder="Enter JSON here"
				/>
			</FormControl>
			<FormControl mt={4}>
				<FormLabel>Schema Output</FormLabel>
				<Textarea
					value={schema}
					isReadOnly
					placeholder="Schema will be inferred here"
				/>
			</FormControl>
			<Button
				mt={4}
				colorScheme="blue"
				isLoading={loading}
				onClick={inferSchema}
			>
				Infer Schema
			</Button>
			<Button
				mt={4}
				colorScheme="green"
				onClick={() => {
					changeSchema(JSON.parse(schema));
				}}
			>
				Update Schema
			</Button>
		</Box>
	);
};
