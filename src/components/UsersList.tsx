import { useUsers } from "../hooks/Users/queries.ts";
import React, { useState } from "react";
import { useGenders } from "../hooks/Gender/queries.ts";
import { AddUser } from "./AddUser.tsx";

export function UsersList() {
	const [selectedGender, setSelectedGender] = useState<string>();

	const { data: users, isLoading, isError, refetch } = useUsers(selectedGender);
	const { data: genders, isLoading: isLoadingGenders} = useGenders();

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedGender((event.target as HTMLSelectElement).value);
	}

	return (
		<div className="grid grid-cols-2 p-8">
			<div>
				<h1>Users</h1>
				{genders &&
                    <select name="gender" id="gender" onChange={handleChange}>
						{genders.map(g => <option key={g.id} value={g.type}>{g.type}</option>)}
                    </select>
				}
				<ul>
					{isError && <li>Something went wrong</li>}
					{isLoading && <li>Loading...</li>}
					<table>
						<thead>
						<tr>
							<th>firstName</th>
							<th>lastName</th>
							<th>gender</th>
						</tr>
						</thead>
						<tbody>
						{users && users.map((user) => (
							<tr key={user.id}>
								<td>{user.firstName}</td>
								<td>{user.lastName}</td>
								<td>{user.gender}</td>
							</tr>
						))}
						</tbody>
					</table>
				</ul>
			</div>
			<div>
				<AddUser />
			</div>
		</div>
	)
}
