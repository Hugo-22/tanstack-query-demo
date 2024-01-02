import {
	QueryClient,
	QueryClientProvider,
	focusManager
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { UsersList } from "./components/UsersList.tsx";

const queryClient = new QueryClient()
focusManager.setEventListener((handleFocus) => {
	// Listen to visibilitychange
	if (typeof window !== 'undefined' && window.addEventListener) {
		window.addEventListener('visibilitychange', () => handleFocus(), false)
		return () => {
			// Be sure to unsubscribe if a new handler is set
			window.removeEventListener('visibilitychange', () => handleFocus())
		}
	}
})
function App() {

	return (
		<QueryClientProvider client={queryClient}>
			<UsersList/>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default App
