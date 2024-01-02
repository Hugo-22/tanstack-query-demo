import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const usersQueryKeys = {
	all: ['users'] as const,
	filtered: (gender?: string) => gender ? [...usersQueryKeys.all, 'gender', gender] : usersQueryKeys.all,
	details: () => [...usersQueryKeys.all, 'detail'] as const,
	detail: (id: string) => [...usersQueryKeys.details(), id] as const,
}

type User = {
	id: number,
	firstName: string,
	lastName: string,
	gender: string,
	email: string,
}
type Users = ReadonlyArray<User>

const fetchUsers = async (gender?: string): Promise<Users> => {
	const response = await axios.get('http://playground.test/api/users', {
		params: {gender}
	})
	return response.data
}

export const useUsers = (gender?: string) => {
	const {data, isLoading, isError, refetch} = useQuery({
		queryKey: [usersQueryKeys.filtered(gender)],
		queryFn: () => fetchUsers(gender),
		staleTime: 1000 * 60 * 5 // 5 minutes
	})

	return {data, isLoading, isError, refetch}
}

type AddUser = Omit<User, 'id'>

const addUser = (user: AddUser) => {
	return axios.post('http://playground.test/api/users', user)
}

// Exemple 1 <INVALIDATION>  : Lorsque la mutation est dans l'état "success", on invalide le cache correspond à la clé "users"
// toutes les requetes avec cette clé seront donc invalidées :
// ["users"] | ["users", 2] | ["users", 99] | ["users", 2, 'profile']
// export const useAddUser = () => {
// 	const queryClient = useQueryClient()
//
// 	const {isPending, isError, isSuccess, mutate} = useMutation({
// 		mutationFn: (user: AddUser) => addUser(user),
// 		onSuccess: () => {
// 			// Invalidate all users queries
// 			queryClient.invalidateQueries({
// 				queryKey: [usersQueryKeys.all]
// 			})
// 		}
// 	})
//
// 	return {isPending, isError, isSuccess, mutate}
// }


// Exemple 2 <DIRECT UPDATES> : la mutation retourne déjà les données que nous avons besoin pour mettre à jour nos données en front, alors on peut directement utiliser ses données pour mettre à jour le cache
export const useAddUser = () => {
	const queryClient = useQueryClient()

	const {isPending, isError, isSuccess, mutate} = useMutation({
		mutationFn: async (user: AddUser) => {
			const response = await addUser(user);
			return response.data;
		},
		onSuccess: (newUser) => {
			queryClient.setQueryData([usersQueryKeys.filtered()], (oldUsers) => [...oldUsers, newUser]);
		}
	})

	return {isPending, isError, isSuccess, mutate}
}
