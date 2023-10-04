// DataContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

interface DataValue {
	definitions: any[]; // Puedes reemplazar any con tu tipo de dato específico.
	setDefinitions: React.Dispatch<React.SetStateAction<any[]>>;
}

const DataContext = createContext<DataValue | undefined>(undefined);

interface DataProviderProps {
	children: ReactNode;
	initialDefinitions: any;
}

export const DataProvider: React.FC<DataProviderProps> = ({
	initialDefinitions,
	children,
}) => {
	const [definitions, setDefinitions] = useState<any>(initialDefinitions); // Aquí se define el estado inicial

	return (
		<DataContext.Provider value={{ definitions, setDefinitions }}>
			{children}
		</DataContext.Provider>
	);
};

// Continuación de DataContext.tsx

export const useData = (): DataValue => {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error("useData debe ser usado dentro de un DataProvider");
	}
	return context;
};
