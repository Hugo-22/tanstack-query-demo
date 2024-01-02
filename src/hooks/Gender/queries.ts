import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const genderQueryKeys = {
	all: ['genders'] as const,
}

type Gender = {
	id: number,
	type: string
}
type Genders = ReadonlyArray<Gender>

const fetchGenders = async (): Promise<Genders> => {
	const response = await axios.get('http://playground.test/api/genders')
	return response.data
}

export const useGenders = () => {
	const {data, isLoading, isError} = useQuery({
		queryKey: [genderQueryKeys.all],
		queryFn: () => fetchGenders()
	})

	return {data, isLoading, isError}
}
