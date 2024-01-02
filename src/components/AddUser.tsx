import * as React from "react";
import { useAddUser } from "../hooks/Users/queries.ts";

export function AddUser() {

	const {isError, isPending, isSuccess, mutate} = useAddUser();
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		mutate(new FormData(event.target));
	}

	return (
		<form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
			<input className="form-input rounded w-1/2" type="text" name="firstName" placeholder="firstName"/>
			<input className="form-input rounded w-1/2" type="text" name="lastName" placeholder="lastName"/>
			<input className="form-input rounded w-1/2" type="email" name="email" placeholder="Email"/>
			<div>
				<input className="form-radio" id="male" type="radio" name="gender" value="male"/>
				<label htmlFor="male">Male</label>
			</div>
			<div>
				<input className="form-radio" id="female" type="radio" name="gender" value="female"/>
				<label htmlFor="female">Female</label>
			</div>

			<button type="submit" className="flex items-center rounded-lg bg-green-700 px-4 py-2 text-white w-1/2">
				{isPending && <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
				}

				<span className="font-medium">Add</span>
			</button>
		</form>
	)
}
