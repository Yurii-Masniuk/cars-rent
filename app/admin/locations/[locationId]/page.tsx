import css from './Page.module.css';
import { cookies } from 'next/headers';
import { globalServer } from '@/services/server-config';

interface PageProps{
    params: Promise<{ locationId: string }>,
};

const Page = async ({ params }: PageProps) => {
    const { locationId } = await params;
        const cookieStore = await cookies();
        const res = await globalServer.get<Location>(`/locations/${locationId}`, {
            headers: {
                Cookie: cookieStore.toString(),
            },
        });
        const element = res.data;

  return (
    <div className={css['page']}>
      Page
    </div>
  );
};

export default Page;