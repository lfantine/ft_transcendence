import { FC } from 'react';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface pageProps {}

const page: FC<pageProps> = ({}) => {

	console.log('Modele');

	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}><div>page</div></QueryClientProvider>
  )
}

export default page;