import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('@/components/Chat'), {
  loading: () => (
    <div className="flex h-screen items-center justify-center text-slate-400">
      Laden...
    </div>
  ),
});

export default function Page() {
  return <Chat />;
}
